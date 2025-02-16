import { useContext, useEffect } from "react";
import { useForm } from "@mantine/form";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import AppContext from "../context/AppContext";
import { Button, Select, TextInput } from "@mantine/core";

export interface ILocationDetails {
  locationName: string;
  locationIdentifier: string;
  streetAddress: string;
  streetAddressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

const MultipleLocations: React.FC = () => {
  const { setStep, formData, setFormData } = useContext(AppContext);
  const locations: ILocationDetails[] = formData?.locations || [];

  const form = useForm<{ locations: ILocationDetails[] }>({
    initialValues: {
      locations: locations.length
        ? locations
        : [
            {
              locationName: "",
              locationIdentifier: "",
              streetAddress: "",
              streetAddressLine2: "",
              city: "",
              state: "",
              zipCode: "",
            },
          ],
    },
    validate: {
      locations: {
        locationName: (value) => (!value ? "Location name is required" : null),
        locationIdentifier: (value) =>
          !value ? "Identifier is required" : null,
        streetAddress: (value) =>
          !value ? "Street address is required" : null,
        city: (value) => (!value ? "City is required" : null),
        state: (value) => (!value ? "State is required" : null),
        zipCode: (value) =>
          /^\d{5,6}$/.test(value) ? null : "Enter a valid Zip Code",
      },
    },
  });

  useEffect(() => {
    setFormData((prev: any) => ({ ...prev, locations: form.values.locations }));
  }, [form.values.locations, setFormData]);

  const addNewLocation = () => {
    form.insertListItem("locations", {
      locationName: "",
      locationIdentifier: "",
      streetAddress: "",
      streetAddressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const removeLocation = (index: number) => {
    form.removeListItem("locations", index);
  };

  return (
    <div className="container-home">
      <div className="px-10">
        <Heading text="Location Details" />
        <div className="text-gray-500 text-base text-center pb-3">
          If you have multiple locations, please enter their details below.
        </div>

        <div className="max-h-[calc(100vh-300px)] overflow-auto">
          {form.values.locations.map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 shadow-md p-3 rounded-md my-5"
            >
              <div className="grid grid-cols-2 gap-x-5">
                <TextInput
                  label="Location Name"
                  {...form.getInputProps(`locations.${index}.locationName`)}
                />
                <TextInput
                  label="Location Identifier"
                  {...form.getInputProps(
                    `locations.${index}.locationIdentifier`
                  )}
                />
              </div>
              <TextInput
                label="Street Address"
                {...form.getInputProps(`locations.${index}.streetAddress`)}
              />
              <TextInput
                label="Street Address Line 2"
                {...form.getInputProps(`locations.${index}.streetAddressLine2`)}
              />
              <div className="grid grid-cols-2 gap-x-5">
                <TextInput
                  label="City"
                  {...form.getInputProps(`locations.${index}.city`)}
                />
                <Select
                  label="State"
                  {...form.getInputProps(`locations.${index}.state`)}
                  data={[
                    "Gujarat",
                    "Maharashtra",
                    "Rajasthan",
                    "Madhya Pradesh",
                    "Uttar Pradesh",
                    "Tamil Nadu",
                  ]}
                />
              </div>
              <TextInput
                label="Zip Code"
                {...form.getInputProps(`locations.${index}.zipCode`)}
              />
              {form.values.locations.length > 1 && (
                <div className="flex justify-end w-full">
                  <Button
                    variant="outline"
                    color="red"
                    className="mt-3"
                    onClick={() => removeLocation(index)}
                  >
                    Remove Location
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          className="!px-10 !text-lg !h-[52px] !mb-5"
          onClick={addNewLocation}
        >
          + Add More Location(s)
        </Button>
      </div>
      <Footer
        handleNextStep={() => {
          if (form.validate().hasErrors) return;
          setStep(7);
        }}
        handlePreviousStep={() => {
          if (formData.isSoleOwner) {
            setStep(4);
          } else {
            setStep(5);
          }
        }}
      />
    </div>
  );
};

export default MultipleLocations;
