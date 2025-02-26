"use client";

import Image from "next/image";
import { TextHighlight, TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import MoveUpRight from "@/components/icons/MoveUpRight";
import { Developer } from "@/types/Property";
import { FC } from "react";
import {useRouter} from "next/navigation";
type Props = {
  developer: Developer;
};

const ProjectDeveloper: FC<Props> =  ({ developer }) => {
  const router = useRouter();
  return (
    <div className="flex  gap-4 flex-wrap">
      <div className="flex gap-2">
        {developer.logo?.preview && (
          <Image
            src={developer.logo.preview}
            alt={developer.name}
            width={200}
            height={200}
            className="size-28 md:size-52"
          />
        )}
        <div className="flex flex-col">
          <TypographyH2 className="text-3xl">
            About <TextHighlight>{developer.name}</TextHighlight>
          </TypographyH2>
          <div className=" flex-col gap-4 justify-between w-full hidden md:flex">
            <p>{developer.overview}</p>
            <Button
              variant={"link"}
              className="self-start capitalize text-[#E0592A] text-sm font-normal p-1"
              onClick={() => router.push(`/developers/${developer.id}`)}
            >
              See More <MoveUpRight />
            </Button>
          </div>
        </div>
      </div>
      <div className=" flex-col gap-4 justify-between md:hidden flex">
        <p>{developer.overview}</p>
        <Button
          variant={"link"}
          className="self-start capitalize text-[#E0592A] text-sm font-normal p-1"
          onClick={() => router.push(`/developers/${developer.id}`)}
        >
          See More <MoveUpRight />
        </Button>
      </div>
    </div>
  );
};
export default ProjectDeveloper;
