import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AgentCardProps } from "@/types/agent"
import { CircleUser } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden p-[10px] outline outline-[#f8f5f5] outline-offset-1">
      <div className="aspect-square relative">
        <Image src={`/images/agents/${agent.image}` || "/placeholder.svg"} alt={agent.name} width={300} height={300} />
      </div>
      <div className="p-1 space-y-[4px] mt-1 bg-[#F9F9F9] rounded-md text-center py-[10px]">
        <h3 className="font-semibold text-lg">{agent.name}</h3>
        <p className="text-sm text-[#ACACAC]">Real Estate Agent (BLN). 1221782117</p>
        <div className="text-sm">
          <span className="text-black ">Speaks: </span>
          <span className="text-[#E0592A] font-semibold">{agent.languages.join(", ")}</span> 
        </div>
   

        <div className='flex flex-wrap gap-2 pt-[15px]'>
          <Button
            variant='primary-blue'
            className='font-normal grow gap-1 h-9 px-0'
          >
            <CircleUser size={14} /> View Profile
          </Button>
          <Button
            variant='outline'
            className='font-normal gap-1 grow h-9 px-0 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white'
          >
            <WhatsAppIcon /> WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

