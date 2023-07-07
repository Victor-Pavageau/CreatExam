import { Button, Input, Select } from "antd";
import { useGenerateQuestion } from "../hooks/useGenerateQuestion"
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./CreateExam.css"
import { Question } from "../api/openai";

function CreateExam() {
  const [querySubject, setQuerySubject] = useState<string | undefined>()
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [tempInputValue, setTempInputValue] = useState("")
  const [questionArray, setQuestionArray] = useState<Question[]>([])
  const { data } = useGenerateQuestion({ subject: querySubject!, language: selectedLanguage });

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  useEffect(() => {
    if (data) {
      setQuestionArray(data)
    }
  }, [data])

  useEffect(() => {
    console.log(questionArray);
  }, [questionArray])

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  }

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="max-w-lg font-semibold text-center mx-auto">
          Create the MCQ you want.
        </h1>
        <div className="flex gap-3">
          <Input placeholder="Enter the main subject of your MCQ" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTempInputValue(e.target.value) }} />
          <Select
            defaultValue={selectedLanguage}
            onChange={handleLanguageChange}
            options={[
              {
                value: 'english', label: <div className="flex gap-1">
                  <img src="https://flagcdn.com/w20/us.png" alt=" country flag" />
                  <div>
                    English
                  </div>
                </div>
              },
              {
                value: 'french', label: <div className="flex gap-1">
                  <img src="https://flagcdn.com/w20/fr.png" alt=" country flag" />
                  <div>
                    French
                  </div>
                </div>
              },
            ]}
          />
          <Button size="large" type="primary" onClick={() => { setQuerySubject(tempInputValue) }}>
            <div className="font-semibold bg-transparent">Generate</div>
          </Button>
        </div>
        {/* <div className="max-w-lg font-semibold text-center mx-auto mt-10">
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
        </div> */}
      </div>
    </div>
  );
}

export default CreateExam;
