import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { generateQuestion, QueryType, Question } from "../api/openai";

export const useGenerateQuestion = (
  query: QueryType | undefined,
  generateClicked: boolean
): UseQueryResult<Question[]> =>
  useQuery(["generate-question", query], () => generateQuestion(query!), {
    enabled:
      query !== undefined &&
      generateClicked &&
      query.subject !== undefined &&
      query.subject.length > 0,
  });
