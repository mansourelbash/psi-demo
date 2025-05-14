"use client";
import React, { useState } from "react";
import { TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type AboutProps = {
  description: string;
  name: string;
};

const AboutCommunities = ({ description, name }: AboutProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <TypographyH2 className="font-medium mb-5">About {name}</TypographyH2>

      <div
        style={{
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "none" :6,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <Button
        variant={"link"}
        className="self-start capitalize text-[#E0592A] text-sm font-normal p-1"
        onClick={() => setExpanded(!expanded)}
      >
       {expanded ? 'read less' : 'read more'}
       {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}

      </Button>
    </div>
  );
};

export default AboutCommunities;
