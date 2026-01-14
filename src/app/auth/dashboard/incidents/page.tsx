'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Incident, IncidentSeverity, IncidentStatus } from '@/app/types';
import IncidentReportForm from '@/components/IncidentReportForm';

// Mock Data
const MOCK_INCIDENTS: Partial<Incident>[] = [
  {
    id: '1',
    category: 'Fire',
    description: 'Large structural fire reported at downtown district affecting multiple buildings.',
    severity: 'Critical',
    status: 'In Progress',
    timestamp: new Date('2024-01-14T17:03:00'),
    reporterId: 'user-1'
  },
  {
    id: '2',
    category: 'Medical',
    description: 'Multiple injuries reported after vehicle collision on highway.',
    severity: 'High',
    status: 'Reported',
    timestamp: new Date('2024-01-14T16:03:00'),
    reporterId: 'user-2'
  },
  {
    id: '3',
    category: 'Flood',
    description: 'Water overflow affecting residential basements in Sector 7.',
    severity: 'Medium',
    status: 'Resolved',
    timestamp: new Date('2024-01-13T18:03:00'),
    reporterId: 'user-3'
  },
];

export default function IncidentsPage() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);

  const getSeverityColor = (s: string) => {
    switch (s) {
      case 'Critical': return 'bg-red-50 text-red-600 border-red-100';
      case 'High': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Medium': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      default: return 'bg-green-50 text-green-600 border-green-100';
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Reported': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'In Progress': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Resolved': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Incident Management</h1>
          <p className="text-slate-500">Track and coordinate emergency responses</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors">
            <Icon icon="mdi:filter-variant" className="w-5 h-5" />
            Filters
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded-xl font-medium hover:bg-[#0284C7] shadow-md shadow-blue-200 transition-all"
          >
            <Icon icon="mdi:plus" className="w-5 h-5" />
            Report New
          </button>
        </div>
      </div>

      {/* Incident List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-12 md:col-span-5">Incident Details</div>
          <div className="hidden md:block md:col-span-3">Reporter</div>
          <div className="col-span-6 md:col-span-2">Severity</div>
          <div className="col-span-6 md:col-span-2">Status</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-100">
          {incidents.map((incident) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50 transition-colors group"
            >
              {/* Details */}
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${incident.category === 'Fire' ? 'bg-red-500' :
                    incident.category === 'Medical' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                  <div>
                    <h3 className="font-bold text-slate-800">{incident.category}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{incident.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                      <Icon icon="mdi:clock-outline" className="w-3.5 h-3.5" />
                      {incident.timestamp?.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reporter */}
              <div className="hidden md:flex md:col-span-3 items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${incident.reporterId}`} alt="Avatar" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">User user</p>
                  <p className="text-xs text-slate-400">Citizen</p>
                </div>
              </div>

              {/* Severity */}
              <div className="col-span-6 md:col-span-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(incident.severity || 'Low')}`}>
                  {incident.severity}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-6 md:col-span-2 flex items-center justify-between">
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(incident.status || 'Reported')}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  {incident.status}
                </span>

                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all">
                  <Icon icon="mdi:dots-vertical" className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination (Mock) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <p>Showing 3 results</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl"
            >
              <IncidentReportForm
                onCancel={() => setShowReportModal(false)}
                onSubmit={() => {
                  setShowReportModal(false);
                  // In a real app, this would trigger a refetch
                  alert('Incident Reported Successfully!');
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}