import { TextInput } from "@mantine/core";
import Heading from "../common/Heading";
import useInputChange from "../hooks/useInputChange";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import Footer from "../common/Footer";
import useValidation from "../hooks/useValidation";

const FullName = () => {
  const handleInputChange = useInputChange();
  const { formData, setStep } = useContext(AppContext);

  const validationRules = {
    firstName: { required: true, message: "First name is required" },
    lastName: { required: true, message: "Last name is required" },
  };

  const { errors, validateFields, clearError } = useValidation(validationRules);

  const handleNextStep = () => {
    if (validateFields(formData)) {
      setStep(2);
    }
  };

  return (
    <div>
      <Heading text="Owner's Full Name" />
      <div className="grid grid-cols-2 gap-x-5 my-5">
        <TextInput
          name="firstName"
          label="First Name"
          value={formData?.firstName}
          placeholder="First Name"
          error={errors?.firstName}
          onChange={(e) => {
            handleInputChange("firstName", e.target.value);
            clearError("firstName");
          }}
        />
        <TextInput
          value={formData?.lastName}
          onChange={(e) => {
            handleInputChange("lastName", e.target.value);
            clearError("lastName");
          }}
          name="lastName"
          label="Last Name"
          error={errors?.lastName}
          placeholder="Last Name"
        />
      </div>
      <Footer handleNextStep={handleNextStep} handlePreviousStep={() => {}} />
    </div>
  );
};

export default FullName;
