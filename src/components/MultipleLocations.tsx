import { useContext, useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import AppContext from "../context/AppContext";
import { Button, Select, TextInput } from "@mantine/core";
import Autocomplete from "react-google-autocomplete";
import { showToast } from "../common/toast";

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

  const locationRefs = useRef<HTMLDivElement[]>([]);

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

    setTimeout(() => {
      const lastIndex = form.values.locations.length;
      const lastElement = locationRefs.current[lastIndex];
      if (lastElement) {
        lastElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Small delay to ensure the DOM is updated before scrolling
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

  const handleNextStep = () => {
    form.validate();
    const errors: string[] = [];
    form.values.locations.forEach((location, index) => {
      if (!location.locationName)
        errors.push(`Please enter the Location Name for Location ${index + 1}`);
      if (!location.locationIdentifier)
        errors.push(
          `Please enter the Location Identifier for Location ${index + 1}`
        );
      if (!location.streetAddress)
        errors.push(
          `Please enter the Street Address for Location ${index + 1}`
        );
      if (!location.city)
        errors.push(`Please enter the City for Location ${index + 1}`);
      if (!location.state)
        errors.push(`Please select the State for Location ${index + 1}`);
      if (!/^[0-9]{5,6}$/.test(location.zipCode))
        errors.push(`Please enter a valid Zip Code for Location ${index + 1}`);
    });

    if (errors.length > 0) {
      showToast(errors[0], "error");
      return;
    }

    setStep(7);
  };

  return (
    <div className="container-home">
      <div className="px-10 max-[450px]:px-3">
        <Heading text="Location Details" />
        <div className="text-gray-500 text-base max-[450px]:text-sm text-center pb-3">
          If you have multiple locations, please enter their details below.
        </div>

        <div className="max-h-[calc(100vh-450px)] overflow-auto">
          {form.values.locations.map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                locationRefs.current[index] = el as HTMLDivElement;
              }}
              className="border border-gray-300 shadow-md p-3 rounded-md my-5"
            >
              <div className="grid max-[450px]:grid-cols-1 grid-cols-2 gap-x-5">
                <TextInput
                  label="Location Name"
                  placeholder="e.g., Pleasant Grove"
                  {...form.getInputProps(`locations.${index}.locationName`)}
                />
                <TextInput
                  label="Location Identifier"
                  placeholder="e.g., UT007"
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
                  placeholder="e.g., 73 Robert St"
                  {...form.getInputProps(`locations.${index}.streetAddress`)}
                />
              </div>
              <TextInput
                label="Street Address Line 2"
                placeholder="e.g., Suite 200"
                {...form.getInputProps(`locations.${index}.streetAddressLine2`)}
              />

              <div className="grid max-[450px]:grid-cols-1 grid-cols-2 gap-x-5">
                <TextInput
                  label="City"
                  placeholder="e.g., Salt Lake City"
                  {...form.getInputProps(`locations.${index}.city`)}
                />
                <Select
                  label="State"
                  {...form.getInputProps(`locations.${index}.state`)}
                  placeholder="e.g., Utah"
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
                placeholder="e.g., 84101"
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
          className="!px-10 !text-lg !h-[52px] !mb-5 max-[450px]:!px-5 mt-5 max-[450px]:!text-sm max-[450px]:!h-[40px]"
          onClick={addNewLocation}
        >
          + Add More Location(s)
        </Button>
      </div>

      <Footer
        handleNextStep={handleNextStep}
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
