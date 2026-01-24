"use client";

import React from "react";
import { ArrowRight, Users } from "lucide-react";

/**
 * Updated Hero Section.
 * - Text Aligned Left.
 * - New Tagline: "ResQnet - An unified platform for incident reporting"
 * - Subtext: "- by Rdians"
 * - Right Side: System Flow Diagram
 * - Font: Serif/Display font for headings.
 */
const GovernmentHero = () => {
    return (
        <section className="relative overflow-hidden py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-left z-10">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-800 rounded-full px-4 py-1.5 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wide">Project ResQnet Live</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-slate-900 leading-[1.1] mb-4">
                            ResQnet <br />
                            <span className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-slate-600 block mt-2">
                                An unified platform for <span className="text-orange-600 font-medium">incident reporting</span>
                            </span>
                        </h1>

                        <p className="text-sm font-bold text-slate-400 italic mb-8 pl-1">
                            - by Rdians
                        </p>

                        <p className="max-w-xl text-lg text-slate-600 mb-10 leading-relaxed">
                            Empowering citizens with a transparent, efficient, and data-driven system to report, verify, and resolve public infrastructure and disaster-related incidents.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center group">
                                Start Reporting
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                        </div>
                    </div>

                    {/* Right Visual - System Flow */}
                    <div className="relative z-10 flex justify-center">
                        {/* Decorative background blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100/50 to-orange-100/50 rounded-full blur-3xl -z-10"></div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl -z-10 transform rotate-2 scale-105 transition-transform group-hover:rotate-1"></div>
                            {/* 
                         Assuming the image is at /system_flow.png after the file copy operation. 
                         Add a nice shadow and styling to make it look like a floating diagram.
                     */}
                            <img
                                src="/system_flow.png"
                                alt="ResQnet System Flow Diagram"
                                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl rounded-xl border border-white/50"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GovernmentHero;
