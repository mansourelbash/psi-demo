import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

export const Container = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={clsx("container w-full lg:w-[95%] md:w-[95%] mt-[50px]", className)} {...props}>
      {children}
    </div>
  )
}
