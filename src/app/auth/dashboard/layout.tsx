import ReduxProvider from '@/store/provider';
import React from 'react'

function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>{children}</ReduxProvider>
  )
}

export default DashboardRouteLayout