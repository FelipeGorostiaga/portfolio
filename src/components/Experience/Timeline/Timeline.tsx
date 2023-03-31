const Timeline = ({ showBar = true }: { showBar?: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-start ">
      <div className="relative h-[32px] md:h-[50px] aspect-square rounded-full bg-blue-100 bg-opacity-40 mb-2 dark:bg-[#080a14]">
        <div className="absolute top-[50%] left-0 right-0 m-auto translate-y-[-50%] h-[7px] md:h-[15px] aspect-square bg-blue-600 bg-opacity-60 rounded-full dark:bg-blue-400 dark:bg-opacity-100"></div>
      </div>
      {showBar && <div className="h-[calc(100%-32px-1rem)] md:h-[calc(100%-60px-0.5rem)] w-2 bg-gray-100 dark:bg-[#1a1919]"></div>}
    </div>
  );
};

export default Timeline;
