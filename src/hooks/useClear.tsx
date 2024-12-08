import React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  data: any | null | undefined
  cleanable?: boolean
}
const useClear = (
  data: any | null | undefined,
  cleanable: boolean,
  onChange?: (value: any) => void,
  deafultClear?: any
) => {
  const handelClear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    onChange && onChange(deafultClear)
  }

  const Clean = ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>) => (
    <>
      {data && cleanable && (
        <span
          className={cn(
            "text-muted-foreground hover:text-foreground text-base cursor-pointer",
            className
          )}
          {...props}
          onClick={handelClear}
        >
          <XIcon className="h-4 w-4" />
        </span>
      )}
    </>
  )
  return { Clean }
}
export default useClear
