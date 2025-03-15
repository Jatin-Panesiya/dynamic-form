import { useContext, useEffect, useState, useRef } from "react";
import { Button, TextInput, MultiSelect } from "@mantine/core";
import Footer from "../common/Footer";
import Heading from "../common/Heading";
import AppContext from "../context/AppContext";
import { ILocationDetails } from "./MultipleLocations";
import { showToast } from "../common/toast";

export interface IProvider {
  providerFullName: string;
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
  ).map((location, index) => ({
    value: `${location?.streetAddress}_${index}`,
    label: `${location?.streetAddress}_${index}`,
  }));

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!co$)[a-zA-Z]{2,}$/;

  const addNewProvider = () => {
    const newProvider = {
      providerFullName: "",
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

    // Clear error when user starts typing
    if (errors[index] && errors[index][field]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[index][field];
        if (Object.keys(updatedErrors[index]).length === 0) {
          delete updatedErrors[index];
        }
        return updatedErrors;
      });
    }
  };

  useEffect(() => {
    if (providers.length === 0) {
      addNewProvider();
    }
  }, []);

  const handleNextStep = () => {
    const newErrors: Record<number, Record<string, string>> = {};

    (providers as IProvider[]).forEach((provider, index) => {
      const providerErrors: Record<string, string> = {};

      if (!provider.providerFullName?.trim()) {
        providerErrors.providerFullName = "Name is required";
      }

      if (!provider.email?.trim()) {
        providerErrors.email = "Email is required";
      } else if (!emailRegex.test(provider.email)) {
        providerErrors.email = "Enter a valid email address";
      }

      if (!provider.selectedLocations.length) {
        providerErrors.selectedLocations = "At least one location is required";
      }

      if (Object.keys(providerErrors).length) {
        newErrors[index] = providerErrors;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast("Please correct the errors before proceeding.", "error");
      return;
    }

    setStep(8);
  };

  return (
    <div className="container-home">
      <div className="px-10 max-[450px]:px-3">
        <Heading text="Provider(s) Information" />
        <div className="text-gray-500 text-base max-[450px]:text-sm text-center pb-3">
          Enter the details of the provider working at your franchise. If you
          have more than one provider, click '+ Add More Provider(s)' to include
          additional providers.
        </div>

        <div className="max-h-[calc(100vh-450px)] overflow-auto pr-3">
          {providers.map((provider: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                providerRefs.current[index] = el;
              }}
              className="p-3 rounded-md my-5"
            >
              <div className="grid grid-cols-3 max-[450px]:grid-cols-1 max-[600px]:grid-cols-2 gap-x-5">
                <TextInput
                  label="Full Name"
                  value={provider.providerFullName}
                  error={errors[index]?.providerFullName}
                  placeholder="e.g., John Doe"
                  onChange={(e) =>
                    handleProviderChange(
                      index,
                      "providerFullName",
                      e.target.value
                    )
                  }
                />
                <TextInput
                  label="Email Address"
                  value={provider.email}
                  error={errors[index]?.email}
                  placeholder="e.g., johndoe@primeivhydration.com"
                  onChange={(e) =>
                    handleProviderChange(index, "email", e.target.value)
                  }
                />
                <MultiSelect
                  label="Location(s)"
                  data={locationOptions}
                  value={provider.selectedLocations}
                  error={errors[index]?.selectedLocations}
                  placeholder={
                    provider?.selectedLocations?.length
                      ? ""
                      : "Click to select the location(s)"
                  }
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
