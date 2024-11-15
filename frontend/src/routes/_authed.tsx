import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCookie } from "@/utils/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async () => {
    const token = getCookie("token");
    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function AuthRouteComponent() {
  return <h1>hello world</h1> ;
}
