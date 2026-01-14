'use client';

/**
 * Dashboard Layout - Material Design
 * Features: Collapsible Rail Navigation, Top Header for User Context, Independent Scroll Zones
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useAlerts } from '@/app/hooks/useAlerts';
import { UserRole } from '@/app/types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

interface NavigationItem {
  name: string;
  icon: string;
  href: string;
  badge?: number;
  roles: UserRole[];
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const { user, logout, switchRole } = useAuth();
  const { unacknowledgedCount, getMostCriticalAlert, acknowledgeAlert } = useAlerts();

  // State
  const [isRailExpanded, setIsRailExpanded] = useState(false); // Default collapsed on desktop
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Time effect
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', icon: 'mdi:view-dashboard-outline', href: '#dashboard', roles: ['Citizen', 'Volunteer', 'AgencyAdmin'] },
    { name: 'Incidents', icon: 'mdi:alert-circle-outline', href: '#incidents', roles: ['Citizen', 'Volunteer', 'AgencyAdmin'] },
    { name: 'Resources', icon: 'mdi:package-variant-closed', href: '#resources', roles: ['Volunteer', 'AgencyAdmin'] },
    { name: 'Map View', icon: 'mdi:map-outline', href: '#map', roles: ['Citizen', 'Volunteer', 'AgencyAdmin'] },
    { name: 'Analytics', icon: 'mdi:chart-line', href: '#analytics', roles: ['AgencyAdmin', 'Volunteer', 'Citizen'] },
    { name: 'Alerts', icon: 'mdi:bell-outline', href: '#alerts', badge: unacknowledgedCount, roles: ['Volunteer', 'AgencyAdmin'] },
  ];

  const currentRole = user?.role || 'Citizen';
  const filteredNavigation = navigation.filter(item => item.roles.includes(currentRole));
  const criticalAlert = getMostCriticalAlert();

  const handleSwitchTo = (role: UserRole) => {
    switchRole(role);
    setIsProfileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-200 flex font-sans text-gray-900 overflow-hidden">

      {/* -------------------- NAVIGATION RAIL -------------------- */}
      <aside
        onMouseEnter={() => setIsRailExpanded(true)}
        onMouseLeave={() => setIsRailExpanded(false)}
        className={`fixed top-0 left-0 h-full z-40 bg-white border-r border-slate-200 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] hidden lg:flex flex-col
          ${isRailExpanded ? 'w-64' : 'w-24'}
        `}
      >
        {/* Rail Logo */}
        <div className="h-24 flex items-center justify-start px-5 shrink-0 relative overflow-hidden group">
          <div className="w-15 h-15 rounded-xl flex items-center justify-center overflow-hidden shrink-0 z-20">
            {/* Placeholder Logo - Replace src with user's logo */}
            <img src="/logo.png" alt="ResQNet Logo" className="w-8 h-8 object-contain" />
          </div>

          <div className={` transition-all duration-300 absolute left-20 whitespace-nowrap ${isRailExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <span className="font-display font-bold text-3xl tracking-tight text-slate-800">ResQ</span>
            <span className="font-display font-bold text-3xl  tracking-tight text-red-800">Net</span>
          </div>
        </div>

        {/* Rail Items */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-x-hidden">
          {filteredNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-xl transition-all group relative overflow-hidden
                bg-transparent text-slate-800 hover:text-[#0EA5E9] hover:bg-sky-50
              `}
            >
              <div className="w-10 flex justify-center shrink-0">
                <Icon icon={item.icon} className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </div>

              <span
                className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 absolute left-12 ${isRailExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
              >
                {item.name}
              </span>

              {/* Badge */}
              {item.badge ? (
                <span className={`absolute bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm transition-all duration-300 ${isRailExpanded ? 'right-3 top-3.5' : 'top-2 right-2 w-2.5 h-2.5 p-0 border-2 border-white'
                  }`}>
                  {isRailExpanded ? item.badge : ''}
                </span>
              ) : null}
            </a>
          ))}
        </nav>

        {/* Rail Footer */}
        <div className="p-4 flex justify-center mb-4">
          <button
            onClick={logout}
            className={`flex items-center text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors overflow-hidden ${isRailExpanded ? 'w-full px-4 py-3' : 'p-3'}`}
            title="Logout"
          >
            <Icon icon="mdi:logout" className="w-6 h-6 shrink-0" />
            <span
              className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${isRailExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* -------------------- MAIN AREA -------------------- */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 lg:ml-24`}>

        {/* TOP HEADER */}
        <header className="h-24 sticky top-0 z-30 px-8 flex items-center justify-between bg-white backdrop-blur-xl">

          {/* Left: Mobile Menu & Title */}
          <div className="flex items-center">
            <button
              className="lg:hidden mr-4 p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Icon icon="mdi:menu" className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-display font-bold text-[#1B2559] leading-tight">{title}</h1>
              {subtitle && <p className="text-sm font-medium text-slate-500 hidden sm:block mt-1">{subtitle}</p>}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">

            {/* Clock */}
            <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>{currentTime ? currentTime.toLocaleTimeString([], { hour12: false }) : '--:--:--'}</span>
            </div>

            {/* Role Badge */}
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 uppercase tracking-wide">
              {currentRole}
            </span>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 p-0.5 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-blue-700 font-bold text-sm">
                  {user?.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                </div>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-50 origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Switch Role</p>
                      {(['Citizen', 'Volunteer', 'AgencyAdmin'] as UserRole[]).map(role => (
                        <button
                          key={role}
                          onClick={() => handleSwitchTo(role)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${role === currentRole ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
                        >
                          {role}
                          {role === currentRole && <Icon icon="mdi:check" className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-50 pt-2">
                      <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center">
                        <Icon icon="mdi:logout" className="w-4 h-4 mr-2" />
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* CRITICAL ALERT BANNER */}
        <AnimatePresence>
          {criticalAlert && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="bg-red-600 text-white overflow-hidden shadow-inner"
            >
              <div className="px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-1.5 rounded-lg animate-pulse">
                    <Icon icon="mdi:alert-decagram" className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm uppercase tracking-wider mr-2">Critical Incident</span>
                    <span className="text-sm opacity-90">{criticalAlert.message}</span>
                  </div>
                </div>
                <button onClick={() => acknowledgeAlert(criticalAlert.id)} className="opacity-80 hover:opacity-100 transition-opacity">
                  <Icon icon="mdi:close" className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENT SCROLL AREA */}
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden w-full max-w-[1920px] mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl p-6 flex flex-col"
          >
            {/* Mobile Nav Content */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Icon icon="mdi:shield-alert" className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">CrisisResp</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}><Icon icon="mdi:close" className="w-6 h-6 text-gray-500" /></button>
            </div>

            <nav className="flex-1 space-y-2">
              {filteredNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-700 font-medium"
                >
                  <Icon icon={item.icon} className="w-6 h-6 mr-4" />
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}
    </div>
  );
}