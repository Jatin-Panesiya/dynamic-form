import { useContext } from "react";
import Footer from "../common/Footer";
import AppContext from "../context/AppContext";
import Heading from "../common/Heading";
import { FaShoppingCart } from "react-icons/fa";

const CardVerification = () => {
  const { formData, setStep } = useContext(AppContext);

  return (
    <div className="container-home relative">
      <Heading text="Card Verification" />

      <div className="absolute top-0 right-0 mt-5 mr-5">
        <div className="bg-blue-500 relative w-10 rounded-full p-3">
          <FaShoppingCart color="white" />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full text-white w-4 h-4 flex items-center justify-center text-xs">
            1
          </span>
        </div>
      </div>

      <div className=" m-5 flex items-stretch">
        <div className="h- bg-blue-500 p-0.5"></div>
        <div className="flex  max-[500px]:grid items-center gap-5 py-5 bg-slate-100">
          <img src="logo.png" className="w-16 ms-5" alt="logo" />
          <div className="px-5">
            <div>
              The purpose of this $1 charge is so that when you start to treat
              patients we'll be ready to go. Our system, at that point, collect
              on a daily basis, based on the patients in your system. Hit ‘Next’
              to proceed.
            </div>
          </div>
          <div className="pr-5 font-bold text-xl  max-[500px]:hidden">
            $1.00
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end px-5 items-center mb-5">
        <div className="px-2">Total Cost</div>
        <div className="text-xl font-bold">$1.00</div>
      </div>
      <Footer
        handleNextStep={() => {}}
        handlePreviousStep={() => {
          if (formData.isMultipleMember) {
            setStep(10);
          } else {
            setStep(9);
          }
        }}
      />
    </div>
  );
};

export default CardVerification;
