import { Button, Col, Input, Row, Select, Space, Tooltip } from "antd";
import { GoPlus } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { MdDeleteForever, MdLoop } from "react-icons/md";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { QueryType, Question, Settings } from "../api/openai";
import { useGenerateQuestion } from "../hooks/useGenerateQuestion";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import GenerationSettings from "../components/GenerationSettings";
import TextArea from "antd/es/input/TextArea";
import { bloomLevels, schoolLevels } from "../common/schoolSystem";

function GeneratePage() {
  const [selectedQuestionID, setSelectedQuestionID] = useState(0);
  const [questionArray, setQuestionArray] = useState<Question[]>([])
  const [tempMasterLevel, setTempMasterLevel] = useState('1')
  const [tempTargetedSkill, setTempTargetedSkill] = useState<string>()
  const [skillsArray, setSkillsArray] = useState<string[]>([])
  const [subject, setSubject] = useState<string>("")
  const [generateClicked, setGenerateClicked] = useState(false)
  const [MCQSettings, setMCQSetting] = useState<Settings>({
    fileArray: [],
    numberOfChoices: [3, 5],
    numberOfQuestions: 5,
    targetedSchoolLevel: schoolLevels[0],
    webBrowsing: false,
    websitesToParseArray: [],
  });
  const [query, setQuery] = useState<QueryType>({ subject, skillsArray, MCQSettings })
  const { data, isLoading } = useGenerateQuestion(query, generateClicked);

  useEffect(() => {
    if (data) {
      setQuestionArray(data)
    }
  }, [data])

  useEffect(() => {
    setQuery({ subject, skillsArray, MCQSettings })
  }, [subject, skillsArray, MCQSettings])

  const maximumSkillsAccepted = 7
  const threeDotsLogo = <HiDotsVertical size={20} />;
  const propositionsLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const generateMCQ = () => {
    setGenerateClicked(true);
  }

  const isSelectedQuestion = (questionID: number) => {
    return questionID === selectedQuestionID;
  }

  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      generateMCQ()
    }
  })

  return (
    <>
      {
        (isLoading && query !== undefined && generateClicked && query.subject !== undefined && query.subject.length > 0) ?
          <div className="flex justify-center items-center mt-20">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
          </div>
          :
          <>
            {
              questionArray.length < 1 ?
                <div className="flex justify-center gap-40 mt-10">
                  <div className="max-w-2xl w-full">
                    <h3 className="font-semibold mb-5">
                      Quel est le sujet de votre QCM ?
                    </h3>
                    <div>
                      <TextArea size="large" value={subject} placeholder="Mathématiques, équations à deux inconnues, théorème de Pythagore" autoSize={{ minRows: 3, maxRows: 3 }} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setSubject(e.target.value)
                      }} />
                    </div>
                    <h3 className="font-semibold mt-10 mb-5">
                      Quelles sont les compétences évaluées ?
                    </h3>
                    <Space.Compact className="w-full">
                      <Select defaultValue={bloomLevels[0].label} options={bloomLevels} onChange={(value: string) => {
                        setTempMasterLevel(value)
                      }} />
                      <Input placeholder="Déterminer si un entier est ou n'est pas multiple ou diviseur d'un autre entier" value={tempTargetedSkill} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTempTargetedSkill(e.target.value)
                      }} />
                      <Button type="primary" className="!bg-white" disabled={skillsArray.length >= maximumSkillsAccepted} ghost onClick={() => {
                        if (tempMasterLevel !== undefined && tempTargetedSkill !== undefined && tempTargetedSkill.length >= 3 && skillsArray.length <= maximumSkillsAccepted) {
                          setSkillsArray([...skillsArray, "[" + tempMasterLevel + "] " + tempTargetedSkill]);
                          setTempTargetedSkill("")
                        }
                      }}>Ajouter</Button>
                    </Space.Compact>
                    <div className="mt-5">
                      {
                        skillsArray.map((skill, id) => (
                          <div className="flex items-center mb-3" key={nanoid()}>
                            <Input readOnly value={skill} id={nanoid()} />
                            <Button type="text" danger onClick={() => {
                              const tempSkillsArray = skillsArray;
                              tempSkillsArray.splice(id, 1);
                              setSkillsArray([...tempSkillsArray]);
                            }}>
                              <FiTrash size={17} />
                            </Button>
                          </div>
                        ))
                      }
                    </div>
                    <Button size="large" className="w-full mt-10" type="primary" onClick={() => {
                      generateMCQ()
                    }}>
                      <div className="font-semibold mb-5">Générer le QCM</div>
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <GenerationSettings setMCQSetting={setMCQSetting} defaultSettings={MCQSettings} />
                  </div>
                </div>
                :
                <Row className="mt-14 mb-5">
                  <Col span={6}>
                    <div className="flex justify-center">
                      <div className="p-3 rounded w-full mx-5">
                        <div className="flex justify-center flex-col gap-y-5">
                          {questionArray.map((questionTest, id) => (
                            <div
                              key={nanoid()}
                              className={`p-5 bg-white rounded-md flex gap-3 cursor-pointer ${isSelectedQuestion(id) ? 'border-2 border-solid border-[#15CC2E]' : 'border-solid border-black/20 border-2'}`}
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
                        <div className="border-3 border-solid border-black/20 px-5 py-3 rounded-md mb-3 bg-white flex justify-between">
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
                            <div className="border-2 border-solid border-black/20 bg-white rounded-md flex flex-row" key={nanoid()}>
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
                      <GenerationSettings setMCQSetting={setMCQSetting} defaultSettings={MCQSettings} />
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