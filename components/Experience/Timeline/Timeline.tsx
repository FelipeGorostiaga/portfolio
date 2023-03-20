const Timeline = ({ showBar = true }: { showBar?: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-start ">
      <div className="relative h-[50px] aspect-square rounded-full bg-blue-100 bg-opacity-40 my-2">
        <div className="absolute top-[50%] left-0 right-0 m-auto translate-y-[-50%] h-[15px] aspect-square bg-blue-500 bg-opacity-70 rounded-full"></div>
      </div>
      {showBar && <div className="h-[calc(100%-60px)] w-2 bg-gray-100"></div>}
    </div>
  );
};

export default Timeline;
