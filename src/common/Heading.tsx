const Heading = ({ text }: { text: string }) => {
  return (
    <div className="text-center max-[450px]:text-xl text-2xl font-bold py-5">
      {text}
    </div>
  );
};

export default Heading;
