import { useContext } from "react";
import useInputChange from "../hooks/useInputChange";
import AppContext from "../context/AppContext";
import Heading from "../common/Heading";
import { TextInput } from "@mantine/core";

const EmailAddress = () => {
  const handleInputChange = useInputChange();
  const { formData } = useContext(AppContext);

  return (
    <div>
      <Heading text="Owner's Email Address" />
      <div className="my-5">
        <TextInput
          label="Email Address"
          type="emailAddress"
          value={formData?.emailAddress}
          placeholder="example@example.com"
          onChange={(e) => {
            handleInputChange("emailAddress", e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default EmailAddress;
