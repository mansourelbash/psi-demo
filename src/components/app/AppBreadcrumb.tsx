import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import React, { Children } from "react"

type Props = {
  data: { name: string; href: string }[]
}
export const AppBreadcrumb = ({ data }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="font-medium text-foreground sm:gap-1.5">
        {Children.toArray(
          data.map((breadcrumbItem, index) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={breadcrumbItem.href}>{breadcrumbItem.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== data.length - 1 && (
                <BreadcrumbSeparator className="font-normal">
                  /
                </BreadcrumbSeparator>
              )}
            </>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
