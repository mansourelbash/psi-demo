import React from 'react'
import HeroDeveloper from '@/components/app/HeroDeveloper'

const DevelopersPage = () => {
  const developers = [
    { name: "Manazel", logo: '/images/developers/manazel-logo.png', city: "Dubai" },
    { name: "Aldar", logo: '/images/developers/aldar-logo.png', city: "AbuDhabi" },
    { name: "Imkan", logo: '/images/developers/imkan-logo.png', city: "Sharjah" },
    { name: "Binghatti", logo: '/images/developers/binghatti-logo.png', city: "Dubai" },
    { name: "Aabar", logo: '/images/developers/aabar-logo.png', city: "AbuDhabi" },
    { name: "Damac", logo: '/images/developers/damac-logo.png', city: "Sharjah" },
    { name: "Meraas", logo: '/images/developers/meraas-logo.png', city: "Dubai" },
    { name: "Reportage Properties", logo: '/images/developers/reportage-properties-logo.png', city: "AbuDhabi" },
    { name: "Emaar", logo: '/images/developers/emaar-logo.png', city: "Sharjah" },
    { name: "Jumeirah Golf Estates", logo: '/images/developers/jumeirah-golf-estates-logo.png', city: "Dubai" },
    { name: "Dubai Properties", logo: '/images/developers/dubai-properties-logo.png', city: "AbuDhabi" },
    { name: "JLL", logo: '/images/developers/jll-logo.png', city: "Sharjah" },
    { name: "NineYards", logo: '/images/developers/nineyards-logo.png', city: "Dubai" },
    { name: "Sobha", logo: '/images/developers/sobha-logo.png', city: "AbuDhabi" },
    { name: "Bloom", logo: '/images/developers/bloom-logo.png', city: "Sharjah" },
    { name: "EagleHills", logo: '/images/developers/eaglehills-logo.png', city: "Dubai" },
    { name: "Nshama", logo: '/images/developers/nshama-logo.png', city: "AbuDhabi" }
  ];
  

  return (
    <div>
      <HeroDeveloper developers={developers}/>
    </div>
  )
}

export default DevelopersPage