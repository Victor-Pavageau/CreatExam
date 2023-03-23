import { Button } from "antd";
import YouTube, { YouTubeProps } from "react-youtube";

function MainPage() {
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="max-w-sm font-semibold text-center mx-auto">
          Generative Multiple Choice Questionaries has arrived.
        </h1>
        <div className="max-w-lg text-gray-400 text-center mx-auto mt-10">
          Unlock your best work with CreatExam AI-powered MCQ generator.
        </div>
        <div className="flex justify-center mt-10">
          <Button
            className="bg-[#15CC2E] border-none flex justify-center items-center"
            size="large"
          >
            <div className="bg-[#15CC2E]">Try CreatExam for free</div>
          </Button>
        </div>
        <YouTube videoId="--khbXchTeE"></YouTube>
      </div>
    </div>
  );
}

export default MainPage;
