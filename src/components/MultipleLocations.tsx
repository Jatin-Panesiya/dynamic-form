import { useContext, useEffect } from "react";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import AppContext from "../context/AppContext";
import { Button, Select, TextInput } from "@mantine/core";

export interface ILocationDetails {
  locationName: string;
  locationIdentifier: string;
  streetAddress: string;
  streetAddressLine2: string;
  city: string;
  state: string;
  zipCode: string;
}

const MultipleLocations = () => {
  const { setStep, formData, setFormData } = useContext(AppContext);
  const locations = formData?.locations || [];

  // Function to add a new location
  const addNewLocation = () => {
    const newLocation: ILocationDetails = {
      locationName: "",
      locationIdentifier: "",
      streetAddress: "",
      streetAddressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    };
    setFormData({ ...formData, locations: [...locations, newLocation] });
  };

  // Function to remove a location
  const removeLocation = (index: number) => {
    const updatedLocations = (locations as ILocationDetails[]).filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, locations: updatedLocations });
  };

  // Function to handle input changes
  const handleLocationChange = (
    index: number,
    field: keyof ILocationDetails,
    value: string
  ) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = { ...updatedLocations[index], [field]: value };
    setFormData({ ...formData, locations: updatedLocations });
  };

  // Ensure at least one location exists on component mount
  useEffect(() => {
    if (locations.length === 0) {
      const newLocation: ILocationDetails = {
        locationName: formData?.locationName || "",
        locationIdentifier: formData?.locationIdentifier || "",
        streetAddress: formData?.streetAddress || "",
        streetAddressLine2: formData?.streetAddressLine2 || "",
        city: formData?.city || "",
        state: formData?.state || "",
        zipCode: formData?.zipCode || "",
      };
      setFormData({ ...formData, locations: [...locations, newLocation] });
    }
  }, []);

  return (
    <div>
      <Heading text="Additional Location(s) Information" />
      <div className="text-gray-500 text-base text-center pb-3">
        If you have multiple locations, please enter their details below. Click
        "Add More Location(s)" to include additional locations as needed.
      </div>

      {/* Location Fields */}
      {(locations as ILocationDetails[]).map((location, index) => (
        <div
          key={index}
          className="border border-gray-300 shadow-md p-3 rounded-md my-5"
        >
          <div className="grid grid-cols-2 gap-x-5">
            <TextInput
              label="Location Name"
              value={location.locationName}
              placeholder="Location Name"
              onChange={(e) =>
                handleLocationChange(index, "locationName", e.target.value)
              }
            />
            <TextInput
              label="Location Identifier"
              value={location.locationIdentifier}
              placeholder="Location Identifier"
              onChange={(e) =>
                handleLocationChange(
                  index,
                  "locationIdentifier",
                  e.target.value
                )
              }
            />
          </div>
          <TextInput
            label="Street Address"
            value={location.streetAddress}
            placeholder="Street Address"
            onChange={(e) =>
              handleLocationChange(index, "streetAddress", e.target.value)
            }
          />
          <TextInput
            label="Street Address Line 2"
            value={location.streetAddressLine2}
            placeholder="Street Address Line 2"
            onChange={(e) =>
              handleLocationChange(index, "streetAddressLine2", e.target.value)
            }
          />
          <div className="grid grid-cols-2 gap-x-5">
            <TextInput
              label="City"
              value={location.city}
              placeholder="City"
              onChange={(e) =>
                handleLocationChange(index, "city", e.target.value)
              }
            />
            <Select
              label="State"
              placeholder="State"
              value={location.state}
              onChange={(value) => handleLocationChange(index, "state", value!)}
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
            value={location.zipCode}
            placeholder="Zip Code"
            onChange={(e) =>
              handleLocationChange(index, "zipCode", e.target.value)
            }
          />

          {/* Remove Button (Shown only if there is more than one location) */}
          {locations.length > 1 && (
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

      {/* Add More Locations Button */}
      <Button
        className="!px-10 !text-lg !h-[52px] !mb-5"
        onClick={addNewLocation}
      >
        Add More Location(s)
      </Button>

      <Footer
        handleNextStep={() => setStep(10)}
        handlePreviousStep={() => setStep(8)}
      />
    </div>
  );
};

export default MultipleLocations;
