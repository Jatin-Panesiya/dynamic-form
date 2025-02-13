import { TextInput } from "@mantine/core";
import Heading from "../common/Heading";
import useInputChange from "../hooks/useInputChange";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const ContactNumber = () => {
  const handleInputChange = useInputChange();
  const { formData } = useContext(AppContext);

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
    </div>
  );
};

export default ContactNumber;
