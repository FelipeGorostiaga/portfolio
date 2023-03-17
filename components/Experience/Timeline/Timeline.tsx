const Timeline = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="relative h-[48px] aspect-square bg-blue-100">
        <div className="absolute top-[50%] left-[50%] h-[25px] aspect-square bg-blue-700"></div>
      </div>
      <div className="h-full w-2 bg-blue-100"></div>
    </div>
  );
};

export default Timeline;
