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
      <div className="bg-[#9dc83a] mb-5 rounded w-full py-3 font-semibold flex justify-between px-5">
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
          {step !== totalSteps && step !== 4 && step !== 8 && step !== 13 && (
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

export default Footer;
