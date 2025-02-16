import { useContext } from "react";
import useInputChange from "../hooks/useInputChange";
import AppContext from "../context/AppContext";
import Heading from "../common/Heading";
import { TextInput } from "@mantine/core";
import Footer from "../common/Footer";
import useValidation from "../hooks/useValidation";

const EmailAddress = () => {
  const handleInputChange = useInputChange();
  const { formData, setStep } = useContext(AppContext);

  const validationRules = {
    email: { required: true, message: "Email address is required." },
  };

  const { errors, validateFields, clearError } = useValidation(validationRules);

  const handleNextStep = () => {
    if (validateFields(formData)) {
      setStep(4);
    }
  };

  return (
    <div className="container-home">
      <div className="px-10">
        <Heading text="Owner's Email Address" />
        <div className="mb-5">
          <TextInput
            type="email"
            value={formData?.email}
            error={errors?.email}
            placeholder="example@example.com"
            onChange={(e) => {
              handleInputChange("email", e.target.value);
              clearError("email");
            }}
          />
        </div>
      </div>
      <Footer
        handleNextStep={() => {
          handleNextStep();
        }}
        handlePreviousStep={() => {
          setStep(2);
        }}
      />
    </div>
  );
};

export default EmailAddress;
