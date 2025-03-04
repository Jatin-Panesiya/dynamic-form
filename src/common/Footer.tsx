import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { totalSteps } from "../hooks/useGetComponent";

interface IFooterProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const Footer = ({ handleNextStep, handlePreviousStep }: IFooterProps) => {
  const [loading, setLoading] = useState(false);
  const { step, formData } = useContext(AppContext);

  const handleSubmitForm = async () => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwbTX0M4zWybNhYXuwTjQ2T8DMoE9UJHH1-oXfIxnl4AClCn8kQ2J1Gup5eXTsiu61j/exec";

    try {
      setLoading(true);
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Prevents CORS errors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Data sent successfully!", response);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

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
          {step !== totalSteps + 1 &&
            step !== 4 &&
            step !== 9 &&
            step !== 16 && (
              <button
                onClick={
                  step === totalSteps ? handleSubmitForm : handleNextStep
                }
                disabled={loading}
                className={`flex items-center gap-1 cursor-pointer jiggle-right ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="tracking-widest">
                  {loading
                    ? "Submitting..."
                    : step === totalSteps
                    ? "SUBMIT"
                    : "NEXT"}
                </div>
                {!loading && step !== totalSteps && (
                  <FaArrowRight className="mt-0.5 mx-1 arrow-right" />
                )}
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
