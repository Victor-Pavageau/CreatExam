import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { generateQuestion, QueryType, Question } from "../api/openai";

export const useGenerateQuestion = (
  query?: QueryType
): UseQueryResult<Question[]> =>
  useQuery(["generate-question", query], () => generateQuestion(query!), {
    enabled:
      query !== undefined &&
      query.subject !== undefined &&
      query.language !== undefined,
  });
