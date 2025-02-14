import { TextInput } from "@mantine/core";
import Heading from "../common/Heading";
import useInputChange from "../hooks/useInputChange";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import Footer from "../common/Footer";

const ContactNumber = () => {
  const handleInputChange = useInputChange();
  const { formData, setStep } = useContext(AppContext);

  return (
    <div>
      <Heading text="Owner's Contact Number" />
      <div className="my-5">
        <TextInput
          label="Phone Number"
          type="number"
          value={formData?.phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => {
            handleInputChange("phoneNumber", e.target.value);
          }}
        />
      </div>
      <Footer
        handleNextStep={() => {
          setStep(3);
        }}
        handlePreviousStep={() => {
          setStep(1);
        }}
      />
    </div>
  );
};

export default ContactNumber;
