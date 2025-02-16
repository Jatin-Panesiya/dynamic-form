import useGetComponent from "../hooks/useGetComponent";

const Form = () => {
  const component = useGetComponent();

  return (
    <div>
      <img
        src="./logo.png"
        className="w-[100px] h-[100px] absolute top-10 left-10"
        alt="Mantine logo"
      />
      {component}
    </div>
  );
};

export default Form;
