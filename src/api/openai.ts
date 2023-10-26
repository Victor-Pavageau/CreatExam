import { UploadFile } from "antd";
import axios from "axios";

export const OPENAI_KEY = JSON.stringify(
  import.meta.env.VITE_OPENAI_API_KEY
).replace(/"/g, "");

export type Settings = {
  numberOfChoices: number[];
  numberOfQuestions: number;
  websitesToParseArray: string[];
  webBrowsing: boolean;
  fileArray: UploadFile[];
  targetedSchoolLevel: {
    value: string;
    label: string;
  };
};

export type QueryType = {
  subject: string;
  skillsArray: string[];
  MCQSettings: Settings;
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
      .split("[CHOICE]")[0];
    const propositionsSplitted = questionSplitted[i].split("[CHOICE]");
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
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Act as a professional and well skill teacher who have a lots of knowledge about ${query.subject}`,
          },
          {
            role: "user",
            content: `Write ${query.MCQSettings.numberOfQuestions} questions about ${query.subject}. The questions should be for  ${query.MCQSettings.targetedSchoolLevel.label} students.
            Follow the provided format, which includes a question, the correct answer's position, and between ${query.MCQSettings.numberOfChoices[0]} to ${query.MCQSettings.numberOfChoices[1]} choices.
            Here's an example of the format using two English questions about Paris:
            
            [QUESTION]
            Which famous landmark in Paris is known as the 'Iron Lady'?
            [GOOD ANSWER]
            1
            [CHOICE]
            The Eiffel Tower
            [CHOICE]
            The Louvre Museum
            [CHOICE]
            Notre-Dame Cathedral
            [CHOICE]
            Arc de Triomphe
            
            [QUESTION]
            Which river flows through the city of Paris?
            [GOOD ANSWER]
            3
            [CHOICE]
            Thames River
            [CHOICE]
            Danube River
            [CHOICE]
            Seine River
            
            Now, using this format, create ${query.MCQSettings.numberOfQuestions} questions about ${query.subject} in French. Each question should have between ${query.MCQSettings.numberOfChoices[0]} and ${query.MCQSettings.numberOfChoices[1]} choices.
            The answer must always be the right one, and both the choice and the question must be clear and well-written. So make sure you provide the right choice as the right answer.`,
          },
        ],
      },
    })
    .then((result) => result.data.choices[0].message.content);

  return rawResponseToQueryResult(data);
};
