import ReduxProvider from '@/store/provider';
import React from 'react'

function DashboardRouteLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}

export default DashboardRouteLayout