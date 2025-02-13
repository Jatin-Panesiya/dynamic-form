import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import useGetComponent from "../hooks/useGetComponent";

const Form = () => {
  const { step, setStep } = useContext(AppContext);
  const totalSteps = 5;
  const component = useGetComponent();

  const handleNextStep = () => {
    if (step === totalSteps) return;
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  return (
    <div>
      {component}
      <div className="bg-[#9dc83a] rounded w-full py-3 font-semibold flex justify-between px-5">
        <div>
          {step !== 1 && (
            <button
              onClick={handlePreviousStep}
              className="flex items-center gap-1 cursor-pointer"
            >
              <FaArrowLeft className="mt-0.5 mx-1" /> <div>PREVIOUS</div>
            </button>
          )}
        </div>

        <div>
          {step !== totalSteps && (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-1 cursor-pointer"
            >
              <div>NEXT</div> <FaArrowRight className="mt-0.5 mx-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
