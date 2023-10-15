import { Button, Col, Input, Row, Tooltip } from "antd";
import { GoPlus } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever, MdLoop } from "react-icons/md";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Question } from "../api/openai";
import { useGenerateQuestion } from "../hooks/useGenerateQuestion";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import GenerationSettings from "../components/GenerationSettings";
import { useQueryClient } from "@tanstack/react-query";

function GeneratePage() {
  const [selectedQuestionID, setSelectedQuestionID] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [isGenerationLoading, setIsGenerationLoading] = useState(false)
  const [querySubject, setQuerySubject] = useState<string | undefined>()
  const [numberOfQuestions, setNumberOfQuestions] = useState(5)
  const [difficulty, setDifficulty] = useState(3)
  const [numberOfChoices, setNumberOfChoices] = useState<[number, number]>([3, 5])
  const [tempInputValue, setTempInputValue] = useState("")
  const [questionArray, setQuestionArray] = useState<Question[]>([])
  const { data, isLoading } = useGenerateQuestion({ subject: querySubject!, language: selectedLanguage, difficulty, numberOfChoices, numberOfQuestions });
  const queryClient = useQueryClient()

  const threeDotsLogo = <HiDotsVertical size={20} />;
  const propositionsLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  useEffect(() => {
    if (data) {
      setQuestionArray(data)
    }
  }, [data])

  useEffect(() => {
    if (isLoading === false) {
      setIsGenerationLoading(false)
    }
    if (isLoading === true && questionArray.length > 1) {
      setIsGenerationLoading(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, questionArray])

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  }

  const isSelectedQuestion = (questionID: number) => {
    return questionID === selectedQuestionID;
  }

  const generateMCQ = () => {
    if (tempInputValue !== querySubject) {
      setIsGenerationLoading(true)
    }
    setQuerySubject(tempInputValue)
  }

  const setMCQSettings = (language: string, difficulty: number, numberOfQuestions: number, numberOfChoices: [number, number]) => {
    void queryClient.invalidateQueries({ queryKey: ['generate-question'] });
    setSelectedLanguage(language);
    setDifficulty(difficulty);
    setNumberOfQuestions(numberOfQuestions);
    setNumberOfChoices(numberOfChoices);
    setIsGenerationLoading(true)
  }

  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      generateMCQ()
    }
  })

  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="max-w-lg font-semibold text-center mx-auto">
            Créez les QCM que vous voulez.
          </h1>
          <div className="flex gap-3">
            <Input placeholder="Entrez le sujet de votre QCM" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTempInputValue(e.target.value) }} />
            <Button size="large" type="primary" onClick={() => {
              generateMCQ()
            }}>
              <div className="font-semibold">{questionArray.length < 1 ? "Générer" : "Regénérer"}</div>
            </Button>
          </div>
        </div>
      </div>
      {
        isGenerationLoading ?
          <div className="flex justify-center items-center mt-20">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
          </div>
          :
          <>
            {
              questionArray.length < 1 ?
                <div className="flex justify-center mt-10">
                  <div className="flex justify-center items-center">
                    <GenerationSettings setMCQSettings={setMCQSettings} handleLanguageChange={handleLanguageChange} selectedLanguage={selectedLanguage} difficulty={difficulty} handleDifficulty={setDifficulty} handleNumberOfChoices={setNumberOfChoices} handleNumberOfQuestions={setNumberOfQuestions} numberOfChoices={numberOfChoices} numberOfQuestions={numberOfQuestions} isMCQAlreadyGenerated={questionArray.length > 1} />
                  </div>
                </div>
                :
                <Row className="mt-14 mb-5">
                  <Col span={6}>
                    <div className="flex justify-center">
                      <div className="bg-white/10 p-3 rounded w-full mx-5">
                        <div className="flex justify-center flex-col gap-y-5">
                          {questionArray.map((questionTest, id) => (
                            <div
                              key={nanoid()}
                              className={`p-5 rounded-md flex gap-3 cursor-pointer ${isSelectedQuestion(id) ? 'border-2 border-solid border-[#15CC2E]' : 'border border-solid border-white/40'}`}
                              onClick={() => {
                                setSelectedQuestionID(id);
                              }}
                            >
                              <div>{id + 1}.</div>
                              {questionTest.question}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="flex justify-center">
                      <div className="flex justify-center flex-col gap-y-3">
                        <div className="border-2 border-solid border-white/20 px-5 py-3 rounded-md mb-3 flex justify-between">
                          <div className="flex justify-center items-center text-lg">{questionArray[selectedQuestionID].question}</div>
                          <div className="flex justify-center items-center">
                            <Button
                              type="text"
                              className="flex justify-center items-center pr-0 !text-white"
                              onClick={() => {
                                alert("edit the question");
                              }}
                            >
                              {threeDotsLogo}
                            </Button>
                          </div>
                        </div>
                        {
                          questionArray[selectedQuestionID].propositions.map((proposition, id) => (
                            <div className="border border-solid border-white/20 rounded-md flex flex-row" key={nanoid()}>
                              <div className={`m-4 text-lg ${proposition.isGoodAnswer ? "text-[#52c41a]" : "text-[#ff4d4f]"}`}>
                                {propositionsLetters[id]}
                              </div>
                              <div className="border-r border-solid border-l-0 border-t-0 border-b-0 border-white/20"></div>
                              <div className="m-3 flex justify-center items-center">
                                {
                                  proposition.proposition
                                }
                              </div>
                              <div className="flex justify-center items-center ml-auto mr-1">
                                <Tooltip placement="bottomLeft" title={<div className="flex flex-col items-center gap-y-1">
                                  <Button type="text" className="hover:!bg-white/20 w-full flex items-center gap-2 !text-white">
                                    <MdLoop size={20} /><div>Regenerate</div>
                                  </Button>
                                  <Button type="text" className="hover:!bg-white/20 w-full flex items-center gap-2 !text-white">
                                    <FiEdit3 size={17} /><div>Reformulate</div>
                                  </Button>
                                  <Button type="text" className="hover:!bg-[#ff4d4f] w-full flex items-center gap-2 !text-white">
                                    <MdDeleteForever size={20} /><div>Delete</div>
                                  </Button>
                                </div>} showArrow={false} arrow={false} trigger={"hover"}>
                                  <Button type="text" className="!text-white">
                                    {threeDotsLogo}
                                  </Button>
                                </Tooltip>
                              </div>
                            </div>
                          ))
                        }
                        <div className="flex justify-center items-center">
                          <Button type="dashed" disabled={questionArray[selectedQuestionID].propositions.length >= 8} className="w-full h-10 bg-transparent border-white/20 border-2 mt-5 hover:!border-white/40 focus:!border-white/40 flex flex-row gap-2 justify-center items-center !text-white">
                            <GoPlus size={20} />
                            <div>
                              Add option
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={6} className="ml-auto">
                    <div className="flex justify-center mx-5">
                      <GenerationSettings setMCQSettings={setMCQSettings} handleLanguageChange={handleLanguageChange} selectedLanguage={selectedLanguage} difficulty={difficulty} handleDifficulty={setDifficulty} handleNumberOfChoices={setNumberOfChoices} handleNumberOfQuestions={setNumberOfQuestions} numberOfChoices={numberOfChoices} numberOfQuestions={numberOfQuestions} isMCQAlreadyGenerated={questionArray.length > 1} />
                    </div>
                  </Col>
                </Row >
            }
          </>
      }
    </>
  );
}

export default GeneratePage;