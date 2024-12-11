import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex gap-1 relatave items-center rounded-sm border px-2 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      color: {
        primary: "bg-primary text-primary-foreground border-primary",
        "primary-blue":
          "bg-primary-dark-blue text-primary-foreground hover:bg-primary-dark-blue/90",
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        green: "bg-green-50 text-green-700 border-green-200",
        red: "bg-red-50 text-red-700 border-red-200",
        yellow: "bg-yellow text-yellow border-yellow",
        violet: "bg-violet text-violet border-violet",
        pink: "bg-pink-50 text-pink-700 border-pink-200",
        gray: "bg-gray-50 text-gray-700 border-gray-200",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      variant: {
        default: "dark:text-white",
        outline: "bg-transparent",
        gost: "border-0 bg-transparent",
        flat: "",
      },
    },
    // compoundVariants: [
    //   {
    //     color: "primary",
    //     variant: "flat",
    //     className: "bg-white dark:bg-primary/[0.15]",
    //   },
    //   {
    //     color: "blue",
    //     variant: "flat",
    //     className: "bg-white dark:bg-blue/[0.15]",
    //   },
    //   {
    //     color: "green",
    //     variant: "flat",
    //     className: "bg-white dark:bg-green/[0.15]",
    //   },
    //   {
    //     color: "red",
    //     variant: "flat",
    //     className: "bg-white dark:bg-red/[0.15]",
    //   },
    //   {
    //     color: "yellow",
    //     variant: "flat",
    //     className: "bg-white dark:bg-yellow/[0.15]",
    //   },
    //   {
    //     color: "violet",
    //     variant: "flat",
    //     className: "bg-white dark:bg-violet/[0.15]",
    //   },
    // ],
    defaultVariants: {
      variant: "default",
      color: "secondary",
    },
  }
)

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof chipVariants> {
  onClose?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, children, onClose, color, ...props }, ref) => {
    return (
      <div
        className={cn(chipVariants({ color, variant }), className)}
        {...props}
      >
        {children}
        {onClose && (
          <span
            className="em:text-xl cursor-pointer"
            onClick={(e) => onClose(e)}
          >
            <XIcon className="h-[1em] w-[1em]" />
          </span>
        )}
      </div>
    )
  }
)

export { Chip, chipVariants }

Chip.displayName = "Chip"
