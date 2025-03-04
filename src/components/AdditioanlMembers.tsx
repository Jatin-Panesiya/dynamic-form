import { useContext, useEffect, useState, useRef } from "react";
import { Button, TextInput, MultiSelect, Select } from "@mantine/core";
import Heading from "../common/Heading";
import Footer from "../common/Footer";
import AppContext from "../context/AppContext";
import { ILocationDetails } from "./MultipleLocations";

interface IMember {
  staffName: string;
  email: string;
  role: string;
  selectedLocations: string[];
  selectedFullLocations: ILocationDetails[];
}

const AdditionalMembers = () => {
  const { setStep, formData, setFormData } = useContext(AppContext);
  const members = formData?.members || [];
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>(
    {}
  );
  const lastMemberRef = useRef<HTMLDivElement | null>(null);

  const locationOptions = (
    (formData.locations as ILocationDetails[]) || []
  ).map((location) => ({
    value: location?.streetAddress,
    label: location?.streetAddress,
  }));

  const validateFields = () => {
    const newErrors: Record<number, Record<string, string>> = {};
    (members as IMember[]).forEach((member, index) => {
      const memberErrors: Record<string, string> = {};
      if (!member.staffName.trim() || member.staffName.length < 3)
        memberErrors.staffName = "Staff name is required";
      if (
        !member.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)
      )
        memberErrors.email = "Enter a valid email address";
      if (!member.role) memberErrors.role = "Please select a role";
      if (!member.selectedLocations.length)
        memberErrors.selectedLocations = "Select at least one location";
      if (Object.keys(memberErrors).length) newErrors[index] = memberErrors;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addNewMember = () => {
    const newMember: IMember = {
      staffName: "",
      email: "",
      role: "",
      selectedLocations: [],
      selectedFullLocations: [],
    };
    setFormData({ ...formData, members: [...members, newMember] });

    setTimeout(() => {
      lastMemberRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const removeMember = (index: number) => {
    const updatedMembers = (members as IMember[]).filter((_, i) => i !== index);
    setFormData({ ...formData, members: updatedMembers });
    const updatedErrors = { ...errors };
    delete updatedErrors[index];
    setErrors(updatedErrors);
  };

  const handleMemberChange = (index: number, field: string, value: any) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };

    if (field === "selectedLocations") {
      updatedMembers[index].selectedFullLocations = value.map(
        (selectedLocation: string) =>
          formData.locations.find(
            (location: any) => location.locationIdentifier === selectedLocation
          )
      );
    }

    setFormData({ ...formData, members: updatedMembers });
  };

  const handleNextStep = () => {
    if (validateFields()) setStep(11);
  };

  useEffect(() => {
    if (members.length === 0) addNewMember();
  }, []);

  return (
    <div className="container-home">
      <div className="px-10">
        <Heading text="Operation Hub: Team Member Access" />
        <div className="max-h-[calc(100vh-450px)] overflow-auto">
          {(members as IMember[]).map((member, index) => (
            <div
              key={index}
              className="p-3 rounded-md my-5"
              ref={index === members.length - 1 ? lastMemberRef : null}
            >
              <div className="grid max-[450px]:grid-cols-1 max-[600px]:grid-cols-2 grid-cols-4 gap-x-5">
                <TextInput
                  label="Staff Name"
                  value={member.staffName}
                  error={errors[index]?.staffName}
                  onChange={(e) =>
                    handleMemberChange(index, "staffName", e.target.value)
                  }
                />
                <TextInput
                  label="Email"
                  value={member.email}
                  error={errors[index]?.email}
                  onChange={(e) =>
                    handleMemberChange(index, "email", e.target.value)
                  }
                />
                <Select
                  label="Role"
                  data={["Admin", "Manager", "Staff"]}
                  value={member.role}
                  error={errors[index]?.role}
                  onChange={(value) => handleMemberChange(index, "role", value)}
                />
                <MultiSelect
                  label="Location(s)"
                  data={locationOptions}
                  value={member.selectedLocations}
                  error={errors[index]?.selectedLocations}
                  onChange={(selectedValues) =>
                    handleMemberChange(
                      index,
                      "selectedLocations",
                      selectedValues
                    )
                  }
                />
              </div>
              {members.length > 1 && (
                <div className="flex justify-end w-full">
                  <Button
                    variant="outline"
                    color="red"
                    className="mt-3"
                    onClick={() => removeMember(index)}
                  >
                    Remove Member
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          className="!px-10 !text-lg !h-[52px] !mb-5 max-[450px]:!px-5 mt-5 max-[450px]:!text-sm max-[450px]:!h-[40px]"
          onClick={addNewMember}
        >
          + Add More Member(s)
        </Button>
      </div>
      <Footer
        handleNextStep={handleNextStep}
        handlePreviousStep={() => setStep(9)}
      />
    </div>
  );
};

export default AdditionalMembers;
