import { cn } from "@/lib/utils"
import React from "react"

type TypographyH2Props = React.ComponentPropsWithoutRef<"h2">
export const TypographyH2 = ({ className, ...props }: TypographyH2Props) => {
  return <h2 className={cn("", className)} {...props} />
}

export const TextHighlight = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) => {
  return (
    <span className={cn("font-medium text-primary", className)} {...props} />
  )
}
