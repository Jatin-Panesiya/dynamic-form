import { Button } from "@mantine/core";
import useInputChange from "../hooks/useInputChange";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import Footer from "../common/Footer";
import Heading from "../common/Heading";

const SoleOwner = () => {
  const handleInputChange = useInputChange();
  const { setStep } = useContext(AppContext);

  const handleOwnerType = (isSoleOwner: boolean) => {
    handleInputChange("isSoleOwner", isSoleOwner);
  };

  return (
    <div className="container-home">
      <img
        src="./logo.png"
        className="w-[100px] h-[100px] absolute top-10 left-10"
        alt="Mantine logo"
      />
      <Heading text=" Are you the sole owner, or is there more than one owner?" />
      <div className="flex items-center gap-x-5 my-5 justify-center">
        <Button
          onClick={() => {
            handleOwnerType(true);
            setStep(6);
          }}
          variant="outline"
          className="!px-10 !text-lg !h-[52px]"
        >
          Sole Owner
        </Button>
        <Button
          onClick={() => {
            handleOwnerType(false);
            setStep(5);
          }}
          variant="outline"
          className="!px-10 !text-lg !h-[52px]"
        >
          More Than One Owner
        </Button>
      </div>

      <Footer
        handleNextStep={() => {}}
        handlePreviousStep={() => {
          setStep(3);
        }}
      />
    </div>
  );
};

export default SoleOwner;
