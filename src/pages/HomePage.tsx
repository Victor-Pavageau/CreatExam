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
        <div className="flex justify-center">
          <iframe
            className="mt-10 border-0"
            width="850"
            height="480"
            src="https://www.youtube.com/embed/caPaSaXGgG8"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="CreatExam presentation"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
