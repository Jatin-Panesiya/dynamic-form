import { useContext, useEffect, useState, useRef } from "react";
import { Button, TextInput, MultiSelect } from "@mantine/core";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import AppContext from "../context/AppContext";
import { ILocationDetails } from "./MultipleLocations";

interface IProvider {
  providerFirstName: string;
  providerLastName: string;
  email: string;
  selectedLocations: string[];
  selectedFullLocations: ILocationDetails[];
}

const MultipleProvider = () => {
  const { setStep, formData, setFormData } = useContext(AppContext);
  const providers = formData?.providers || [];
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>(
    {}
  );
  const providerRefs = useRef<(HTMLDivElement | null)[]>([]); // Store refs for providers

  const locationOptions = (
    (formData.locations as ILocationDetails[]) || []
  ).map((location) => ({
    value: location?.streetAddress,
    label: location?.streetAddress,
  }));

  const validateFields = () => {
    const newErrors: Record<number, Record<string, string>> = {};
    (providers as IProvider[]).forEach((provider, index) => {
      const providerErrors: Record<string, string> = {};
      if (!provider.providerFirstName.trim())
        providerErrors.providerFirstName = "First Name is required";
      if (!provider.providerLastName.trim())
        providerErrors.providerLastName = "Last Name is required";
      if (!provider.email?.trim()) providerErrors.email = "Email is required";
      if (!provider.selectedLocations.length)
        providerErrors.selectedLocations = "At least one location is required";
      if (Object.keys(providerErrors).length) newErrors[index] = providerErrors;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addNewProvider = () => {
    const newProvider = {
      providerFirstName: "",
      providerLastName: "",
      email: "",
      selectedLocations: [],
      selectedFullLocations: [],
    };

    setFormData({ ...formData, providers: [...providers, newProvider] });

    setTimeout(() => {
      const lastIndex = providers.length; // Get index of the newly added provider
      providerRefs.current[lastIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Delay to ensure re-rendering completes
  };

  const removeProvider = (index: number) => {
    const updatedProviders = (providers as IProvider[]).filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, providers: updatedProviders });
    const updatedErrors = { ...errors };
    delete updatedErrors[index];
    setErrors(updatedErrors);
  };

  const handleProviderChange = (index: number, field: string, value: any) => {
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

  const handleNextStep = () => {
    if (validateFields()) setStep(8);
  };

  useEffect(() => {
    if (providers.length === 0) {
      addNewProvider();
    }
  }, []);

  return (
    <div className="container-home">
      <div className="px-10">
        <Heading text="Provider Details" />
        <div className="text-gray-500 text-base text-center pb-3">
          If you have more than one provider working for your franchise, click
          "Add Another Provider" to add additional providers as needed.
        </div>

        <div className="max-h-[calc(100vh-450px)] overflow-auto">
          {providers.map((provider: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                providerRefs.current[index] = el;
              }}
              className="p-3 rounded-md my-5"
            >
              <div className="grid grid-cols-4 max-[450px]:grid-cols-1 max-[600px]:grid-cols-2 gap-x-5">
                <TextInput
                  label="First Name"
                  value={provider.providerFirstName}
                  error={errors[index]?.providerFirstName}
                  onChange={(e) =>
                    handleProviderChange(
                      index,
                      "providerFirstName",
                      e.target.value
                    )
                  }
                />
                <TextInput
                  label="Last Name"
                  value={provider.providerLastName}
                  error={errors[index]?.providerLastName}
                  onChange={(e) =>
                    handleProviderChange(
                      index,
                      "providerLastName",
                      e.target.value
                    )
                  }
                />
                <TextInput
                  label="Email Address"
                  value={provider.email}
                  error={errors[index]?.email}
                  onChange={(e) =>
                    handleProviderChange(index, "email", e.target.value)
                  }
                />
                <MultiSelect
                  label="Location(s)"
                  data={locationOptions}
                  value={provider.selectedLocations}
                  error={errors[index]?.selectedLocations}
                  onChange={(selectedValues) =>
                    handleProviderChange(
                      index,
                      "selectedLocations",
                      selectedValues
                    )
                  }
                />
              </div>

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
        </div>

        <Button
          className="!px-10 !text-lg !h-[52px] !mb-5 max-[450px]:!px-5 mt-5 max-[450px]:!text-sm max-[450px]:!h-[40px]"
          onClick={addNewProvider}
        >
          + Add More Provider(s)
        </Button>
      </div>
      <Footer
        handleNextStep={handleNextStep}
        handlePreviousStep={() => setStep(6)}
      />
    </div>
  );
};

export default MultipleProvider;
