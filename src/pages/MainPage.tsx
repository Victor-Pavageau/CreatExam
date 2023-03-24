import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

function MainPage() {
  const navigate = useNavigate();

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
            className="border-none flex justify-center items-center"
            type="primary"
            size="large"
            onClick={() => { navigate("create-exam") }}
          >
            <div className="bg-transparent">Try CreatExam for free</div>
          </Button>
        </div>
        <div className="mt-10">
          <YouTube videoId="_eHjifELI-k"></YouTube></div>
      </div>
    </div>
  );
}

export default MainPage;
