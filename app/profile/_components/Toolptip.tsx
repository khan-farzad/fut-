const Tooltip = ({ date,frequency }: { date: string,frequency:number }) => {
  return (
    <>
      <p className="absolute hidden group-hover:block right-[40%] translate-x-1/2 bottom-[110%] truncate bg-primary z-10 text-black px-2 py-1 rounded-xl">
        {frequency ? frequency : 0} submissions on {date}
      </p>
      <p className="absolute hidden group-hover:block size-5  right-[40%] translate-x-1/2 bottom-[90%] truncate bg-primary  text-black px-2 py-1 rotate-45"></p>
    </>
  );
};
export default Tooltip;
