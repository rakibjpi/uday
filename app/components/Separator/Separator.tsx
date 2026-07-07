import React from "react";

interface Props {
  title?: string;
}

export default function Separator({ title }: Props) {
  return (
    <div className="my-4 border-t relative border-gray-300">
      <h1 className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-center text-gray-500">
        {title}
      </h1>
    </div>
  );
}
    