import React from "react";
import clsx from "clsx";
import { CardProps } from "@/types/Shared";

const CardComponent = ({
  title,
  description,
  children,
  className,
}: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-[15px] border border-[#ECECEC] p-[20px] lg:p-[30px] m-[15px] md:m-0 lg:mt-[20px] lg:mb-[20px]",
        className
      )}
    >
      <header className="text-center">
        <h4 className="font-semibold text-[16px] md:text-[20px]">{title}</h4>
        {description && (
          <p className="mt-4 text-[#414042] text-[16px] md:text-[14px] text-left">
            {description}
          </p>
        )}
      </header>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default CardComponent;
