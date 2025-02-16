import useGetComponent from "../hooks/useGetComponent";

const Form = () => {
  const component = useGetComponent();

  return (
    <div className="root">
      <img
        src="./logo.png"
        className="w-[100px] h-[100px] absolute top-10 left-10"
        alt="Mantine logo"
      />
      <div className="relative z-10">{component}</div>
    </div>
  );
};

export default Form;
