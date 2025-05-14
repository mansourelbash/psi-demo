import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AgentCardProps } from "@/types/agent";
import { CircleUser } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden md:p-[10px] sm:p-5 border border-[#ECECEC] border-offset-1">
      {/* Responsive Image */}
      <div className="relative w-full aspect-square">
        <Image
          src={agent?.profile_image?.preview || "/images/default-avatar.jpg"}
          alt={agent.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      {/* Main content area that grows */}
      <div className="md:p-1 sm:p-3 space-y-2 mt-2 bg-[#F9F9F9] rounded-md text-center py-3 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          {(() => {
            const nameParts = agent.name?.trim().split(" ") || [];
            const firstName = nameParts[0] || "";
            const lastName = nameParts[nameParts.length - 1] || "";
            return (
              <h3 className="font-semibold text-lg sm:text-xl">
                {firstName} {lastName}
              </h3>
            );
          })()}
          <p className="text-xs sm:text-sm text-[#ACACAC] text-ellipsis overflow-hidden whitespace-nowrap">
            <span>
              {agent?.title?.name || "Real Estate Agent (BLN)."}{" "}
              {agent?.phone_number || "1221782117"}
            </span>
          </p>
          {agent.languages && agent.languages.length > 0 && (
            <div className="text-sm sm:text-base">
              <span className="text-black">Speaks: </span>
              <span className="text-[#E0592A] font-medium">
                {agent.languages?.map((lang) => lang.name)?.join(", ")}
              </span>
            </div>
          )}
        </div>

        <hr className="w-[90%] mx-auto" />

        {/* Buttons pinned to bottom */}
        <div className="flex-none flex flex-col sm:flex-row gap-2 pt-2 justify-center p-1 pb-2">
          <Button
            variant="primary-blue"
            className="font-normal flex text-[12px] items-center justify-center gap-1 h-10 sm:px-2 w-full sm:w-auto flex-1"
          >
            <CircleUser size={14} /> View Profile
          </Button>
          <Button
            variant="outline"
            className="font-normal flex text-[12px] flex-1 items-center justify-center gap-1 h-10 sm:px-2 w-full sm:w-auto border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white"
          >
            <WhatsAppIcon /> WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
