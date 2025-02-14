import { TextInput } from "@mantine/core";
import Heading from "../common/Heading";
import useInputChange from "../hooks/useInputChange";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import Footer from "../common/Footer";

const FullName = () => {
  const handleInputChange = useInputChange();
  const { formData, setStep } = useContext(AppContext);

  return (
    <div>
      <Heading text="Owner's Full Name" />
      <div className="grid grid-cols-2 gap-x-5 my-5">
        <TextInput
          name="firstName"
          label="First Name"
          value={formData?.firstName}
          placeholder="First Name"
          onChange={(e) => {
            handleInputChange("firstName", e.target.value);
          }}
        />
        <TextInput
          value={formData?.lastName}
          onChange={(e) => {
            handleInputChange("lastName", e.target.value);
          }}
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
        />
      </div>
      <Footer
        handleNextStep={() => {
          setStep(2);
        }}
        handlePreviousStep={() => {}}
      />
    </div>
  );
};

export default FullName;
