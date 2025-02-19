import React from "react";
import clsx from "clsx";
import { CardProps } from "@/types/Shared";


const CardComponent = ({ title, description, children, className }: CardProps) => {
  return (
    <div className={clsx("border-gray-300 rounded-[15px] border p-[20px] md:p-[30px] mt-[20px]", className)}>
      <header className="text-center">
        <h4 className="font-semibold text-[16px] md:text-[20px]">{title}</h4>
        {description && (
          <p className="mt-4 text-[#414042] text-[16px] md:text-[14px]">
            {description}
          </p>
        )}
      </header>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default CardComponent;
