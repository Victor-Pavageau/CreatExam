import { Button, Input, InputNumber, Select, Slider, Upload } from "antd"
import { InboxOutlined } from '@ant-design/icons';
import { GiChoice } from "react-icons/gi"
import { PiBooksDuotone } from "react-icons/pi"
import { BsQuestionLg } from "react-icons/bs"
import { BiUpload } from "react-icons/bi"
import { AiOutlineLink } from "react-icons/ai"
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
    <div className="w-max min-w-max">
      <div className="text-xl mb-1">
        Paramètres
      </div>
      <div className="flex justify-center">
        <div className="bg-white rounded w-full border border-solid border-black/20 text-[#999999]">
          <div className="p-3">
            <div className="flex gap-2 items-center mb-2">
              <BsQuestionLg size={22} />
              <div className="text-lg font-medium">
                Nombre de questions
              </div>
            </div>
            <div className="mb-4 sm:px-3 md:px-5">
              <Slider className="mt-0" step={1} defaultValue={5} min={2} max={15} styles={{ rail: { backgroundColor: "rgba(0,0,0,0.2)" } }} />
              <InputNumber
                min={2}
                max={15}
                value={inputValue}
                onChange={onChange}
              />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <PiBooksDuotone size={22} />
              <div className="text-lg font-medium">
                Niveau scolaire
              </div>
            </div>
            <div className="mb-4 sm:px-3 md:px-5">
              <Select
                className="w-full"
                showSearch
                optionFilterProp="children"
                filterOption={(input: string, option?: { label: string; value: string }) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  {
                    value: 'seconde',
                    label: 'Seconde générale',
                  },
                  {
                    value: 'premiere',
                    label: 'Première générale',
                  },
                  {
                    value: 'terminale',
                    label: 'Terminale',
                  },
                  {
                    value: 'bac1',
                    label: 'Bac +1',
                  },
                  {
                    value: 'bac2',
                    label: 'Bac +2',
                  },
                  {
                    value: 'bac3',
                    label: 'Bac +3',
                  },
                  {
                    value: 'bac4',
                    label: 'Bac +4',
                  },
                  {
                    value: 'bac5',
                    label: 'Bac +5',
                  },
                ]}
              />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <GiChoice size={22} />
              <div className="text-lg font-medium">
                Nombre de propositions
              </div>
            </div>
            <div className="mb-4 sm:px-3 md:px-5">
              <Slider className="mt-0" range step={1} defaultValue={numberOfChoices} min={2} max={8} styles={{ rail: { backgroundColor: "rgba(0,0,0,0.2)" }, track: { backgroundColor: "#15CC2E" } }} onChange={(values: number[]) => {
                onNumberOfChoicesChange([values[0], values[1]]);
              }} />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <BiUpload size={22} />
              <div className="text-lg font-medium">
                A partir de vos fichiers
              </div>
            </div>
            <div className="mb-4 max-w-xs sm:px-3 md:px-5">
              <Upload type="drag" multiple accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/pdf" action="http://google.com">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <div className="font-normal mx-5">Cliquez ou faites glisser les fichiers dans cette zone pour le téléverser</div>
              </Upload>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <AiOutlineLink size={22} />
              <div className="text-lg font-medium">
                Depuis des sites web
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:px-3 md:px-5">
              <Input addonBefore="https://" />
              <Input addonBefore="https://" />
              <Input addonBefore="https://" />
            </div>
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
      </div>
    </div>
  )
}

export default GenerationSettings