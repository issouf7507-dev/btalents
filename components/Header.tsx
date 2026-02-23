"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);

      // Animation de disparition/apparition au scroll
      if (scrollPosition > lastScrollY && scrollPosition > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/services", label: "Nos services" },
    { href: "/a-propos", label: "A Propos" },
    { href: "/articles", label: "Articles" },
    // { href: "/contact", label: "Contacts" },
  ];

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out w-full max-w-7xl mx-auto ${isVisible
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0"
        }
        
        `}
    >
      <div
        className={`relative flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 ${isScrolled
          ? "bg-white/90 backdrop-blur-xl  w-full max-w-7xl mx-auto"
          : "bg-white/10 backdrop-blur-md w-full max-w-7xl mx-auto"
          }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-all duration-300 hover:scale-105"
        >
          <Image
            src="/imgs/Logo-BTalents-white.png"
            alt="logo"
            width={isScrolled ? 100 : 120}
            height={isScrolled ? 100 : 120}
            className={`transition-all duration-300 ${isScrolled ? "brightness-0" : ""
              }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative group px-4 py-2 rounded-full transition-all duration-300 ${isScrolled
                ? "text-gray-800 hover:bg-gray-100"
                : "text-white hover:bg-white/20"
                }`}
            >
              <span className="relative z-10 font-medium text-sm">
                {link.label}
              </span>
              <span
                className={`absolute inset-0 rounded-full transition-all duration-300 ${isScrolled
                  ? "bg-gray-100 scale-0 group-hover:scale-100"
                  : "bg-white/20 scale-0 group-hover:scale-100"
                  }`}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg ${isScrolled
              ? "bg-[#789f78] text-white hover:bg-[#6a8f6a]"
              : "bg-white text-[#789f78] hover:bg-[#789f78] hover:text-white"
              }`}
          >
            Contactez-nous
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-full transition-all duration-300 ${isScrolled
            ? "text-gray-800 hover:bg-gray-100"
            : "text-white hover:bg-white/20"
            }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-md bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 transition-all duration-500 overflow-hidden ${isMobileMenuOpen
          ? "max-h-96 opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-4"
          }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-800 font-medium py-3 px-4 rounded-xl hover:bg-gray-100 hover:text-[#789f78] transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-6 py-3 rounded-full bg-[#789f78] text-white font-semibold text-center hover:bg-[#6a8f6a] transition-all duration-300 mt-2"
          >
            Contactez-nous
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
