import { useContext, useEffect, useRef, useState } from "react";
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
  const [errors, setErrors] = useState<Record<number, Partial<IOwnerDetails>>>(
    {}
  );
  const ownerRefs = useRef<(HTMLDivElement | null)[]>([]); // Store references

  // Function to add a new owner
  const addNewOwner = () => {
    const newOwner: IOwnerDetails = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    setFormData({ ...formData, owners: [...owners, newOwner] });

    setTimeout(() => {
      const lastIndex = owners.length; // Index of new owner
      ownerRefs.current[lastIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Delay to ensure the DOM updates
  };

  const removeOwner = (index: number) => {
    const updatedOwners = (owners as IOwnerDetails[]).filter(
      (_owner, i) => i !== index
    );
    setFormData({ ...formData, owners: updatedOwners });
    const updatedErrors = { ...errors };
    delete updatedErrors[index];
    setErrors(updatedErrors);
  };

  const handleOwnerChange = (
    index: number,
    field: keyof IOwnerDetails,
    value: string
  ) => {
    const updatedOwners = [...owners];
    updatedOwners[index] = { ...updatedOwners[index], [field]: value };
    setFormData({ ...formData, owners: updatedOwners });
    validateField(index, field, value);
  };

  const validateField = (
    index: number,
    field: keyof IOwnerDetails,
    value: string
  ) => {
    let error = "";
    if (!value.trim()) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: { ...prevErrors[index], [field]: error },
    }));
  };

  const validateAllOwners = () => {
    let isValid = true;
    const newErrors: Record<number, Partial<IOwnerDetails>> = {};

    (owners as IOwnerDetails[]).forEach((owner, index) => {
      Object.keys(owner).forEach((key) => {
        const field = key as keyof IOwnerDetails;
        if (!owner[field].trim()) {
          isValid = false;
          newErrors[index] = {
            ...newErrors[index],
            [field]: `${field.replace(/([A-Z])/g, " $1")} is required`,
          };
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateAllOwners()) {
      setStep(6);
    }
  };

  useEffect(() => {
    if (owners.length === 0) {
      addNewOwner();
    }
  }, []);

  return (
    <div className="container-home">
      <div className="px-10">
        <Heading text="Additional Owner(s) Information" />
        <div className="text-gray-500 text-base text-center pb-3">
          If there are multiple owners, please enter their details below. Click
          "Add More Owners" to include additional owners as needed.
        </div>

        <div className="max-h-[calc(100vh-450px)] overflow-auto">
          {(owners as IOwnerDetails[]).map((owner, index) => (
            <div
              key={index}
              ref={(el) => {
                ownerRefs.current[index] = el;
              }}
              className="border border-gray-300 shadow-md p-2 rounded-md my-5"
            >
              <div className="grid grid-cols-auto-fit gap-x-5 w-full">
                {Object.keys(owner).map((key) => {
                  const field = key as keyof IOwnerDetails;
                  return (
                    <div key={field} className="w-full">
                      <TextInput
                        label={field.replace(/([A-Z])/g, " $1")}
                        value={owner[field]}
                        className="w-full"
                        onChange={(e) =>
                          handleOwnerChange(index, field, e.target.value)
                        }
                        error={errors[index]?.[field]}
                      />
                    </div>
                  );
                })}
              </div>
              {owners.length > 1 && (
                <div className="flex justify-end w-full">
                  <Button
                    variant="outline"
                    color="red"
                    className="mt-3"
                    onClick={() => removeOwner(index)}
                  >
                    Remove Owner
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          className="!px-10 !text-lg !h-[52px] !mb-5 max-[450px]:!px-5 mt-5 max-[450px]:!text-sm max-[450px]:!h-[40px]"
          onClick={addNewOwner}
        >
          + Add More Owner(s)
        </Button>
      </div>
      <Footer
        handleNextStep={handleNext}
        handlePreviousStep={() => setStep(4)}
      />
    </div>
  );
};

export default AdditionalOwner;
