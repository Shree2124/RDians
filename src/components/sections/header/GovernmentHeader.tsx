"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, User } from "lucide-react";

/**
 * A minimal government header.
 * Key changes:
 * - Reduced height
 * - Removed heavy top bar
 * - Cleaner whitespace
 * - Simple "Government of India" text next to logo
 */
const GovernmentHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`bg-slate-900 text-white border-b border-slate-800 transition-all duration-300 sticky top-0 z-50 ${isScrolled ? "shadow-md py-2" : "py-3"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* Logo Section */}
                        <div className="flex items-center space-x-4">
                            <div className="relative w-32 h-12 md:w-70 md:h-14 flex-shrink-0 ">
                                {/* Scaling image to remove visual padding since auto-crop verified full canvas usage */}
                                <img
                                    src="/icon/logo3.png"
                                    alt="ResQnet Logo"
                                    className="w-full h-full object-contain scale-[1.35] origin-center"
                                />
                            </div>
                        </div>

                        {/* Desktop Navigation & Actions */}
                        <div className="hidden lg:flex items-center space-x-8">

                            {/* Minimal Nav Links */}
                            <nav className="flex space-x-6 text-sm font-medium text-slate-300">
                                <Link href="/community" className="hover:text-white transition-colors">Community</Link>
                                <Link href="/agencies" className="hover:text-white transition-colors">Agencies</Link>
                                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                            </nav>

                            <div className="h-5 w-px bg-slate-700"></div>

                            {/* Actions */}
                            <div className="flex items-center space-x-3">
                                {/* Search Icon only */}
                                <button className="text-slate-400 hover:text-white transition-colors mr-2">
                                    <Search size={18} />
                                </button>

                                {/* Login Button - Minimal */}
                                <Link href="/login" className="flex items-center space-x-2 bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 px-4 py-1.5 rounded-full text-sm font-semibold transition-all">
                                    <User size={16} />
                                    <span>Login</span>
                                </Link>

                                {/* Register Button */}
                                <Link href="/register" className="flex items-center space-x-2 bg-orange-600 text-white hover:bg-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold transition-all shadow-sm shadow-orange-900/20">
                                    <span>Register</span>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-md"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-slate-900 border-t border-slate-800 absolute w-full shadow-lg">
                        <div className="px-4 py-4 space-y-3">
                            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Dashboard</Link>
                            <Link href="/audits" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Audits</Link>
                            <Link href="/data" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Data</Link>
                            <Link href="/about" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">About</Link>
                            <div className="border-t border-slate-800 pt-3 mt-2 flex flex-col space-y-2">
                                <Link href="/login" className="w-full text-center bg-slate-800 text-slate-200 px-4 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link href="/register" className="w-full text-center bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Latest Updates Ticker */}
            <div className="bg-slate-950 text-white py-2 overflow-hidden relative z-40 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 flex items-center">
                    <div className="flex items-center space-x-2 mr-6 shrink-0 z-10 bg-slate-950 pr-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Latest Updates</span>
                    </div>

                    <div className="overflow-hidden relative w-full mask-linear-fade">
                        <div className="animate-marquee whitespace-nowrap text-xs md:text-sm font-medium text-slate-400 inline-block">
                            <span className="mx-6">📢 <span className="text-white">Heavy Rainfall Alert:</span> Red alert issues for coastal districts in Kerala. Teams deployed.</span>
                            <span className="mx-6 font-light opacity-30">|</span>
                            <span className="mx-6">📄 <span className="text-white">Audit Report 2025:</span> Infrastructure integrity report for Sector 7 bridges is now available for public review.</span>
                            <span className="mx-6 font-light opacity-30">|</span>
                            <span className="mx-6">🚀 <span className="text-white">New Feature:</span> Citizens can now upload video evidence for rapid incident verification.</span>
                            <span className="mx-6 font-light opacity-30">|</span>
                            <span className="mx-6">⚠️ <span className="text-white">Traffic Advisory:</span> NH-44 partially closed for maintenance. Please take alternate routes.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GovernmentHeader;
