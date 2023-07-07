import { Button, Col, Input, Row, Select, Tooltip } from "antd";
import "./TestUI.css";
import { GoPlus } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { HiLanguage } from "react-icons/hi2"
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever, MdLoop } from "react-icons/md";
import { useState } from "react";
import { nanoid } from "nanoid";

type Proposition = {
  isGoodAnswer: boolean;
  proposition: string;
};

type Question = {
  question: string;
  propositions: Proposition[];
};

const test: Question[] = [
  {
    "question": "\n      What language is TypeScript created in?\n      ",
    "propositions": [
      {
        "proposition": "\n      Java\n      ",
        "isGoodAnswer": false
      },
      {
        "proposition": "\n      C#\n      ",
        "isGoodAnswer": false
      },
      {
        "proposition": "\n      JavaScript\n      ",
        "isGoodAnswer": false
      },
      {
        "proposition": "\n      Python\n      \n      ",
        "isGoodAnswer": true
      }
    ]
  },
  {
    "question": "\n      What is the main purpose of an ESLint configuration?\n      ",
    "propositions": [
      {
        "proposition": "\n      To check the readability of code\n      ",
        "isGoodAnswer": false
      },
      {
        "proposition": "\n      To define coding styles and conventions\n      ",
        "isGoodAnswer": false
      },
      {
        "proposition": "\n      To validate the syntax of code\n      ",
        "isGoodAnswer": true
      },
      {
        "proposition": "\n      To modify existing code",
        "isGoodAnswer": false
      }
    ]
  }
]


const propositionsLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];

function TestUI() {
  const [selectedQuestionID, setSelectedQuestionID] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("english")

  const threeDotsLogo = <HiDotsVertical size={20} />;

  const truncateLongQuestion = (string: string) => {
    if (string.length > 70) {
      return string.slice(0, 50) + "...";
    }
    return string;
  };


  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  }

  const isSelectedQuestion = (questionID: number) => {
    return questionID === selectedQuestionID;
  }

  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="max-w-lg font-semibold text-center mx-auto">
            Create the MCQ you want.
          </h1>
          <div className="flex gap-3">
            <Input placeholder="Enter the subject of your MCQ" />
            <Button size="large" type="primary">
              <div className="font-semibold bg-transparent">Generate</div>
            </Button>
          </div>
        </div>
      </div>
      <Row className="mt-14">
        <Col span={6}>
          <div className="flex justify-center">
            <div className="bg-white/10 p-3 rounded w-full mx-5">
              <div className="flex justify-center flex-col gap-y-5 bg-transparent">
                {test.map((questionTest, id) => (
                  <div
                    key={nanoid()}
                    className={`p-5 rounded-md flex gap-3 cursor-pointer ${isSelectedQuestion(id) ? 'border-2 border-solid border-[#15CC2E]' : 'border border-solid border-white/40'}`}
                    onClick={() => {
                      setSelectedQuestionID(id);
                    }}
                  >
                    <div>{id + 1}.</div>
                    {truncateLongQuestion(questionTest.question)}
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
                <div className="flex justify-center items-center text-lg">{test[selectedQuestionID].question}</div>
                <div className="flex justify-center items-center">
                  <Button
                    type="text"
                    className="flex justify-center items-center pr-0"
                  >
                    <GoPlus
                      size={20}
                      onClick={() => {
                        alert("edit the question");
                      }}
                    />
                  </Button>
                </div>
              </div>
              {
                test[selectedQuestionID].propositions.map((proposition, id) => (
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
                        <Button type="text" className="hover:!bg-white/20 w-full flex items-center gap-2">
                          <MdLoop size={20} className="bg-transparent" /><div className="!bg-transparent">Regenerate</div>
                        </Button>
                        <Button type="text" className="hover:!bg-white/20 w-full flex items-center gap-2">
                          <FiEdit3 size={17} className="bg-transparent" /><div className="!bg-transparent">Reformulate</div>
                        </Button>
                        <Button type="text" className="hover:!bg-[#ff4d4f] w-full flex items-center gap-2">
                          <MdDeleteForever size={20} className="bg-transparent" /><div className="!bg-transparent">Delete</div>
                        </Button>
                      </div>} showArrow={false} arrow={false} trigger={"hover"}>
                        <Button type="text">
                          {threeDotsLogo}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                ))
              }
              <div className="flex justify-center items-center !bg-transparent">
                <Button type="dashed" className="w-full h-10 !bg-transparent border-white/20 border-2 mt-5 hover:!border-white/40 focus:!border-white/40 flex flex-row gap-2 justify-center items-center text-white">
                  <GoPlus size={20} />
                  <div>
                    Add option
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col span={4} className="ml-auto">
          <div className="flex justify-center">
            <div className="bg-white/10 p-3 rounded w-full mx-5">
              <div className="flex justify-center flex-col gap-y-5 bg-transparent">
                <div>
                  <h3 className="mt-0 mb-2">
                    MCQ Settings
                  </h3>
                </div>
                <div className="flex gap-3 items-center">
                  <HiLanguage size={25} />
                  <Select
                    size="large"
                    className="w-full"
                    defaultValue={selectedLanguage}
                    onChange={handleLanguageChange}
                    options={[
                      {
                        value: 'english', label: <div className="flex gap-3 items-center">
                          <img src="https://flagcdn.com/us.svg" alt="country flag" className="rounded-sm w-8" />
                          <div className="font-semibold">
                            English
                          </div>
                        </div>
                      },
                      {
                        value: 'french', label: <div className="flex gap-3 items-center">
                          <img src="https://flagcdn.com/fr.svg" alt="country flag" className="rounded-sm w-8" />
                          <div className="font-semibold">
                            French
                          </div>
                        </div>
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*
              - Remplacer l'ancienne interface par la nouvelle
              - Modifier les appels d'API pour avoir 5 questions en demander les questions une par une en évitant les doublons
              - Modifier les appels d'API pour parse les réponses et les mettre dans les bons objets (isGoodAnswer)
              - Ajouter les paramètres dans l'UI de création de question
              - Ajouter toutes les features des paramètres de questions et des choix
              - Faire page d'accueil et page de présentation des fondateurs
              - Prévoir messages d'erreur de requête API
              - Comparer plan d'archis et mock-ups initiaux
              - Tests
              - Release v1.0
              */}
        </Col>
      </Row >
    </>
  );
}

export default TestUI;
