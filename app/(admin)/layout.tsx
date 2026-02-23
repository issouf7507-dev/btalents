import { AppSidebar } from '@/components/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Admin - B Talents',
  description: 'Back office administration',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider>


      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />

        <SidebarInset>
          <ThemeProvider>

            <div className="flex flex-1 flex-col gap-4 ">
              {children}
              <Toaster />
            </div>
          </ThemeProvider>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )



}
