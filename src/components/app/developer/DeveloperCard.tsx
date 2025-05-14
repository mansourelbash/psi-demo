import Image from "next/image";
import { Button } from "@/components/ui/button";
import CoverPhoto from "/public/images/coverphoto.png";
import { useRouter } from "next/navigation";

interface DeveloperCardProps {
  developer: {
    id: string | number;
    name: string;
    profile_image?: { preview: string } | null;
    logo?: { preview: string } | null;
    starting_price?: string | number;
    dimensions?: string;
  };
}

const capitalizeFirstLetter = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function DeveloperCard({ developer }: DeveloperCardProps) {
  const router = useRouter();

  const handleNavigateDeveloperProfile = () => {
    router.push(`/developers/${developer.id}`);
  };

  return (
    <div className="rounded-lg bg-white overflow-hidden shadow-sm">
      <div className="relative">
        <Image
          src={developer?.profile_image?.preview || CoverPhoto}
          alt={developer?.name}
          width={500}
          height={300}
          className="p-2 h-[130px] object-cover rounded-lg"
        />
        <div className="absolute bottom-[-18px] left-[60px] bg-white rounded-full border-2 border-white shadow-md w-20 h-20 flex items-center justify-center">
          <Image
            src={developer?.logo?.preview || "/placeholder.svg"} 
            alt={`${developer?.name} logo`}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>

        {developer.dimensions && (
          <div className="absolute bottom-4 left-4 bg-blue-500 text-white text-sm px-3 py-1 rounded-md">
            {developer.dimensions}
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {capitalizeFirstLetter(developer.name)}
        </h2>
        <p className="text-gray-600 mb-4">
          Starting price from{" "}
          <span className="text-[#E0592A] font-medium">
            {developer.starting_price
              ? `${developer.starting_price} AED`
              : "N/A"}
          </span>
        </p>
        <Button
          onClick={handleNavigateDeveloperProfile}
          className="bg-[#2a2a5c] hover:bg-[#1e1e46] text-white"
        >
          Explore
        </Button>
      </div>
    </div>
  );
}
