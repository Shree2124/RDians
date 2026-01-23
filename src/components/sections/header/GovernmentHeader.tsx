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
            <header className={`bg-white text-slate-900 border-b border-gray-100 transition-all duration-300 sticky top-0 z-50 ${isScrolled ? "shadow-sm py-2" : "py-3"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* Logo Section */}
                        <div className="flex items-center space-x-3">
                            {/* Emblem Placeholder - Minimal */}
                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                <span className="text-[28px] leading-none text-slate-800" title="National Emblem">🏛️</span>
                            </div>

                            <div className="flex flex-col justify-center h-full">
                                <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 leading-none">
                                    PROJECT RESQNET
                                </h1>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-[10px] md:text-[11px] font-semibold text-slate-500 uppercase tracking-widest border-r border-slate-300 pr-2">
                                        Government of India
                                    </span>
                                    <span className="text-[10px] md:text-[11px] text-orange-600 font-medium hidden sm:inline-block">
                                        Disaster Management Portal
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation & Actions */}
                        <div className="hidden lg:flex items-center space-x-8">

                            {/* Minimal Nav Links */}
                            <nav className="flex space-x-6 text-sm font-medium text-slate-600">
                                <Link href="/dashboard" className="hover:text-blue-900 transition-colors">Dashboard</Link>
                                <Link href="/audits" className="hover:text-blue-900 transition-colors">Audits</Link>
                                <Link href="/data" className="hover:text-blue-900 transition-colors">Data</Link>
                                <Link href="/about" className="hover:text-blue-900 transition-colors">About</Link>
                            </nav>

                            <div className="h-5 w-px bg-slate-200"></div>

                            {/* Actions */}
                            <div className="flex items-center space-x-3">
                                {/* Search Icon only */}
                                <button className="text-slate-500 hover:text-blue-900 transition-colors mr-2">
                                    <Search size={18} />
                                </button>

                                {/* Login Button - Minimal */}
                                <Link href="/login" className="flex items-center space-x-2 bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 px-4 py-1.5 rounded-full text-sm font-semibold transition-all">
                                    <User size={16} />
                                    <span>Login</span>
                                </Link>

                                {/* Register Button */}
                                <Link href="/register" className="flex items-center space-x-2 bg-orange-600 text-white hover:bg-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold transition-all shadow-sm">
                                    <span>Register</span>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
                        <div className="px-4 py-4 space-y-3">
                            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">Dashboard</Link>
                            <Link href="/audits" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">Audits</Link>
                            <Link href="/data" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">Data</Link>
                            <Link href="/about" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">About</Link>
                            <div className="border-t border-slate-100 pt-3 mt-2 flex flex-col space-y-2">
                                <Link href="/login" className="w-full text-center bg-blue-50 text-blue-900 px-4 py-2 rounded-md text-sm font-medium">
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
            <div className="bg-slate-900 text-white py-2 overflow-hidden relative z-40">
                <div className="max-w-7xl mx-auto px-4 flex items-center">
                    <div className="flex items-center space-x-2 mr-6 shrink-0 z-10 bg-slate-900 pr-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Latest Updates</span>
                    </div>

                    <div className="overflow-hidden relative w-full mask-linear-fade">
                        <div className="animate-marquee whitespace-nowrap text-xs md:text-sm font-medium text-slate-300 inline-block">
                            <span className="mx-6">📢 <span className="text-white">Heavy Rainfall Alert:</span> Red alert issues for coastal districts in Kerala. Teams deployed.</span>
                            <span className="mx-6 font-light">|</span>
                            <span className="mx-6">📄 <span className="text-white">Audit Report 2025:</span> Infrastructure integrity report for Sector 7 bridges is now available for public review.</span>
                            <span className="mx-6 font-light">|</span>
                            <span className="mx-6">🚀 <span className="text-white">New Feature:</span> Citizens can now upload video evidence for rapid incident verification.</span>
                            <span className="mx-6 font-light">|</span>
                            <span className="mx-6">⚠️ <span className="text-white">Traffic Advisory:</span> NH-44 partially closed for maintenance. Please take alternate routes.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GovernmentHeader;
