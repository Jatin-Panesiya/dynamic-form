import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import { Button, Modal, Select, TextInput } from "@mantine/core";
import { IProvider } from "./MultipleProvider";
import Autocomplete from "react-google-autocomplete";
import { GOOGLE_MAPS_API_KEY, ILocationDetails } from "./MultipleLocations";
import { stateData } from "../common/common.utils";
import { showToast } from "../common/toast";

// BRITE Demonstration Kits
// - Select the provider.
// - Select/Add the shipping location.

interface IKitData {
  shippingProvider: string;
  shippingLocation: string;
}

const Kits = () => {
  const { setStep, formData, setFormData } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLocationObj, setNewLocationObj] = useState<ILocationDetails | null>(
    null
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [shippingLocation, setShippingLocation] = useState<string[]>([]);
  const [kitData, setKitData] = useState<IKitData>();
  const [baseErrors, setBaseErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const steetLocations = formData?.locations?.map(
      (location: ILocationDetails) => location.streetAddress
    );

    setShippingLocation(steetLocations ?? []);
  }, []);

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
    if (value === "Ship to a Different Address (Click to Enter)") {
      setIsModalOpen(true);
    } else {
      setFormData({ ...formData, shippingLocation: value });
      setKitData({
        shippingLocation: value ?? "",
        shippingProvider: kitData?.shippingProvider ?? "",
      });
    }
  };
  const handleProviderChange = (value: string | null) => {
    setFormData({ ...formData, shippingProvider: value });
    setKitData({
      shippingProvider: value ?? "",
      shippingLocation: kitData?.shippingLocation ?? "",
    });
  };

  useEffect(() => {
    if (formData?.shippingFullLocations?.length > 0) {
      const data = formData.shippingFullLocations.map(
        (ele: any) => ele.streetAddress
      );

      // Avoid duplicates by filtering out addresses that are already present
      setShippingLocation((prev) => {
        const uniqueAddresses = [...new Set([...prev, ...data])];
        return uniqueAddresses;
      });
    }
  }, [formData?.shippingFullLocations]); // Removed `shippingLocation` from dependency array

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
    if (!newLocationObj?.streetAddress) {
      return;
    }
    if (shippingLocation.includes(newLocationObj?.streetAddress)) {
      showToast("Location already exists", "error");
      return;
    }

    if (formData.shippingFullLocations) {
      setFormData({
        ...formData,
        shippingFullLocations: [
          ...formData.shippingFullLocations,
          newLocationObj,
        ],
        shippingLocation: newLocationObj?.streetAddress,
      });
    } else {
      setFormData({
        ...formData,
        shippingFullLocations: [newLocationObj],
        shippingLocation: newLocationObj?.streetAddress,
      });
    }

    setShippingLocation([...shippingLocation, newLocationObj?.streetAddress]);
    setIsModalOpen(false);
  };

  const handleLocalInputChange = (field: string, value: any) => {
    setNewLocationObj({
      ...newLocationObj,
      [field]: value,
    } as ILocationDetails);
  };

  const handleNext = () => {
    if (!formData?.shippingLocation) {
      setBaseErrors({ shippingLocation: "Select/Add the shipping location." });
      return;
    }
    if (!formData?.shippingProvider) {
      setBaseErrors({ shippingProvider: "Select the provider." });
      return;
    }
    setStep(9);
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
                data={stateData}
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
        <Heading text="BRITE Provider Demonstration Kits" />
        <div className="text-gray-500 text-base max-[450px]:text-sm text-center pb-3">
          Add provider(s) and their shipping location for the BRITE Provider
          Kits. These kits, packaged in a BRITE shipping box, include a dose
          determination card and four non-active 'hormone' prescriptions:
          Bi-est, Progesterone, Testosterone/DHEA (for women), and Testosterone
          (for men). These are provided at no cost to you.
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Select
            label="Provider"
            placeholder="Provider"
            value={formData?.shippingProvider}
            onChange={handleProviderChange}
            data={kitProviderOptions}
            error={baseErrors.shippingProvider}
          />
          <Select
            label="Shipping Location"
            placeholder="Shipping Location"
            value={formData?.shippingLocation}
            onChange={handleLocationChange} // Custom handler
            data={[
              ...shippingLocation,
              "Ship to a Different Address (Click to Enter)",
            ]}
            error={baseErrors.shippingLocation}
          />
        </div>
        <Button className="!px-10 !text-lg !h-[52px] !mb-5 max-[450px]:!px-5 mt-5 max-[450px]:!text-sm max-[450px]:!h-[40px]">
          + Send Kits to Additional Provider(s)
        </Button>
      </div>
      <Footer
        handleNextStep={handleNext}
        handlePreviousStep={() => setStep(7)}
      />
    </div>
  );
};

export default Kits;
