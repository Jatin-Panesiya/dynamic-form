import { useContext } from "react";
import AppContext from "../context/AppContext";

const useInputChange = () => {
  const { formData, setFormData } = useContext(AppContext);
console.log(formData,'@@@@@@');

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  return handleInputChange;
};

export default useInputChange;
