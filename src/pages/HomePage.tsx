import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { tp } from "../routings";

function HomePage() {
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
            onClick={() => { navigate(tp("/generate")) }}
          >
            <div className="bg-transparent">Try CreatExam for free</div>
          </Button>
        </div>
        <iframe className="mt-10 w-full border-0 h-full"
          src="https://www.youtube.com/embed/caPaSaXGgG8" />
      </div>
    </div>
  );
}

export default HomePage;
