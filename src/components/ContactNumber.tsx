import { TextInput } from "@mantine/core";
import Heading from "../common/Heading";
import useInputChange from "../hooks/useInputChange";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import Footer from "../common/Footer";
import useValidation from "../hooks/useValidation";

const ContactNumber = () => {
  const handleInputChange = useInputChange();
  const { formData, setStep } = useContext(AppContext);

  const validationRules = {
    phone: { required: true, message: "Please enter a valid phone number." },
  };

  const { errors, validateFields, clearError } = useValidation(validationRules);

  const handleNextStep = () => {
    if (validateFields(formData)) {
      setStep(3);
    }
  };

  return (
    <div className="container-home">
      <div className="px-10">
        <Heading text="Owner's Phone Number" />
        <div className="mb-5">
          <TextInput
            type="number"
            value={formData?.phone}
            error={errors?.phone}
            placeholder="Please enter a valid phone number."
            onChange={(e) => {
              handleInputChange("phone", e.target.value);
              clearError("phone");
            }}
          />
        </div>
      </div>
      <Footer
        handleNextStep={handleNextStep}
        handlePreviousStep={() => {
          setStep(1);
        }}
      />
    </div>
  );
};

export default ContactNumber;
