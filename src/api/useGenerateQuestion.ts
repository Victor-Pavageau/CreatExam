import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

type QueryType = {
  subject: string;
  language: string;
};

type ChoiceResponse = {
  finish_reason: string;
  index: number;
  logprobs?: string;
  text: string;
};

type QueryResult = {
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

const fetchData = async (query?: QueryType): Promise<QueryResult> => {
  var options = {
    method: "POST",
    url: "https://api.openai.com/v1/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    data: {
      model: "text-davinci-003",
      prompt: `Act as a teacher. You will write a MCQ about ${query?.subject}, in ${query?.language}.
      You will follow this format: 
      
      [START QUESTION] Here is the question [END QUESTION]
      
      [START CHOICE1] Here is the first choice, which is wrong [END CHOICE1]
      [START CHOICE2] Here is the second choice, which is true [END CHOICE2]
      [START CHOICE3] Here is the third choice, which is wrong [END CHOICE3]
      [START CHOICE4] Here is the fourth choice, which is wrong [END CHOICE4]
      
      [GOOD CHOICE: ID OF THE GOOD CHOICE]
      
      Here's is an example of a good answer with the subject Paris:
      
      [START QUESTION] What is the capital city of France? [END QUESTION]
      
      [START CHOICE1] Berlin [END CHOICE1]
      [START CHOICE2] Paris [END CHOICE2]
      [START CHOICE3] Rome [END CHOICE3]
      [START CHOICE4] London [END CHOICE4]
      
      [GOOD CHOICE: 2]`,
      max_tokens: 4000,
      temperature: 1,
    },
  };

  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return data;
};

const useGenerateQuestion = (query?: QueryType): UseQueryResult<QueryResult> =>
  useQuery(["generate-question", query], () => fetchData(query), {
    enabled: query?.subject !== undefined && query.subject.length > 0,
  });

export { useGenerateQuestion };
