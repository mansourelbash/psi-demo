import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import React from "react"

type Props = {}
// export const InfoWithIcon = (props: Props) => {
//   return (
//     <div className="flex gap-3 items-center">
//       <div className="size-[36px] bg-secondary-white rounded-sm flex items-center justify-center text-primary">
//         <BedSideIcon className="size-6" />
//       </div>
//       <div className="space-y-1">
//         <h3 className="text-sm">Bedrooms</h3>
//         <span className="text-xl font-medium">{unit.bedrooms} Beds</span>
//       </div>
//     </div>
//   )
// }

export const Info = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-3 items-center", className)}
    {...props}
  />
))
Info.displayName = "Info"

export const InfoIconContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "size-[36px] bg-secondary-white rounded-sm flex items-center justify-center text-primary",
      className
    )}
    {...props}
  />
))
InfoIconContainer.displayName = "InfoIconContainer"

export const InfoDataContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
InfoDataContainer.displayName = "InfoDataContainer"

export const InfoTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "h3"
  return <Comp ref={ref} className={cn("text-sm", className)} {...props} />
})
InfoTitle.displayName = "InfoTitle"

export const InfoDesc = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-lg font-medium", className)}
      {...props}
    />
  )
})
InfoDesc.displayName = "InfoDesc"
