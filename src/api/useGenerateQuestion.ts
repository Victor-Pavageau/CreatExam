import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

type QueryType = {
  subject: string;
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
      Authorization:
        "Bearer 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",
    },
    data: {
      model: "text-davinci-003",
      prompt: `Créer une question de QCM sur ${query?.subject} en suivant ce format : Question ? A) Réponse A. [Correcte/Incorrecte] B) Réponse B. [Correcte/Incorrecte] C) Réponse C. [Correcte/Incorrecte] D) Réponse D. [Correcte/Incorrecte]`,
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
