import React from "react";
import { ImportDataScreen, LoginScreen } from "../screens";

export type RouteType = {
  path: string;
  sidebarName: string;
  component: React.FC;
}

export const Routes: RouteType[] = [
  {
    path: "/",
    sidebarName: "Home",
    component: LoginScreen,
  },
  {
    path: "/ImportData",
    sidebarName: "Importar paquete XML",
    component: ImportDataScreen,
  },
];
