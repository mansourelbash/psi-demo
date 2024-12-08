import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

export const Container = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={clsx("container w-[95%]", className)} {...props}>
      {children}
    </div>
  )
}
