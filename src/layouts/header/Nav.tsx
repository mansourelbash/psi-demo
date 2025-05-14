"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { CaretDown, CaretUp, List, X } from "@phosphor-icons/react";
import { isMobileMenuOpenAtom } from "@/atoms/settingsAtoms";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const buyMenuItems = [
  {
    title: "Apartments",
    href: "/buy/apartments",
    description: "Browse luxury apartments for sale",
  },
  {
    title: "Villas",
    href: "/buy/villas",
    description: "Find your dream villa",
  },
  {
    title: "Townhouses",
    href: "/buy/townhouses",
    description: "Modern townhouse communities",
  },
];

const rentMenuItems = [
  {
    title: "Short Term",
    href: "/rent/short-term",
    description: "Flexible rental options",
  },
  {
    title: "Long Term",
    href: "/rent/long-term",
    description: "Yearly rental contracts",
  },
];

const moreMenuItems = [
  {
    title: "Meet Our Team",
    href: "/agents-list",
    description:
      "Discover our experienced real estate professionals dedicated to helping you find your perfect property.",
  },
  {
    title: "Communities",
    href: "/communities",
    description:
      "Explore the vibrant neighborhoods we serve, complete with detailed information on lifestyle and amenities.",
  },
];

const menuLinks = [
  { name: "Buy", items: buyMenuItems, href: "" },
  { name: "Rent", items: rentMenuItems, href: "" },
  { name: "Areas", href: "" },
  { name: "Developers", href: "developers" },
  { name: "New Launches", href: "" },
  { name: "Services", href: "" },
  { name: "More", items: moreMenuItems, href: "" },
  { name: "Contact us", href: "" },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(isMobileMenuOpenAtom);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleMobileSubMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setOpenIndex(null);
  };

  // const [settings] = useAtom(settingsAtom);

  return (
    <nav className="relative w-full">
      <div className="flex items-center justify-between lg:hidden p-4">
        <span className="text-lg font-semibold text-black md:text-white">
          Menu
        </span>
        <button onClick={toggleMobileMenu} className="p-2">
          {isMobileMenuOpen ? (
            <X className="md:text-white text-black" size={24} />
          ) : (
            <List className="md:text-white text-black" size={24} />
          )}
        </button>
      </div>

      <div className="hidden lg:block">
        <NavigationMenu>
          <NavigationMenuList>
            {menuLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                {link.items ? (
                  <>
                    <NavigationMenuTrigger
                      className={navigationMenuTriggerStyle()}
                    >
                      {link.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[90vw] max-w-[600px] md:grid-cols-2">
                        {link.items.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                  href={link.href ? `/${link.href}` : "#"}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-20 p-2">
          {menuLinks.map((link, index) => (
            <div key={index} className="border-b">
              {link.items ? (
                <button
                  onClick={() => toggleMobileSubMenu(index)}
                  className="w-full text-left p-3 flex justify-between items-center text-sm font-medium"
                >
                  {link.name}
                  {openIndex === index ? (
                    <CaretUp size={16} />
                  ) : (
                    <CaretDown size={16} />
                  )}
                </button>
              ) : (
                <Link
                  href={`/${link.href}`}
                  className="block p-3 text-sm font-medium text-gray-700 hover:text-black"
                >
                  {link.name}
                </Link>
              )}

              {link.items && openIndex === index && (
                <ul className="pl-4 pb-2">
                  {link.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="block py-1 text-sm text-gray-700 hover:text-black"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};
