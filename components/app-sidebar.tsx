"use client"
import * as React from "react"
import Link from "next/link"
import {
  Ship,
  LayoutDashboard,
  Settings,

  FileText,

  LayoutGrid,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,

  SidebarMenuButton,
  SidebarMenuItem,

  SidebarMenuSubButton,

} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
function NavLink({
  to,
  children,
  isActive,
}: {
  to: string
  children: React.ReactNode
  isActive: boolean
}) {
  return (
    <SidebarMenuSubButton asChild isActive={isActive} className="m-0 p-0">
      <Link className="m-0 p-0" href={to}>{children}</Link>
    </SidebarMenuSubButton>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = usePathname()
  const router = useRouter();
  const isActive = (path: string) =>

    location === path || location.startsWith(path + "/")
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
    router.push("/login");
  }

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Ship className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">B Talents</span>
                  {/* <span className="text-xs text-sidebar-muted-foreground">v1.0.0</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col gap-2 justify-between w-full h-full">
          <div className="flex flex-col gap-4">
            {/* Dashboard */}
            <SidebarGroup>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard")} tooltip="Dashboard">
                    <Link href="/admin/dashboard">
                      <LayoutDashboard className="size-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            {/* COMMERCE */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                ━━ Administration ━━
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Articles" className="pointer-events">
                      <NavLink to="/admin/articles" isActive={isActive("/admin/articles")}>
                        <FileText className="size-4" />
                        <span>Articles</span>
                      </NavLink>
                      {/* <SidebarMenuBadge>3</SidebarMenuBadge> */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Catégories" className="pointer-events">
                      <NavLink to="/admin/categories" isActive={isActive("/admin/categories")}>
                        <LayoutGrid className="size-4" />
                        <span>Categories</span>
                      </NavLink>
                      {/* <SidebarMenuBadge>3</SidebarMenuBadge> */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Paramètres" className="pointer-events">
                      <NavLink to="/admin/parametres" isActive={isActive("/admin/parametres")}>
                        <Settings className="size-4" />
                        <span>Paramètres</span>
                      </NavLink>
                      {/* <SidebarMenuBadge>3</SidebarMenuBadge> */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex items-center gap-1">
                <ModeToggle />
                <Button variant="default" size="default" className="w-full" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
