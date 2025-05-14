import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

type Props = {
  data: { name: string; href: string }[];
};

export const AppBreadcrumb = ({ data }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="font-medium text-foreground sm:gap-1.5">
        {data.map((breadcrumbItem, index) => (
          <React.Fragment key={`${breadcrumbItem.href}-${index}`}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={breadcrumbItem.href}>
                  {breadcrumbItem.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== data.length - 1 && (
              <BreadcrumbSeparator className="font-normal">/</BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};