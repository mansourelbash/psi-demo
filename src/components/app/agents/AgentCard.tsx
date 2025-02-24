import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AgentCardProps } from "@/types/agent";
import { CircleUser } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden md:p-[5px] sm:p-5 outline outline-[#f8f5f5] outline-offset-1">
      {/* Responsive Image */}
      <div className="relative w-full aspect-square">
        <Image
          src={`/images/agents/${agent.image}` || "/placeholder.svg"}
          alt={agent.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="md:p-1 sm:p-3 space-y-2 mt-2 bg-[#F9F9F9] rounded-md text-center py-3">
        <h3 className="font-semibold text-lg sm:text-xl">{agent.name}</h3>
        <p className="text-xs sm:text-sm text-[#ACACAC]">
          Real Estate Agent (BLN). 1221782117
        </p>
        <div className="text-sm sm:text-base">
          <span className="text-black">Speaks: </span>
          <span className="text-[#E0592A] font-semibold">
            {agent.languages.join(", ")}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-3">
          <Button
            variant="primary-blue"
            className="font-normal flex items-center justify-center gap-1 h-10 sm:px-3 w-full sm:w-auto"
          >
            <CircleUser size={14} /> View Profile
          </Button>
          <Button
            variant="outline"
            className="font-normal flex items-center justify-center gap-1 h-10 sm:px-3 w-full sm:w-auto border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white"
          >
            <WhatsAppIcon /> WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
