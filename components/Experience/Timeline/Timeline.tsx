const Timeline = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="relative h-[60px] aspect-square rounded-full bg-blue-100 mb-2 mt-2">
        <div className="absolute top-[50%] left-0 right-0 m-auto translate-y-[-50%] h-[15px] aspect-square bg-blue-700 rounded-full"></div>
      </div>
      <div className="h-full w-2 bg-gray-200"></div>
    </div>
  );
};

export default Timeline;
