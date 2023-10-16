import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { tp } from "../routings";
import TryCreatExamButton from "../components/TryCreatExamButton";
import YoutubePresentationVideo from "../components/YoutubePresentationVideo";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="flex justify-center flex-col">
        <h1 className="max-w-lg font-semibold text-center mx-auto">
          La génération de questionnaires à choix multiples assistés par IA.
        </h1>
        <div className="max-w-xl text-gray-400 text-center mx-auto">
          Débloquez le meilleur de votre travail avec le générateur de QCM CreatExam.
        </div>
        <div className="flex justify-center mt-10">
          <TryCreatExamButton />
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl px-10 mt-20">
            <YoutubePresentationVideo />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-20 gap-60">
        <div className="flex justify-center items-center flex-col w-full">
          <div className="w-80 ml-auto">
            <h2>
              Our Generative Technology
            </h2>
            <div className="text-gray-400">
              Our advanced algorithms can generate hundreds of unique quiz questions in seconds, making it easy to create engaging and challenging quizzes.
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <div className="w-[60%] bg-gray-300 rounded-xl h-full flex justify-center items-center">
            Demo image
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-20 gap-60">
        <div className="flex justify-center items-center flex-col w-full">
          <div className="w-80 ml-auto">
            <h2>
              Who are we
            </h2>
            <div className="text-gray-400">
              We are two french students who developed this project during our free time
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <div className="w-[60%] bg-gray-300 rounded-xl h-full flex justify-center items-center">
            Picture of us
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button
          className="flex justify-center items-center"
          ghost
          onClick={() => {
            navigate(tp("/who-are-we"))
          }}
        >
          <div className="bg-transparent">Learn more about us</div>
        </Button>
      </div>
      <div className="flex justify-center mt-20 text-gray-400">
        Utilisé par
      </div>
      <div className="mt-10 flex justify-center text-red-500 text-xl">
        Liste des partenaires
      </div>
      <div className="mt-20 pb-20 flex flex-col justify-center items-center">
        <h1>
          Prêt à essayer?
        </h1>
        <div className="text-gray-400">
          Créez un compte maintenant et bénéficiez de <b>150 jetons gratuits</b>
        </div>
        <div className="flex justify-center mt-10">
          <TryCreatExamButton />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
