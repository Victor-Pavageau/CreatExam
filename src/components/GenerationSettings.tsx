import { Button, Radio, RadioChangeEvent, Select, Slider, Tag } from "antd"
import { SliderMarks } from "antd/es/slider";
import { HiLanguage } from "react-icons/hi2"
import { GiBrain, GiChoice } from "react-icons/gi"
import { BsQuestionLg } from "react-icons/bs"
import { VscSettings } from "react-icons/vsc"
import { useState } from "react";

type Props = {
  selectedLanguage: string;
  handleLanguageChange: (language: string) => void;
  numberOfQuestions: number;
  handleNumberOfQuestions: (numberOfQuestions: number) => void;
  difficulty: number;
  handleDifficulty: (difficulty: number) => void;
  numberOfChoices: [number, number];
  handleNumberOfChoices: (numberOfChoices: [number, number]) => void;
  isMCQAlreadyGenerated: boolean
  setMCQSettings: (language: string, difficulty: number, numberOfQuestions: number, numberOfChoices: [number, number]) => void;
}

function GenerationSettings(props: Props) {
  const { handleLanguageChange, selectedLanguage, difficulty, handleDifficulty, handleNumberOfChoices, handleNumberOfQuestions, setMCQSettings, numberOfChoices, numberOfQuestions, isMCQAlreadyGenerated } = props

  const [tempLanguage, setTempLanguage] = useState(selectedLanguage)
  const [tempDifficulty, setTempDifficulty] = useState(difficulty)
  const [tempNumberOfQuestions, setTempNumberOfQuestions] = useState(numberOfQuestions)
  const [tempNumberOfChoices, setTempNumberOfChoices] = useState(numberOfChoices)

  const propositionsMarks: SliderMarks = {
    2: {
      style: {
        color: '#FFFFFF',
      },
      label: <>2</>,
    },
    3: {
      style: {
        color: '#FFFFFF',
      },
      label: <>3</>,
    },
    4: {
      style: {
        color: '#FFFFFF',
      },
      label: <>4</>,
    },
    5: {
      style: {
        color: '#FFFFFF',
      },
      label: <>5</>,
    },
    6: {
      style: {
        color: '#FFFFFF',
      },
      label: <>6</>,
    },
    7: {
      style: {
        color: '#FFFFFF',
      },
      label: <>7</>,
    },
    8: {
      style: {
        color: '#FFFFFF',
      },
      label: <>8</>,
    },
  };

  const onLanguageChange = (language: string) => {
    if (!isMCQAlreadyGenerated) {
      handleLanguageChange(language)
    }
    else {
      setTempLanguage(language)
    }
  }

  const onDifficultyChange = (difficulty: number) => {
    if (!isMCQAlreadyGenerated) {
      handleDifficulty(difficulty)
    }
    else {
      setTempDifficulty(difficulty)
    }
  }

  const onNumberOfQuestionsChange = (numberOfQuestions: number) => {
    if (!isMCQAlreadyGenerated) {
      handleNumberOfQuestions(numberOfQuestions)
    }
    else {
      setTempNumberOfQuestions(numberOfQuestions)
    }
  }

  const onNumberOfChoicesChange = (numberOfChoices: [number, number]) => {
    if (!isMCQAlreadyGenerated) {
      handleNumberOfChoices(numberOfChoices)
    }
    else {
      setTempNumberOfChoices(numberOfChoices)
    }
  }

  return (
    <div className="bg-white/10 p-3 rounded w-full">
      <div className="flex justify-center flex-col">
        <div className="flex items-center gap-3">
          <VscSettings size={25} />
          <div className="text-2xl font-semibold">
            MCQ Settings
          </div>
        </div>
        <div className="flex gap-3 items-center mb-2 mt-10">
          <HiLanguage size={25} />
          <div className="text-xl font-medium">
            Language
          </div>
        </div>
        <Select
          className="w-[65%]"
          defaultValue={selectedLanguage}
          onChange={onLanguageChange}
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
            {
              value: 'mandarin', label: <div className="flex gap-3 items-center">
                <img src="https://flagcdn.com/cn.svg" alt="country flag" className="rounded-sm w-8" />
                <div className="font-semibold">
                  Mandarin
                </div>
              </div>
            },
            {
              value: 'spanish', label: <div className="flex gap-3 items-center">
                <img src="https://flagcdn.com/es.svg" alt="country flag" className="rounded-sm w-8" />
                <div className="font-semibold">
                  Spanish
                </div>
              </div>
            },
            {
              value: 'portuguese', label: <div className="flex gap-3 items-center">
                <img src="https://flagcdn.com/pt.svg" alt="country flag" className="rounded-sm w-8" />
                <div className="font-semibold">
                  Portuguese
                </div>
              </div>
            },
            {
              value: 'russian', label: <div className="flex gap-3 items-center">
                <img src="https://flagcdn.com/ru.svg" alt="country flag" className="rounded-sm w-8" />
                <div className="font-semibold">
                  Russian
                </div>
              </div>
            },
            {
              value: 'german', label: <div className="flex gap-3 items-center">
                <img src="https://flagcdn.com/de.svg" alt="country flag" className="rounded-sm w-8" />
                <div className="font-semibold">
                  German
                </div>
              </div>
            },
            {
              value: 'italian', label: <div className="flex gap-3 items-center">
                <img src="https://flagcdn.com/it.svg" alt="country flag" className="rounded-sm w-8" />
                <div className="font-semibold">
                  Italian
                </div>
              </div>
            },
            {
              value: 'japanese', label: <div className="flex gap-3 items-center">
                <img src="https://flagcdn.com/jp.svg" alt="country flag" className="rounded-sm w-8" />
                <div className="font-semibold">
                  Japanese
                </div>
              </div>
            },
          ]}
        />
        <div className="flex gap-3 items-center mb-2 mt-7">
          <BsQuestionLg size={25} />
          <div className="text-xl font-medium">
            Number of questions
          </div>
        </div>
        <Radio.Group onChange={
          (value: RadioChangeEvent) => {
            onNumberOfQuestionsChange(Number(value.target.value));
          }
        } value={numberOfQuestions} className="w-full flex gap-5">
          <Radio value={3} className="text-white">3</Radio>
          <Radio value={5} className="text-white">5</Radio>
          <Radio value={7} className="text-white">7</Radio>
          <Radio value={10} className="text-white">10</Radio>
        </Radio.Group>
        <div className="flex gap-3 items-center mb-2 mt-7">
          <GiBrain size={25} />
          <div className="text-xl font-medium">
            Difficulty
          </div>
        </div>
        <Select
          className="w-[65%]"
          defaultValue={difficulty}
          onChange={onDifficultyChange}
          options={[
            {
              value: 1, label:
                <Tag color="#66bb6a">
                  Beginner
                </Tag>
            },
            {
              value: 2, label:
                <Tag color="#81c784">
                  Easy
                </Tag>
            },
            {
              value: 3, label:
                <Tag color="#ffb74d">
                  Average
                </Tag>
            },
            {
              value: 4, label:
                <Tag color="#e57373">
                  Hard
                </Tag>
            },
            {
              value: 5, label:
                <Tag color="#f44336">
                  Expert
                </Tag>
            },
          ]}
        />
        <div className="flex gap-3 items-center mb-2 mt-7">
          <GiChoice size={25} />
          <div className="text-xl font-medium">
            Number of choices
          </div>
        </div>
        <Slider range marks={propositionsMarks} step={1} defaultValue={numberOfChoices} min={2} max={8} onChange={(values: [number, number]) => {
          onNumberOfChoicesChange(values);
        }} railStyle={{ backgroundColor: "white" }} trackStyle={[{ backgroundColor: "#15CC2E" }]} className="mt-0" />
        {
          isMCQAlreadyGenerated &&
          <div className="flex gap-3 items-center mb-2 mt-7 justify-center">
            <Button size="large" type="primary" onClick={() => {
              setMCQSettings(tempLanguage, tempDifficulty, tempNumberOfQuestions, tempNumberOfChoices)
            }}>
              <div className="font-semibold">Regenerate</div>
            </Button>
          </div>
        }
      </div>
    </div>
  )
}

export default GenerationSettings