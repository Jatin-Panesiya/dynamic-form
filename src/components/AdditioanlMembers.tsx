import { useContext, useEffect } from "react";
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

  const locationOptions = (
    (formData.locations as ILocationDetails[]) || []
  ).map((location) => ({
    value: location.locationIdentifier,
    label: `${location.locationName}, ${location.city}, ${location.state}`,
  }));

  const addNewMember = () => {
    const newMember = {
      staffName: "",
      email: "",
      role: "",
      selectedLocations: [],
      selectedFullLocations: [],
    };
    setFormData({ ...formData, members: [...members, newMember] });
  };

  const removeMember = (index: number) => {
    const updatedMembers = (members as IMember[]).filter((_, i) => i !== index);
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleMemberChange = (index: number, field: string, value: any) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };

    if (field === "selectedLocations") {
      const selectedLocationsDetails = value.map((selectedLocation: string) =>
        formData.locations.find(
          (location: any) => location.locationIdentifier === selectedLocation
        )
      );
      updatedMembers[index].selectedFullLocations = selectedLocationsDetails;
    }

    setFormData({ ...formData, members: updatedMembers });
  };

  useEffect(() => {
    if (members.length === 0) {
      const newMember = {
        staffName: formData.staffName || "",
        email: formData.email || "",
        role: formData.role || "",
        selectedLocations: formData.selectedLocations || [],
        selectedFullLocations: [],
      };
      setFormData({ ...formData, members: [...members, newMember] });
    }
  }, []);

  return (
    <div>
      <Heading text="Operation Hub: Team Member Access" />
      {members.map((member: any, index: number) => (
        <div
          key={index}
          className="border border-gray-300 shadow-md p-3 rounded-md my-5"
        >
          <div className="grid grid-cols-2 gap-x-5">
            <TextInput
              label="Staff Name"
              value={member.staffName}
              placeholder="Staff Name"
              onChange={(e) =>
                handleMemberChange(index, "staffName", e.target.value)
              }
            />
            <TextInput
              label="Email"
              value={member.email}
              placeholder="Email"
              onChange={(e) =>
                handleMemberChange(index, "email", e.target.value)
              }
            />
          </div>
          <Select
            label="Role"
            placeholder="Select Role"
            value={member.role}
            onChange={(value) => handleMemberChange(index, "role", value)}
            data={["Admin", "Manager", "Staff"]}
          />
          <MultiSelect
            label="Assigned Locations"
            placeholder="Select one or multiple locations"
            data={locationOptions}
            value={member.selectedLocations}
            onChange={(selectedValues) =>
              handleMemberChange(index, "selectedLocations", selectedValues)
            }
          />
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
      <Button
        className="!px-10 !text-lg !h-[52px] !mb-5"
        onClick={addNewMember}
      >
        + Add More Member(s)
      </Button>
      <Footer
        handleNextStep={() => setStep(15)}
        handlePreviousStep={() => setStep(16)}
      />
    </div>
  );
};

export default AdditionalMembers;
