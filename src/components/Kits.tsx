import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import { Button, Modal, Select, TextInput } from "@mantine/core";
import useInputChange from "../hooks/useInputChange";
import { IProvider } from "./MultipleProvider";
import Autocomplete from "react-google-autocomplete";
import { GOOGLE_MAPS_API_KEY, ILocationDetails } from "./MultipleLocations";

const Kits = () => {
  const { setStep, formData, setFormData } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLocationObj, setNewLocationObj] = useState<ILocationDetails | null>(
    null
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = useInputChange();

  const kitProviderOptions = ((formData.providers as IProvider[]) || []).map(
    (provider, index) => ({
      value: `${provider?.providerFullName}_${index}`,
      label: `${provider?.providerFullName}_${index}`,
    })
  );

  const locationOptions = (
    (formData.locations as ILocationDetails[]) || []
  ).map((location) => ({
    value: location?.locationIdentifier,
    label: location?.streetAddress,
  }));

  locationOptions.push({
    value: "add_new_location",
    label: "Ship to a Different Address (Click to Enter)",
  });

  const handleLocationChange = (value: string | null) => {
    if (value === "add_new_location") {
      setIsModalOpen(true);
      handleInputChange("kitProviderShippingLocation", "");
    } else {
      handleInputChange("kitProviderShippingLocation", value);
    }
  };

  const handleAddressSelect = (place: any) => {
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

    const newLocation = {
      locationName: "",
      locationIdentifier: "",
      streetAddress,
      city,
      state,
      zipCode,
    };

    setNewLocationObj(newLocation);
    const updatedLocations = [...(formData.locations as ILocationDetails[])];
    updatedLocations.push(newLocation);
  };

  const handleAddNewLocation = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newLocationObj?.streetAddress)
      newErrors.streetAddress = "Street Address is required";
    if (!newLocationObj?.city) newErrors.city = "City is required";
    if (!newLocationObj?.state) newErrors.state = "State is required";
    if (!newLocationObj?.zipCode) newErrors.zipCode = "Zip Code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setFormData({
      ...formData,
      locations: [
        ...(formData.locations as ILocationDetails[]),
        newLocationObj,
      ],
    });
    setIsModalOpen(false);
  };

  const handleLocalInputChange = (field: string, value: any) => {
    setNewLocationObj({
      ...newLocationObj,
      [field]: value,
    } as ILocationDetails);
  };

  return (
    <div className="container-home">
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} opened={isModalOpen}>
          <div className="border border-gray-300 shadow-md p-3 rounded-md my-5">
            <div>
              <div className="mantine-TextInput-label font-semibold text-sm">
                Address Line 1
              </div>
              <Autocomplete
                apiKey={GOOGLE_MAPS_API_KEY}
                onPlaceSelected={(place: any) => handleAddressSelect(place)}
                onChange={(e) => {
                  handleLocalInputChange("streetAddress", e);
                }}
                options={{
                  types: ["geocode"],
                  componentRestrictions: { country: "us" },
                }}
                className="w-full p-2 border mantine-TextInput-input border-gray-300 rounded"
                placeholder="e.g., 73 Robert St"
              />
            </div>
            <TextInput
              label="Address Line 2 (Suite, Unit, etc.)"
              placeholder="e.g., Suite 200"
              value={newLocationObj?.streetAddressLine2}
              error={errors.streetAddressLine2}
              onChange={(e) => {
                handleLocalInputChange("streetAddressLine2", e.target.value);
              }}
            />

            <div className="grid max-[450px]:grid-cols-1 grid-cols-2 gap-x-5">
              <TextInput
                value={newLocationObj?.city}
                label="City"
                placeholder="e.g., Salt Lake City"
                error={errors.city}
                onChange={(e) => {
                  handleLocalInputChange("city", e.target.value);
                }}
              />
              <Select
                label="State"
                value={newLocationObj?.state}
                error={errors.state}
                onChange={(e) => {
                  handleLocalInputChange("state", e);
                }}
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
              value={newLocationObj?.zipCode}
              label="Zip Code"
              placeholder="e.g., 84101"
              onChange={(e) => {
                handleLocalInputChange("zipCode", e.target.value);
              }}
              error={errors.zipCode}
            />

            <Button className="mt-5" onClick={handleAddNewLocation}>
              Add
            </Button>
          </div>
        </Modal>
      )}
      <div className="px-10 max-[450px]:px-3">
        <Heading text="Kits" />
        <div className="text-gray-500 text-base max-[450px]:text-sm text-center pb-3">
          Enter the details of the provider working at your franchise. If you
          have more than one provider, click '+ Add More Provider(s)' to include
          additional providers.
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Select
            label="Provider"
            placeholder="Provider"
            value={formData?.kitProvider}
            onChange={(e) => {
              handleInputChange("kitProvider", e);
            }}
            data={kitProviderOptions}
          />
          <Select
            label="Shipping Location"
            placeholder="Shipping Location"
            value={formData?.kitProviderShippingLocation}
            onChange={handleLocationChange} // Custom handler
            data={locationOptions}
          />
        </div>
        <Button className="!px-10 !text-lg !h-[52px] !mb-5 max-[450px]:!px-5 mt-5 max-[450px]:!text-sm max-[450px]:!h-[40px]">
          + Add
        </Button>
      </div>
      <Footer
        handleNextStep={() => setStep(9)}
        handlePreviousStep={() => setStep(7)}
      />
    </div>
  );
};

export default Kits;
