import axios from "axios";

export const OPENAI_KEY = JSON.stringify(
  import.meta.env.VITE_OPENAI_API_KEY
).replace(/"/g, "");

export type QueryType = {
  subject: string;
  language: string;
};

export type Proposition = {
  isGoodAnswer: boolean;
  proposition: string;
};

export type Question = {
  question: string;
  propositions: Proposition[];
};

type ChoiceResponse = {
  finish_reason: string;
  index: number;
  logprobs?: string;
  text: string;
};

export type QueryResult = {
  choices: ChoiceResponse[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
};

const rawResponseToQueryResult = (rawResponse: string) => {
  const queryResult: Question[] = [];
  const questionSplitted = rawResponse.split("[QUESTION]");
  questionSplitted.shift();
  for (let i = 0; i < questionSplitted.length; i++) {
    const propositionsList = [];
    const question = questionSplitted[i].split("[GOOD ANSWER]")[0];
    const idGoodAnswer = questionSplitted[i]
      .split("[GOOD ANSWER]")[1]
      .split("[START CHOICE]")[0];
    const propositionsSplitted = questionSplitted[i].split("[START CHOICE]");
    propositionsSplitted.shift();
    for (let j = 0; j < propositionsSplitted.length; j++) {
      propositionsList.push({
        proposition: propositionsSplitted[j],
        isGoodAnswer: j + 1 === Number(idGoodAnswer),
      });
    }
    queryResult.push({
      question: question,
      propositions: propositionsList,
    });
  }
  return queryResult;
};

export const generateQuestion = async (
  query: QueryType
): Promise<Question[]> => {
  const data: string = await axios
    .request<QueryResult>({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      data: {
        model: "text-davinci-003",
        prompt: `Act as a teacher. You will write 5 MCQ test questions about ${query?.subject}, in ${query?.language}.
      You will follow this format for each question: 
      
      [QUESTION]
      Here is the question
      [GOOD ANSWER]
      ID OF THE GOOD CHOICE (here 2)

      [START CHOICE]
      Here is the first choice, which is wrong
      [START CHOICE]
      Here is the second choice, which is true
      [START CHOICE]
      Here is the third choice, which is wrong
      [START CHOICE]
      Here is the fourth choice, which is wrong
      
      Here's is an example of 3 MCQ with the subject Paris and the language english:
      
      [QUESTION]
      Which famous landmark in Paris is known as the "Iron Lady"?
      [GOOD ANSWER]
      1

      [START CHOICE]
      The Eiffel Tower
      [START CHOICE]
      The Louvre Museum
      [START CHOICE]
      Notre-Dame Cathedral
      [START CHOICE]
      Arc de Triomphe


      [QUESTION]
      Which river flows through the city of Paris?
      [GOOD ANSWER]
      3

      [START CHOICE]
      Thames River
      [START CHOICE]
      Danube River
      [START CHOICE]
      Seine River
      [START CHOICE]
      Rhine River

      [START QUESTION]
      Which palace in Paris is home to the French president?
      [GOOD ANSWER]
      4

      [START CHOICE]
      Palace of Versailles
      [START CHOICE]
      Palace of the Legion of Honor
      [START CHOICE]
      Palais Garnier
      [START CHOICE]
      Élysée Palace`,
        max_tokens: 3500,
        temperature: 1,
      },
    })
    .then((result) => result.data.choices[0].text);

  return rawResponseToQueryResult(data);
};
