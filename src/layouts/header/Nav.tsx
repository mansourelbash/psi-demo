import { CaretDown } from "@phosphor-icons/react"
import Link from "next/link"
import { Children } from "react"

const menuLinks = [
  {
    name: "Buy",
    // megaMenu: BuyMegaMenu,
  },
  {
    name: "Rent",
    // megaMenu: BuyMegaMenu,
  },
  {
    name: "Areas",
    // megaMenu: BuyMegaMenu,
  },
  {
    name: "Developers",
    // megaMenu: BuyMegaMenu,
  },
  {
    name: "New Launches",
    // megaMenu: BuyMegaMenu,
  },
  {
    name: "Services",
    // megaMenu: BuyMegaMenu,
  },
  {
    name: "More",
    // megaMenu: BuyMegaMenu,
  },
  {
    name: "Contact us",
    // megaMenu: BuyMegaMenu,
  },
]

type Props = {}
export const Nav = (props: Props) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {menuLinks.map((link, index) => (
        <Link
          key={index}
          href="#"
          className="p-3.5 flex gap-1 items-center text-sm font-medium"
        >
          {link.name}
          <CaretDown size={12} />
        </Link>
      ))}
    </div>
  )
}
