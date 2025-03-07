const Skeleton = () => {
  const column = Array.from({ length: 10 });

  return (
    <>
      {column.map((_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-lg flex flex-col gap-4
             ${index == 0 || index == 7 ? "lg:col-span-2 lg:row-span-2" : ""}
        `}
        >
          <div
            className={`
            w-full rounded bg-gray-500
            ${index == 0 || index == 7 ? "h-full" : "h-48"}
             ${index == 7 ? "lg:order-last" : ""}
            `}
          ></div>

          <div className="flex flex-col gap-3">
            <div
              className={`
            w-full bg-gray-400 rounded-lg
            ${index == 0 || index == 7 ? "h-5" : "h-4"}
            `}
            ></div>
            <div
              className={`
             bg-gray-400 rounded-lg
             ${index == 0 || index == 7 ? "w-2/3 h-5" : "w-1/2 h-4"}
            `}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
