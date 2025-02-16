import { useContext } from "react";
import AppContext from "../context/AppContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { totalSteps } from "../hooks/useGetComponent";

interface IFooterProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const Footer = ({ handleNextStep, handlePreviousStep }: IFooterProps) => {
  const { step } = useContext(AppContext);

  return (
    <div>
      <div className="bg-[#4FB4A5] rounded-b-md text-white mb-5 w-full py-3 font-semibold flex justify-between px-5">
        <div>
          {step !== 1 && (
            <button
              onClick={handlePreviousStep}
              className="flex items-center gap-1 cursor-pointer jiggle-left"
            >
              <FaArrowLeft className="mt-0.5 mx-1 arrow-left" />
              <div className="tracking-widest">PREVIOUS</div>
            </button>
          )}
        </div>

        <div>
          {step !== totalSteps && step !== 4 && step !== 9 && step !== 16 && (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-1 cursor-pointer jiggle-right"
            >
              <div className="tracking-widest">NEXT</div>
              <FaArrowRight className="mt-0.5 mx-1 arrow-right" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
