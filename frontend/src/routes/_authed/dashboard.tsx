import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authed/dashboard")({
  component: RouteComponent,
});

function RouteComponent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="border-2 w-full">
          <SidebarTrigger />
          {children}
          <div className="border-2 border-blue-800 h-dvh">
            <h1 className="text-4xl text-center">This is the dashboard with a sidebar</h1>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
