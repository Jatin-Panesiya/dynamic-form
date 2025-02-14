import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import Heading from "../common/Heading";
import { Button, TextInput } from "@mantine/core";
import Footer from "../common/Footer";

interface IOwnerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const AdditionalOwner = () => {
  const { formData, setFormData, setStep } = useContext(AppContext);
  const owners = formData?.owners || [];

  // Function to add a new owner
  const addNewOwner = () => {
    const newOwner: IOwnerDetails = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    setFormData({ ...formData, owners: [...owners, newOwner] });
  };

  const removeOwner = (index: number) => {
    const updatedOwners = owners.filter(
      (_: IOwnerDetails, i: number) => i !== index
    );
    setFormData({ ...formData, owners: updatedOwners });
  };

  const handleOwnerChange = (
    index: number,
    field: keyof IOwnerDetails,
    value: string
  ) => {
    const updatedOwners = [...owners];
    updatedOwners[index] = { ...updatedOwners[index], [field]: value };
    setFormData({ ...formData, owners: updatedOwners });
  };

  useEffect(() => {
    if (owners.length === 0) {
      addNewOwner();
    }
  }, []);

  return (
    <div>
      <Heading text="Additional Owner(s) Information" />
      <div className="text-gray-500 text-base text-center pb-3">
        If there are multiple owners, please enter their details below. Click
        "Add More Owners" to include additional owners as needed.
      </div>

      {/* Owner Fields */}
      {(owners as IOwnerDetails[]).map((owner, index) => (
        <div
          key={index}
          className="border border-gray-300 shadow-md p-2 rounded-md my-5"
        >
          <div className="grid grid-cols-4 gap-x-5 items-center">
            <TextInput
              label="First Name"
              value={owner.firstName}
              placeholder="John"
              onChange={(e) =>
                handleOwnerChange(index, "firstName", e.target.value)
              }
            />
            <TextInput
              label="Last Name"
              value={owner.lastName}
              placeholder="Doe"
              onChange={(e) =>
                handleOwnerChange(index, "lastName", e.target.value)
              }
            />
            <TextInput
              label="Email"
              value={owner.email}
              placeholder="example@example.com"
              onChange={(e) =>
                handleOwnerChange(index, "email", e.target.value)
              }
            />
            <TextInput
              label="Phone"
              value={owner.phone}
              placeholder="Phone"
              onChange={(e) =>
                handleOwnerChange(index, "phone", e.target.value)
              }
            />
          </div>
          {/* Remove Button (Shown only if there is more than one owner) */}
          {owners.length > 1 && (
            <div className="flex justify-end w-full">
              <Button
                variant="outline"
                color="red"
                className="mt-3 "
                onClick={() => removeOwner(index)}
              >
                Remove Owner
              </Button>
            </div>
          )}
        </div>
      ))}

      {/* Add More Owners Button */}
      <Button className="!px-10 !text-lg !h-[52px] !mb-5" onClick={addNewOwner}>
        Add More Owner(s)
      </Button>

      <Footer
        handleNextStep={() => setStep(7)}
        handlePreviousStep={() => setStep(4)}
      />
    </div>
  );
};

export default AdditionalOwner;
