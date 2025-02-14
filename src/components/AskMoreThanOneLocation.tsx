import { useContext } from "react";
import Footer from "../common/Footer";
import AppContext from "../context/AppContext";
import Heading from "../common/Heading";
import { Button } from "@mantine/core";
import useInputChange from "../hooks/useInputChange";

const AskMoreThanOneLocation = () => {
  const { setStep } = useContext(AppContext);
  const handleInputChange = useInputChange();

  const handleLocation = (isMultipleLocation: boolean) => {
    handleInputChange("isMultipleLocation", isMultipleLocation);
  };

  return (
    <div>
      <div>
        <Heading text="Do You Have More Than One Location?" />

        <div className="grid grid-cols-2 items-center gap-x-5 my-7">
          <Button
            onClick={() => {
              handleLocation(true);
              setStep(9);
            }}
            variant="outline"
            className="!px-10 !text-lg !h-[52px]"
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              handleLocation(false);
            }}
            variant="outline"
            className="!px-10 !text-lg !h-[52px]"
          >
            No
          </Button>
        </div>
      </div>
      <Footer
        handleNextStep={() => {}}
        handlePreviousStep={() => {
          setStep(7);
        }}
      />
    </div>
  );
};

export default AskMoreThanOneLocation;
