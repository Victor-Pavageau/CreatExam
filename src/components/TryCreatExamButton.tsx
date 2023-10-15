import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { tp } from "../routings";

function TryCreatExamButton() {
  const navigate = useNavigate();

  return (
    <Button
      className="border-none flex justify-center items-center"
      type="primary"
      size="large"
      onClick={() => { navigate(tp("/generate")); }}
    >
      <div className="bg-transparent font-semibold">Essayer CreatExam gratuitement</div>
    </Button>
  )
}

export default TryCreatExamButton