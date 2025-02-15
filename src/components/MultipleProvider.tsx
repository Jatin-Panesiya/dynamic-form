import { useContext, useEffect } from "react";
import { Button, TextInput, MultiSelect } from "@mantine/core";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import AppContext from "../context/AppContext";
import { ILocationDetails } from "./MultipleLocations";

const MultipleProvider = () => {
  const { setStep, formData, setFormData } = useContext(AppContext);
  const providers = formData?.providers || [];

  const locationOptions = (
    (formData.locations as ILocationDetails[]) || []
  ).map((location) => ({
    value: location.locationIdentifier,
    label: `${location.locationName}, ${location.city}, ${location.state}`,
  }));

  const addNewProvider = () => {
    const newProvider = {
      providerFirstName: "",
      providerLastName: "",
      selectedLocations: [],
      selectedFullLocations: [],
    };
    setFormData({ ...formData, providers: [...providers, newProvider] });
  };

  const removeProvider = (index: number) => {
    const updatedProviders = providers.filter(
      (_: any, i: number) => i !== index
    );
    setFormData({ ...formData, providers: updatedProviders });
  };

  const handleProviderChange = (index: number, field: any, value: any) => {
    const updatedProviders = [...providers];
    updatedProviders[index] = { ...updatedProviders[index], [field]: value };

    if (field === "selectedLocations") {
      const selectedFullLocations = value.map((selectedLocation: string) => {
        return formData.locations.find(
          (location: any) => location.locationIdentifier === selectedLocation
        );
      });
      updatedProviders[index].selectedFullLocations = selectedFullLocations;
    }

    setFormData({ ...formData, providers: updatedProviders });
  };

  useEffect(() => {
    if (providers.length === 0) {
      const newProvider = {
        providerFirstName: formData.providerFirstName || "",
        providerLastName: formData.providerLastName || "",
        selectedLocations: formData.selectedLocations || [],
        selectedFullLocations:
          formData.selectedLocations?.map((selectedLocation: string) =>
            formData.locations.find(
              (location: any) =>
                location.locationIdentifier === selectedLocation
            )
          ) || [],
      };
      setFormData({ ...formData, providers: [...providers, newProvider] });
    }
  }, []);

  return (
    <div>
      <Heading text="Additional Provider(s) Information" />
      <div className="text-gray-500 text-base text-center pb-3">
        If there are multiple providers, please enter their details below. Click
        "Add More Providers" to include additional providers as needed.
      </div>

      {providers.map((provider: any, index: number) => (
        <div
          key={index}
          className="border border-gray-300 shadow-md p-3 rounded-md my-5"
        >
          <div className="grid grid-cols-2 gap-x-5">
            <TextInput
              label="First Name"
              value={provider.providerFirstName}
              placeholder="First Name"
              onChange={(e) =>
                handleProviderChange(index, "providerFirstName", e.target.value)
              }
            />
            <TextInput
              label="Last Name"
              value={provider.providerLastName}
              placeholder="Last Name"
              onChange={(e) =>
                handleProviderChange(index, "providerLastName", e.target.value)
              }
            />
          </div>
          <MultiSelect
            label="Assigned Locations"
            placeholder="Select one or multiple locations"
            data={locationOptions}
            value={provider.selectedLocations}
            onChange={(selectedValues) =>
              handleProviderChange(index, "selectedLocations", selectedValues)
            }
          />
          {providers.length > 1 && (
            <div className="flex justify-end w-full">
              <Button
                variant="outline"
                color="red"
                className="mt-3"
                onClick={() => removeProvider(index)}
              >
                Remove Provider
              </Button>
            </div>
          )}
        </div>
      ))}

      <Button
        className="!px-10 !text-lg !h-[52px] !mb-5"
        onClick={addNewProvider}
      >
        Add More Provider(s)
      </Button>

      <Footer
        handleNextStep={() => setStep(7)}
        handlePreviousStep={() => setStep(13)}
      />
    </div>
  );
};

export default MultipleProvider;
