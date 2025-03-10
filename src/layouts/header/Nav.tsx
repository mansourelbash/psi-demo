'use client'

import { useAtom } from 'jotai';
import { CaretDown } from "@phosphor-icons/react";
import { isMobileMenuOpenAtom, openMenuIndexAtom } from '@/atoms/settingsAtoms';
// Placeholder Mega Menu Components (replace with your actual content)
// const BuyMegaMenu = () => (
//   <div className="absolute top-full left-0 bg-white shadow-md p-4 w-full">
//     <h3>Buy Mega Menu Content</h3>
//     <p>Links and info related to buying properties.</p>
//   </div>
// );

// const RentMegaMenu = () => (
//   <div className="absolute top-full left-0 bg-white shadow-md p-4 w-full">
//     <h3>Rent Mega Menu Content</h3>
//     <p>Links and info related to renting properties.</p>
//   </div>
// );

// const AreasMegaMenu = () => (
//   <div className="absolute top-full left-0 bg-white shadow-md p-4 w-full">
//     <h3>Areas Mega Menu Content</h3>
//     <p>Information about different areas.</p>
//   </div>
// );

// const DevelopersMegaMenu = () => (
//   <div className="absolute top-full left-0 bg-white shadow-md p-4 w-full">
//     <h3>Developers Mega Menu Content</h3>
//     <p>Information about property developers.</p>
//   </div>
// );

// const NewLaunchesMegaMenu = () => (
//   <div className="absolute top-full left-0 bg-white shadow-md p-4 w-full">
//     <h3>New Launches Mega Menu Content</h3>
//     <p>Information about new property launches.</p>
//   </div>
// );

// const ServicesMegaMenu = () => (
//   <div className="absolute top-full left-0 bg-white shadow-md p-4 w-full">
//     <h3>Services Mega Menu Content</h3>
//     <p>Information about services related to real estate.</p>
//   </div>
// );

// const MoreMegaMenu = () => (
//   <div className="absolute top-full left-0 bg-white shadow-md p-4 w-full">
//     <h3>More Mega Menu Content</h3>
//     <p>Additional information and resources.</p>
//   </div>
// );

// const ContactUsMegaMenu = () => (
//   <div className="absolute top-full left-0 bg-white shadow-md p-4 w-full">
//     <h3>Contact Us Mega Menu Content</h3>
//     <p>Contact information and support resources.</p>
//   </div>
// );

type MenuLink = {
  name: string;
  megaMenu?: React.FC; // Optional mega menu component
};

const menuLinks: MenuLink[] = [
  {
    name: "Buy",
    // megaMenu: BuyMegaMenu,
  },
  {
    name: "Rent",
    // megaMenu: RentMegaMenu,
  },
  {
    name: "Areas",
    // megaMenu: AreasMegaMenu,
  },
  {
    name: "Developers",
    //megaMenu: DevelopersMegaMenu,
  },
  {
    name: "New Launches",
    // megaMenu: NewLaunchesMegaMenu,
  },
  {
    name: "Services",
    // megaMenu: ServicesMegaMenu,
  },
  {
    name: "More",
    // megaMenu: MoreMegaMenu,
  },
  {
    name: "Contact us",
    // megaMenu: ContactUsMegaMenu,
  },
];

export const Nav = () => {
  const [openMenuIndex, setOpenMenuIndex] = useAtom(openMenuIndexAtom);
  const [isMobileMenuOpen] = useAtom(isMobileMenuOpenAtom); // Only read the value for mobile menu state

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <nav className="relative">
      <div className="hidden sm:flex gap-4 flex-wrap relative z-10">
        {menuLinks.map((link, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => handleMenuToggle(index)}
              className="p-3.5 flex gap-1 items-center text-sm font-medium"
            >
              {link.name}
              <CaretDown size={12} />
            </button>
            {openMenuIndex === index && link.megaMenu && (
              <div className="absolute top-full left-0 w-screen bg-white shadow-md">
                <link.megaMenu />
              </div>
            )}
          </div>
        ))}
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md z-20">
          {menuLinks.map((link, index) => (
            <div key={index} className="border-b">
              <button
                onClick={() => handleMenuToggle(index)}
                className="w-full text-left p-3.5 flex gap-1 items-center text-sm font-medium"
              >
                {link.name}
                <CaretDown size={12} />
              </button>
              {openMenuIndex === index && link.megaMenu && (
                <div className="bg-gray-100 p-4">
                  <link.megaMenu />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};
