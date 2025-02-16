import { useContext } from "react";
import Footer from "../common/Footer";
import AppContext from "../context/AppContext";
import Heading from "../common/Heading";
import { Button } from "@mantine/core";
import useInputChange from "../hooks/useInputChange";

const AskMoreThanOneMember = () => {
  const { setStep } = useContext(AppContext);
  const handleInputChange = useInputChange();

  const handleMember = (isMultipleMember: boolean) => {
    handleInputChange("isMultipleMember", isMultipleMember);
  };

  return (
    <div className="container-home">
      <div className="px-10">
        <Heading text="Do you have Additional team members who need portal access?" />

        <div className="grid max-[450px]:grid-cols-1 grid-cols-2 items-center gap-5 my-7">
          <Button
            onClick={() => {
              handleMember(false);
            }}
            variant="outline"
            className="!px-10 max-[450px]:!px-5 !text-lg !h-[52px]"
          >
            It's just me
          </Button>
          <Button
            onClick={() => {
              handleMember(true);
              setStep(10);
            }}
            variant="outline"
            className="!px-10 max-[450px]:!px-5 !text-lg !h-[52px]"
          >
            I have team members
          </Button>
        </div>
      </div>
      <Footer
        handleNextStep={() => {}}
        handlePreviousStep={() => {
          setStep(8);
        }}
      />
    </div>
  );
};

export default AskMoreThanOneMember;
