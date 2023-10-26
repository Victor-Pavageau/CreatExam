import { Input, InputNumber, Select, Slider, Switch, Upload } from "antd"
import { InboxOutlined } from '@ant-design/icons';
import { GiChoice, GiEarthAmerica } from "react-icons/gi"
import { PiBooksDuotone } from "react-icons/pi"
import { BsQuestionLg } from "react-icons/bs"
import { BiUpload } from "react-icons/bi"
import { AiOutlineLink } from "react-icons/ai"
import { useEffect, useState } from "react";
import { schoolLevels } from "../common/schoolSystem";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { Settings } from "../api/openai";

type Props = {
  setMCQSetting: (MCQSettings: Settings) => void;
  defaultSettings: Settings;
}

function GenerationSettings(props: Props) {
  const { setMCQSetting, defaultSettings } = props;
  const [numberOfChoices, setNumberOfChoices] = useState(defaultSettings.numberOfChoices);
  const [numberOfQuestions, setNumberOfQuestions] = useState(defaultSettings.numberOfQuestions);
  const [websitesToParseArray, setWebsitesToParseArray] = useState<string[]>(defaultSettings.websitesToParseArray)
  const [webBrowsing, setWebBrowsing] = useState(defaultSettings.webBrowsing)
  const [fileArray, setFileArray] = useState<UploadFile[]>(defaultSettings.fileArray)
  const [targetedSchoolLevel, setTargetedSchoolLevel] = useState(defaultSettings.targetedSchoolLevel)

  useEffect(() => {
    setMCQSetting({
      fileArray,
      numberOfChoices,
      numberOfQuestions,
      targetedSchoolLevel,
      webBrowsing,
      websitesToParseArray
    })
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetedSchoolLevel, fileArray, webBrowsing, websitesToParseArray, numberOfQuestions, numberOfChoices])


  return (
    <div className="w-max min-w-max">
      <h3 className="mb-1 font-semibold">
        Paramètres
      </h3>
      <div className="flex justify-center">
        <div className="bg-white rounded w-full border border-solid border-black/20 text-[#999999]">
          <div className="p-3">
            <div className="flex gap-2 items-center mb-2">
              <BsQuestionLg size={22} />
              <div className="text-lg font-medium">
                Nombre de questions
              </div>
            </div>
            <div className="sm:px-3 md:px-5 flex items-center justify-center align-middle">
              <Slider className="w-full" step={1} value={numberOfQuestions} min={2} max={15} styles={{ rail: { backgroundColor: "rgba(0,0,0,0.2)" } }} onChange={(value: number) => {
                setNumberOfQuestions(value)
              }} />
              <InputNumber
                min={2}
                max={15}
                value={numberOfQuestions}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setNumberOfQuestions(value)
                  }
                }}
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
                defaultValue={targetedSchoolLevel}
                onChange={(value: { value: string; label: string; }) => {
                  setTargetedSchoolLevel(value)
                }}
                optionFilterProp="children"
                filterOption={(input: string, option?: { label: string; value: string }) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={schoolLevels}
              />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <GiChoice size={22} />
              <div className="text-lg font-medium">
                Nombre de propositions
              </div>
            </div>
            <div className="mb-4 sm:px-3 md:px-5 flex">
              <InputNumber
                min={2}
                max={numberOfChoices[1]}
                value={numberOfChoices[0]}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setNumberOfChoices([value, numberOfChoices[1]])
                  }
                }}
              />
              <Slider className="w-full" range step={1} value={numberOfChoices} min={2} max={8} styles={{ rail: { backgroundColor: "rgba(0,0,0,0.2)" }, track: { backgroundColor: "#15CC2E" } }} onChange={(values: number[]) => {
                setNumberOfChoices([values[0], values[1]]);
              }} />
              <InputNumber
                min={numberOfChoices[0]}
                max={15}
                value={numberOfChoices[1]}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setNumberOfChoices([numberOfChoices[0], value])
                  }
                }}
              />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <BiUpload size={22} />
              <div className="text-lg font-medium">
                A partir de fichiers de cours
              </div>
            </div>
            <div className="mb-4 max-w-xs sm:px-3 md:px-5">
              <Upload type="drag" multiple onChange={(info: UploadChangeParam<UploadFile>) => {
                setFileArray(info.fileList);
              }} accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/pdf" action="http://google.com">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <div className="font-normal mx-5">Cliquez ou faites glisser les fichiers dans cette zone pour le téléverser</div>
              </Upload>
            </div>
            <div className="flex justify-between items-center mb-2 sm:pr-3 md:pr-5">
              <div className="flex gap-2 items-center">
                <GiEarthAmerica size={22} />
                <div className="text-lg font-medium">
                  Chercher sur le web
                </div>
              </div>
              <Switch defaultChecked={webBrowsing} onChange={(checked: boolean) => {
                setWebBrowsing(checked)
              }} />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <AiOutlineLink size={22} />
              <div className="text-lg font-medium">
                Depuis des sites
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:px-3 md:px-5">
              <Input addonBefore="https://" value={websitesToParseArray[0]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const tempWebsitesArray = websitesToParseArray;
                tempWebsitesArray[0] = event.target.value;
                setWebsitesToParseArray([...tempWebsitesArray]);
              }} />
              <Input addonBefore="https://" value={websitesToParseArray[1]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const tempWebsitesArray = websitesToParseArray;
                tempWebsitesArray[1] = event.target.value;
                setWebsitesToParseArray([...tempWebsitesArray]);
              }} />
              <Input addonBefore="https://" value={websitesToParseArray[2]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const tempWebsitesArray = websitesToParseArray;
                tempWebsitesArray[2] = event.target.value;
                setWebsitesToParseArray([...tempWebsitesArray]);
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerationSettings