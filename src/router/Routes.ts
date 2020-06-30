import {
  SignInScreen,
  SignUpScreen,
  HomeScreen,
  ImportDataScreen,
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
    sidebarName: "Importar paquete XML",
    component: ImportDataScreen,
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
