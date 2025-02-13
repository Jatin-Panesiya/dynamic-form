import { Button } from "@mantine/core";

const SoleOwner = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-5">
        Are you the sole owner, or is there more than one owner?
      </div>
      <div className="flex items-center gap-x-5 my-11 justify-center">
      <Button variant="outline" className="!px-10 !text-lg !h-[52px]">Sole Owner</Button>
      <Button variant="outline" className="!px-10 !text-lg !h-[52px]">More Than One Owner</Button>
      </div>
    </div>
  );
};

export default SoleOwner;
