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
  message: {
    role: string;
    content: string;
  };
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
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      data: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional and well skill teacher who have a lots of knowledge about ${query?.subject}`,
          },
          {
            role: "user",
            content: `You will write 5 different questions about ${query?.subject}, in ${query?.language}.
            
            Here's is an example of the format you should follow 2 question based on the subject Paris and the language english:
            
            [QUESTION]
            Which famous landmark in Paris is known as the 'Iron Lady'?
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
            
            Now write 5 questions about ${query?.subject}, in ${query?.language} following the same format.`,
          },
        ],
      },
    })
    .then((result) => result.data.choices[0].message.content);

  return rawResponseToQueryResult(data);
};
