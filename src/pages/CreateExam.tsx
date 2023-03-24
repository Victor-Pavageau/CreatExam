import { Button, Input } from "antd";
import { useGenerateQuestion } from "../api/useGenerateQuestion";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./CreateExam.css"

type PropositionType = {
  proposition: string;
  isCorrect: boolean;
}

type QuestionType = {
  question?: string;
  propositions?: PropositionType[];
}

function CreateExam() {
  const [querySubject, setQuerySubject] = useState("")
  const [tempInputValue, setTempInputValue] = useState("")
  const [questionArray, setQuestionArray] = useState<QuestionType[]>([])
  const { data } = useGenerateQuestion({ subject: querySubject });

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  useEffect(() => {
    formatQuery(data?.choices[0].text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    console.log(questionArray);
  }, [questionArray])


  const formatQuery = (queryResponse?: string) => {
    if (queryResponse) {
      const queryResponseWithoutQuestion = queryResponse.substring(queryResponse.indexOf("?") + 1);
      const numberOfPropositions = queryResponseWithoutQuestion.split(") ").length;
      if (numberOfPropositions > 0 && numberOfPropositions <= 10) {
        const propositionArray: PropositionType[] = [];
        for (let i = 0; i < numberOfPropositions; i++) {

          if (i < numberOfPropositions - 2) {
            let proposition = queryResponse.substring(queryResponse.indexOf(`${alphabet[i]}) `), queryResponse.indexOf(`${alphabet[i + 1]}) `) - 1);
            propositionArray.push({
              proposition: proposition,
              isCorrect: proposition.substring(proposition.indexOf("["), proposition.indexOf("]") + 1) === "[Correcte]",
            })
          }
          else if (i !== numberOfPropositions - 1) {
            let proposition = queryResponse.substring(queryResponse.indexOf(`${alphabet[numberOfPropositions - 2]}) `));
            propositionArray.push({
              proposition: proposition,
              isCorrect: proposition.substring(proposition.indexOf("["), proposition.indexOf("]") + 1) === "[Correcte]",
            })
          }
        }
        setQuestionArray([...questionArray, {
          question: queryResponse.substring(0, queryResponse.indexOf("?") + 1), propositions: propositionArray,
        }])
      }
    }
  }

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="max-w-lg font-semibold text-center mx-auto">
          Create the MCQ you want.
        </h1>
        <div className="flex gap-3">
          <Input placeholder="Enter the main subject of your MCQ" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTempInputValue(e.target.value) }}></Input>
          <Button size="large" type="primary" onClick={() => { setQuerySubject(tempInputValue) }}>
            <div className="font-semibold bg-transparent">Generate</div>
          </Button>
        </div>
        <div className="max-w-lg font-semibold text-center mx-auto mt-10">
          {questionArray.map((question: QuestionType) => (
            <div key={nanoid()}>
              <h3>
                {question.question}
              </h3>
              {question.propositions?.map((proposition: PropositionType) => (
                <div key={nanoid()} className="text-start flex flex-row gap-3">
                  <div className={`${proposition.isCorrect ? "green" : "red"}`}>
                    {proposition.proposition.substring(0, proposition.proposition.indexOf(") ") + 1)}
                  </div>
                  <div>
                    {proposition.proposition.substring(proposition.proposition.indexOf(") ") + 1, proposition.proposition.indexOf(" ["))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateExam;
