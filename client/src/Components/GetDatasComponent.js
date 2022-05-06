import React from "react";

function GetDatasComponent({ result }) {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  container mx-auto gap-5 xl:gap-10 my-12">
      {result &&
        result.map((i) => (
          <div
            key={i._id}
            className="p-1 bg-white rounded flex-colo border border-blue-400"
          >
            <img
              src={i.image}
              alt="images"
              className="w-full h-64 object-cover"
            />
            <h1 className="font-semibold text-blue-800 italic my-4 leading-8 text-center">
              {i.title}
            </h1>
          </div>
        ))}
    </div>
  );
}

export default GetDatasComponent;
