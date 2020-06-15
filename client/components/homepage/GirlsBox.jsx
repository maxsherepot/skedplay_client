import { GirlCard, Loader } from "UI";
import React from "react";

function GirlsBox({employees}) {

  return (
    <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-4">
      {employees &&
        employees.data.map(girl => (
          <div
            className="flex justify-center sm:w-1/2 md:w-1/3 lg:w-1/4 1hd:w-1/5 px-2 "
            key={girl.id}
          >
            <GirlCard girl={girl} />
          </div>
        ))}
    </div>
  );
}

export default GirlsBox;
