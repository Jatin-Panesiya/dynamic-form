import { Button } from "@mantine/core";
import useInputChange from "../hooks/useInputChange";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const SoleOwner = () => {
  const handleInputChange = useInputChange();
  const { step, setStep } = useContext(AppContext);

  const handleOwnerType = (isSoleOwner: boolean) => {
    handleInputChange("isSoleOwner", isSoleOwner);
  };

  return (
    <div>
      <div className="text-center text-2xl pt-5">
        Are you the sole owner, or is there more than one owner?
      </div>
      <div className="flex items-center gap-x-5 my-11 justify-center">
        <Button
          onClick={() => {
            handleOwnerType(true);
            setStep(step + 1);
          }}
          variant="outline"
          className="!px-10 !text-lg !h-[52px]"
        >
          Sole Owner
        </Button>
        <Button
          onClick={() => {
            handleOwnerType(false);
          }}
          variant="outline"
          className="!px-10 !text-lg !h-[52px]"
        >
          More Than One Owner
        </Button>
      </div>
    </div>
  );
};

export default SoleOwner;
