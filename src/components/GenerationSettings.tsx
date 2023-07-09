import { Select } from "antd"
import { HiLanguage } from "react-icons/hi2"
import { IoSettingsOutline } from "react-icons/io5"

type Props = {
  selectedLanguage: string;
  handleLanguageChange: (language: string) => void;
  className: string
}

function GenerationSettings(props: Props) {
  const { handleLanguageChange, selectedLanguage, className } = props
  return (
    <div className={`bg-white/10 p-3 rounded ${className}`}>
      <div className="flex justify-center flex-col gap-y-5">
        <div className="flex items-center gap-3 mb-3">
          <IoSettingsOutline size={25} />
          <div className="text-2xl font-semibold">
            MCQ Settings
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <HiLanguage size={25} />
          <Select
            size="large"
            className="w-[65%]"
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
        </div>
        <div>
          - Ajouter les paramètres dans l'UI de création de question
        </div>
        <div>
          - Ajouter toutes les features des paramètres de questions et des choix
        </div>
        <div>
          - Faire page d'accueil et page de présentation des fondateurs
        </div>
        <div>
          - Prévoir messages d'erreur de requête API
        </div>
      </div>
    </div>
  )
}

export default GenerationSettings