import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { tp } from "../routings";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center flex-col">
        <h1 className="max-w-md font-semibold text-center mx-auto">
          Generative Multiple Choice Questionaries has arrived.
        </h1>
        <div className="max-w-lg text-gray-400 text-center mx-auto">
          Unlock your best work with CreatExam AI-powered MCQ generator.
        </div>
        <div className="flex justify-center mt-10">
          <Button
            className="border-none flex justify-center items-center"
            type="primary"
            size="large"
            onClick={() => { navigate(tp("/generate")); }}
          >
            <div className="bg-transparent">Try CreatExam for free</div>
          </Button>
        </div>
        <div className="flex justify-center">
          <iframe
            className="mt-24 border-0"
            width="750"
            height="480"
            src="https://www.youtube.com/embed/caPaSaXGgG8"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="CreatExam presentation" />
        </div>
      </div>
      <div className="flex justify-around mt-24 gap-60">
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
          <div className="w-[60%] bg-white/20 rounded-lg h-full flex justify-center items-center">
            Demo image
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-24 gap-60">
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
          <div className="w-[60%] bg-white/20 rounded-lg h-full flex justify-center items-center">
            Picture of us
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button
          className="flex justify-center items-center"
          ghost
        >
          <div className="bg-transparent">Learn more about us</div>
        </Button>
      </div>
      <div className="flex justify-center mt-24 text-gray-400">
        Used by
      </div>
      <div className="mt-10 flex justify-center">
        Partner list
      </div>
      <div className="my-24 flex flex-col justify-center items-center">
        <h1>
          Ready to dive in?
        </h1>
        <div className="text-gray-400">
          Create an account now and get 150 free tokens
        </div>
        <div className="flex justify-center mt-10">
          <Button
            className="border-none flex justify-center items-center"
            type="primary"
            size="large"
            onClick={() => { navigate(tp("/generate")); }}
          >
            <div className="bg-transparent">Try CreatExam for free</div>
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
