"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TypographyH2 } from "@/components/ui/typography"
import { UnitModel } from "@/types/Unit"

type Props = {
  unit: UnitModel
}
export const MortgageCalculatorSection = ({ unit }: Props) => {
  return (
    <div className="space-y-9 mt-[70px] bg-secondary-white rounded-[21px] px-24 py-12">
      <TypographyH2 className="font-medium">Mortgage Calculator</TypographyH2>
      <div className="grid grid-cols-2 gap-7">
        <div className="space-y-6">
          <div className="gap-3.5 flex flex-col">
            <Label>Property Price</Label>
            <div className="relative">
              <Input
                placeholder="Price"
                value={unit.selling_price}
                disabled
                className="bg-background disabled:opacity-100"
              />
              <span className="absolute top-1/2 -translate-y-1/2 end-4 font-medium pointer-events-none">
                AED
              </span>
            </div>
          </div>
          <div className="gap-3.5 flex flex-col">
            <Label>Down Payment</Label>
            <div className="flex gap-3">
              <Input
                placeholder="Price"
                value={unit.selling_price}
                className="bg-background"
              />
            </div>
          </div>
          <div className="gap-3.5 flex flex-col">
            <Label>Property Price</Label>
            <Input
              placeholder="Price"
              value={unit.selling_price}
              className="bg-background"
            />
          </div>
          <div className="gap-3.5 flex flex-col">
            <Label>Property Price</Label>
            <Input
              placeholder="Price"
              value={unit.selling_price}
              className="bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
