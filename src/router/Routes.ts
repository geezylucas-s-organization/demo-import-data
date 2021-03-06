import {
  SignInScreen,
  SignUpScreen,
  HomeScreen,
  ImportDataScreen,
  AccountScreen,
} from "../screens";

export type RouteType = {
  path: string;
  sidebarName: string;
  component: React.FC;
};

export const RoutesPrivate: RouteType[] = [
  {
    path: "/",
    sidebarName: "Inicio",
    component: HomeScreen,
  },
  {
    path: "/importdata",
    sidebarName: "Cargar paquetes de XML",
    component: ImportDataScreen,
  },
  {
    path: "/myaccount",
    sidebarName: "Mi Cuenta",
    component: AccountScreen,
  },
];

export const RoutesPublic: RouteType[] = [
  {
    path: "/signin",
    sidebarName: "Sing in",
    component: SignInScreen,
  },
  {
    path: "/signup",
    sidebarName: "Sing up",
    component: SignUpScreen,
  },
];
