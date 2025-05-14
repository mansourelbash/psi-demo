"use client";

import { useAtom, useSetAtom } from "jotai";
import { Container } from "@/components/ui/container";
import { SettingsSelector } from "./SettingsSelector";
import { CitySelector } from "./CitySelector";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  Phone,
  UserCircle,
  WhatsappLogo,
  SignOut,
} from "@phosphor-icons/react";
import Image from "next/image";
import { List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isMobileMenuOpenAtom } from "@/atoms/settingsAtoms";
import { Nav } from "./Nav";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AuthModal from "@/components/app/auth/auth-modal";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { authService, refreshAccessToken } from "@/services/auth";
import { User } from "@/components/app/auth/LoginForm";
import { signOut, useSession } from "next-auth/react";
import { sessionAtom } from "@/atoms/sessionAtom";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(isMobileMenuOpenAtom);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  const setSession = useSetAtom(sessionAtom);

  useEffect(() => {
    if (session) {
      setSession(session);
    }
  }, [session, setSession]);

  const [, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [expired, setExpired] = useState<Date | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [isModalVisible]);

  const clearAuthData = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleModal = () => {
    if (!user) {
      setIsModalVisible(!isModalVisible);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      signOut();
      await authService.logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    } finally {
      clearAuthData();
      setIsMobileMenuOpen(false);
      setIsDropdownOpen(false);
    }
  };

  const handleMobileAuthClick = () => {
    setIsMobileMenuOpen(false);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const userData = localStorage.getItem("access_token");

    if (userData) {
      const decoded = jwt.decode(userData);
      let expirationTime;

      if (decoded && typeof decoded !== "string") {
        expirationTime = (decoded as JwtPayload).exp;
      }

      if (expirationTime) {
        const expirationDate = new Date(expirationTime * 1000);
        setExpired(expirationDate);
        localStorage.setItem("token_expiration", expirationDate.toString());
      }
    }
  }, []);

  useEffect(() => {
    if (expired && new Date() > expired) {
      refreshAccessToken()
        .then((newAccessToken) => {
          setUser((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              access_token: newAccessToken,
            };
          });
        })
        .catch((error) => {
          console.error("Failed to refresh token:", error);
        });
    }
  }, [expired]);

  return (
    <>
      <header className="bg-[#051831] lg:bg-transparent md:bg-[#051831] lg:border-b lg:space-y-2.5 py-4 px-3 sm:border-0">
        <Container className="min-h-[51px] items-center justify-center sm:justify-between hidden lg:flex">
          <div className="flex gap-2 order-1 sm:order-none">
            <SettingsSelector />
            <CitySelector />
          </div>

          <div className="flex gap-6 items-center text-sm font-medium order-3 sm:order-none">
            <a href="tel:600 548 200" className="flex gap-1 items-center">
              <Phone size={18} /> <span>600 548 200</span>
            </a>
            <a
              href="https://wa.me/600548200"
              className="flex gap-1 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo size={18} /> <span>600 548 200</span>
            </a>
          </div>
        </Container>

        <Container className="flex flex-wrap items-center justify-between">
          <Link href="/" passHref className="hidden lg:block cursor-pointer">
            <Image
              src="/logo.svg"
              alt="Abu Dhabi Real Estate"
              width={61}
              height={50}
              className="hidden lg:block cursor-pointer"
            />
          </Link>

          <button
            className="sm:hidden p-1.5 flex gap-1 items-center text-sm font-medium text-white lg:text-black"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <div className="hidden sm:block">
            <Nav />
          </div>
          <Link
            href="/"
            passHref
            className="lg:hidden sm:block md:block xs:block"
          >
            <Image
              src="/iconpsi.svg"
              alt="white logo image"
              width={50}
              height={30}
              className="lg:hidden sm:block md:block xs:block"
            />
          </Link>

          <div className="flex gap-1 mt-2 sm:mt-0">
            <Button className="rounded-full h-[43px] text-sm hidden sm:block">
              List your Property
            </Button>

            {/* Profile Button */}
            {user || session ? (
              <div className="flex items-center gap-2 border rounded-full px-4">
                <div className="hidden sm:flex items-center">
                  <span className="text-sm font-medium ml-2">
                    {user?.name || session?.user?.name}
                  </span>
                </div>
                <div className="relative group">
                  <button
                    className="rounded-full w-[43px] h-[43px] flex items-center justify-center overflow-hidden"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    {user?.image ||
                    session?.user?.image ||
                    "/icons/default-avatar.jpg" ? (
                      <Image
                        src={
                          user?.image ||
                          session?.user?.image ||
                          "/icons/default-avatar.jpg"
                        }
                        alt={
                          (user?.name || session?.user?.name) ?? "User avatar"
                        }
                        width={30}
                        height={30}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle className="w-[30px] h-[30px]" />
                    )}
                  </button>
                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <SignOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // If there's no user or session, show login button
              <Button
                className="rounded-full w-[43px] h-[43px]"
                size="icon"
                onClick={toggleModal}
                aria-label="Login"
              >
                <UserCircle className="w-[30px] h-[30px]" />
              </Button>
            )}
          </div>
        </Container>
      </header>

      {/* Auth Modal - Only shown when not logged in */}
      {isModalVisible && !user && <AuthModal toggleModal={toggleModal} />}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="sm:hidden fixed top-[80px] left-0 w-full h-full bg-white shadow-lg z-50 overflow-y-auto"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Nav />

            <div className="p-4 border-t">
              {user ? (
                <>
                  <div className="flex items-center mb-4">
                    {user?.profile_image ? (
                      <Image
                        src={
                          user?.profile_image.thumb ||
                          "/icons/default-avatar.jpg"
                        }
                        alt={user?.name ?? "User avatar"}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                    ) : (
                      <UserCircle size={40} className="mr-3" />
                    )}
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-red-500 text-white rounded-md text-sm font-medium flex items-center justify-center"
                  >
                    <SignOut size={16} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleMobileAuthClick}
                  className="w-full py-2 px-4 bg-orange-500 text-white rounded-md text-sm font-medium"
                >
                  Login / Register
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
