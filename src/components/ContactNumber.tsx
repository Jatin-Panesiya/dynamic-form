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
    phone: { required: true, message: "Phone Number is required" },
  };

  const { errors, validateFields, clearError } = useValidation(validationRules);

  const handleNextStep = () => {
    if (validateFields(formData)) {
      setStep(3);
    }
  };

  return (
    <div>
      <Heading text="Owner's Contact Number" />
      <div className="my-5">
        <TextInput
          label="Phone Number"
          type="number"
          value={formData?.phone}
          error={errors?.phone}
          placeholder="Phone Number"
          onChange={(e) => {
            handleInputChange("phone", e.target.value);
            clearError("phone");
          }}
        />
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
