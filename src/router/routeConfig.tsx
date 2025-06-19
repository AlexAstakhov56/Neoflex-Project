import { RouteProps } from "react-router-dom";
import { HomePage, LoanPage, NotFoundPage } from "../pages";

export enum AppRoutes {
  HOME = "HOME",
  LOAN = "LOAN",
  NOTFOUND = "NOTFOUND",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOAN]: "/loan",
  [AppRoutes.NOTFOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.HOME,
    element: <HomePage />,
  },
  [AppRoutes.LOAN]: {
    path: RoutePath.LOAN,
    element: <LoanPage />,
  },
  [AppRoutes.NOTFOUND]: {
    path: RoutePath.NOTFOUND,
    element: <NotFoundPage />,
  },
};
