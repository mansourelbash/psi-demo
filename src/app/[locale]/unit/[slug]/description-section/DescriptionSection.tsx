"use client"

import { TypographyH2 } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import { UnitModel } from "@/types/Unit"
import { ChevronDownIcon } from "lucide-react"
import { useRef, useState } from "react"

type Props = {
  unit: UnitModel
}
export const DescriptionSection = ({ unit }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean | null>(false)
  const textContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-7">
      <TypographyH2 className="font-medium">Description</TypographyH2>
      <div className="space-y-5">
        <div
          ref={textContainerRef}
          className={cn("line-clamp-4", {
            "line-clamp-none": isExpanded,
          })}
        >
          {unit.description}
        </div>
        {isExpanded !== null && (
          <button
            className="text-primary text-sm font-medium flex gap-1 items-center"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Read Less" : "Read more"}
            <ChevronDownIcon
              className={cn("size-4", {
                "rotate-180": isExpanded,
              })}
            />
          </button>
        )}
      </div>
    </div>
  )
}
