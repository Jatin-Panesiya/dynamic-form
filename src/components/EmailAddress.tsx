import { useContext } from "react";
import useInputChange from "../hooks/useInputChange";
import AppContext from "../context/AppContext";
import Heading from "../common/Heading";
import { TextInput } from "@mantine/core";
import Footer from "../common/Footer";

const EmailAddress = () => {
  const handleInputChange = useInputChange();
  const { formData, setStep } = useContext(AppContext);

  return (
    <div>
      <Heading text="Owner's Email Address" />
      <div className="my-5">
        <TextInput
          label="Email Address"
          type="email"
          value={formData?.email}
          placeholder="example@example.com"
          onChange={(e) => {
            handleInputChange("email", e.target.value);
          }}
        />
      </div>
      <Footer
        handleNextStep={() => {
          setStep(4);
        }}
        handlePreviousStep={() => {
          setStep(2);
        }}
      />
    </div>
  );
};

export default EmailAddress;
