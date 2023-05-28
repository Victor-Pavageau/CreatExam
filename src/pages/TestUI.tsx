import { Button, Col, Input, Row } from "antd";
import "./TestUI.css";
import { GoSettings } from "react-icons/go";
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
    question: "Quelle est la population de Paris en 2020 ?",
    propositions: [
      {
        isGoodAnswer: false,
        proposition: "500 000 habitants.",
      },
      {
        isGoodAnswer: false,
        proposition: "12 000 000 habitants.",
      },
      {
        isGoodAnswer: true,
        proposition: "2 500 000 habitants.",
      },
      {
        isGoodAnswer: false,
        proposition: "7 000 000 habitants.",
      },
    ],
  },
  {
    question: "Quelle est la capitale du Royaume-Uni ?",
    propositions: [
      {
        isGoodAnswer: true,
        proposition: "Londres.",
      },
      {
        isGoodAnswer: false,
        proposition: "Edinburgh.",
      },
      {
        isGoodAnswer: false,
        proposition: "Manchester.",
      },
      {
        isGoodAnswer: false,
        proposition: "Cardiff.",
      },
    ],
  },
];

function TestUI() {
  const [selectedQuestionID, setSelectedQuestionID] = useState(0);

  const truncateLongQuestion = (string: string) => {
    if (string.length > 70) {
      return string.slice(0, 50) + "...";
    }
    return string;
  };

  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="max-w-lg font-semibold text-center mx-auto">
            Create the MCQ you want.
          </h1>
          <div className="flex gap-3">
            <Input placeholder="Enter the subject of your MCQ"></Input>
            <Button size="large" type="primary">
              <div className="font-semibold bg-transparent">Generate</div>
            </Button>
          </div>
        </div>
      </div>
      <Row className="mt-10">
        <Col span={6}>
          <div className="flex justify-center">
            <div className="flex justify-center flex-col gap-y-3">
              {test.map((questionTest, id) => (
                <div
                  key={nanoid()}
                  className="border-2 border-solid border-white/40 p-5 rounded-md mb-3 flex gap-3"
                >
                  <div>{id + 1}.</div>
                  {truncateLongQuestion(questionTest.question)}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex justify-center">
            <div className="flex flex-col gap-y-3 py-3 mt-3 rounded-md mb-5">
              <div className="border-2 border-solid border-white/20 p-5 rounded-md mb-3 flex justify-between">
                <div className="flex justify-center items-center">Question</div>
                <div className="flex justify-center items-center">
                  <Button
                    type="text"
                    className="flex justify-center items-center"
                  >
                    <GoSettings
                      size={20}
                      onClick={() => {
                        alert("edit the question");
                      }}
                    />
                  </Button>
                </div>
              </div>
              <div className="border border-solid border-white/20 p-3 rounded-md">
                Proposition A
              </div>
              <div className="border border-solid border-white/20 p-3 rounded-md">
                Proposition B
              </div>
              <div className="border border-solid border-white/20 p-3 rounded-md">
                Proposition C
              </div>
              <div className="border border-solid border-white/20 p-3 rounded-md">
                Proposition D
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="flex justify-center">Edit pannel</div>
        </Col>
      </Row>
    </>
  );
}

export default TestUI;
