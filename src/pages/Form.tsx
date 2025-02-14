import useGetComponent from "../hooks/useGetComponent";

const Form = () => {
  const component = useGetComponent();

  return <div>{component}</div>;
};

export default Form;
