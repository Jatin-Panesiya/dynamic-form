import { useContext, useEffect } from "react";
import { useForm } from "@mantine/form";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import AppContext from "../context/AppContext";
import { Button, Select, TextInput } from "@mantine/core";
import Autocomplete from "react-google-autocomplete";

export interface ILocationDetails {
  locationName: string;
  locationIdentifier: string;
  streetAddress: string;
  streetAddressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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

  const handleAddressSelect = (place: any, index: number) => {
    const addressComponents = place.address_components;

    let streetAddress = "";
    let city = "";
    let state = "";
    let zipCode = "";

    addressComponents.forEach((component: any) => {
      if (component.types.includes("street_number")) {
        streetAddress = component.long_name;
      }
      if (component.types.includes("route")) {
        streetAddress += ` ${component.long_name}`;
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }
      if (component.types.includes("postal_code")) {
        zipCode = component.long_name;
      }
    });

    form.setFieldValue(
      `locations.${index}.streetAddress`,
      streetAddress.trim()
    );
    form.setFieldValue(`locations.${index}.city`, city);
    form.setFieldValue(`locations.${index}.state`, state);
    form.setFieldValue(`locations.${index}.zipCode`, zipCode);
  };

  return (
    <div className="container-home">
      <div className="px-10">
        <Heading text="Location Details" />
        <div className="text-gray-500 text-base text-center pb-3">
          If you have multiple locations, please enter their details below.
        </div>

        <div className="max-h-[calc(100vh-400px)] overflow-auto">
          {form.values.locations.map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 shadow-md p-3 rounded-md my-5"
            >
              <div className="grid max-[450px]:grid-cols-1 grid-cols-2 gap-x-5">
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

              <div>
                <div className="mantine-TextInput-label font-semibold text-sm">
                  Street Address
                </div>
                <Autocomplete
                  apiKey={GOOGLE_MAPS_API_KEY}
                  onPlaceSelected={(place: any) =>
                    handleAddressSelect(place, index)
                  }
                  options={{
                    types: ["geocode"],
                    componentRestrictions: { country: "us" },
                  }}
                  className="w-full p-2 border mantine-TextInput-input border-gray-300 rounded"
                  placeholder=""
                  {...form.getInputProps(`locations.${index}.streetAddress`)}
                />
              </div>
              <TextInput
                label="Street Address Line 2"
                {...form.getInputProps(`locations.${index}.streetAddressLine2`)}
              />

              <div className="grid max-[450px]:grid-cols-1 grid-cols-2 gap-x-5">
                <TextInput
                  label="City"
                  {...form.getInputProps(`locations.${index}.city`)}
                />
                <Select
                  label="State"
                  {...form.getInputProps(`locations.${index}.state`)}
                  data={[
                    "Alabama",
                    "Alaska",
                    "Arizona",
                    "Arkansas",
                    "California",
                    "Colorado",
                    "Connecticut",
                    "Delaware",
                    "Florida",
                    "Georgia",
                    "Hawaii",
                    "Idaho",
                    "Illinois",
                    "Indiana",
                    "Iowa",
                    "Kansas",
                    "Kentucky",
                    "Louisiana",
                    "Maine",
                    "Maryland",
                    "Massachusetts",
                    "Michigan",
                    "Minnesota",
                    "Mississippi",
                    "Missouri",
                    "Montana",
                    "Nebraska",
                    "Nevada",
                    "New Hampshire",
                    "New Jersey",
                    "New Mexico",
                    "New York",
                    "North Carolina",
                    "North Dakota",
                    "Ohio",
                    "Oklahoma",
                    "Oregon",
                    "Pennsylvania",
                    "Rhode Island",
                    "South Carolina",
                    "South Dakota",
                    "Tennessee",
                    "Texas",
                    "Utah",
                    "Vermont",
                    "Virginia",
                    "Washington",
                    "West Virginia",
                    "Wisconsin",
                    "Wyoming",
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
