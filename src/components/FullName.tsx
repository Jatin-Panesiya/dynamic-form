import { TextInput } from "@mantine/core";
import Heading from "../common/Heading";

const FullName = () => {
  return (
    <div>
      <Heading text="Owner's Full Name" />
      <div className="grid grid-cols-2 gap-x-5 my-5">
        <TextInput label="First Name" placeholder="First Name" />
        <TextInput label="Last Name" placeholder="Last Name" />
      </div>
    </div>
  );
};

export default FullName;
