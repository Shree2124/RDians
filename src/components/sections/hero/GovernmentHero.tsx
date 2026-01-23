"use client";

import React from "react";
import { ArrowRight, Activity, FileCheck, Users, ShieldAlert } from "lucide-react";

const GovernmentHero = () => {
    return (
        <section className="relative bg-slate-900 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}></div>

            {/* Radial Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900 z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">

                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-blue-100 text-xs font-semibold tracking-wide uppercase">Official Integrity Portal</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
                    Public <span className="text-blue-500">Promises.</span> <br className="hidden md:block" />
                    <span className="text-orange-500 relative inline-block">
                        Ground Reality.
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </span>
                </h1>

                <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-300 mb-10 font-light leading-relaxed">
                    Bridging the gap between government allocation and actual execution through data-driven transparency and citizen-led audits.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] overflow-hidden">
                        <span className="relative z-10 flex items-center">
                            Start Reporting
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Button Shine Effect */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                    </button>

                    <button className="px-8 py-4 bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-200 rounded-lg font-medium text-lg transition-colors flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Explore Data
                    </button>
                </div>

                {/* Stats Strip */}
                <div className="mt-20 w-full grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-10">
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-1">12k+</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Reports Filed</div>
                    </div>
                    <div className="flex flex-col items-center border-l border-slate-800">
                        <div className="text-3xl font-bold text-orange-500 mb-1">94%</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Resolution Rate</div>
                    </div>
                    <div className="flex flex-col items-center border-l border-slate-800">
                        <div className="text-3xl font-bold text-blue-400 mb-1">₹450cr</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Funds Tracked</div>
                    </div>
                    <div className="flex flex-col items-center border-l border-slate-800">
                        <div className="text-3xl font-bold text-green-500 mb-1">24/7</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Live Monitoring</div>
                    </div>
                </div>

            </div>

            {/* Decorative Bottom shape */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-white clip-path-slant-up"></div> */}
        </section>
    );
};

export default GovernmentHero;
