// components/Container.tsx
import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

export const Container = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={clsx(
        "w-full max-w-[95%] mx-auto px-2 sm:px-4 md:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
