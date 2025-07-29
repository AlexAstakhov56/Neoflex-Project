import { RouteProps } from "react-router-dom";
import {
  HomePage,
  LoanCodePage,
  LoanDetailsPage,
  LoanDocumentPage,
  LoanPage,
  LoanSignPage,
  NotFoundPage,
} from "../pages";

export enum AppRoutes {
  HOME = "HOME",
  LOAN = "LOAN",
  LOAN_DETAILS = "LOAN_DETAILS",
  LOAN_DOCUMENT = "LOAN_DOCUMENT",
  LOAN_SIGN = "LOAN_SIGN",
  LOAN_CODE = "LOAN_CODE",
  NOTFOUND = "NOTFOUND",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOAN]: "/loan",
  [AppRoutes.LOAN_DETAILS]: "/loan/:applicationId",
  [AppRoutes.LOAN_DOCUMENT]: "/loan/:applicationId/document",
  [AppRoutes.LOAN_SIGN]: "/loan/:applicationId/document/sign",
  [AppRoutes.LOAN_CODE]: "/loan/:applicationId/code",
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
  [AppRoutes.LOAN_DETAILS]: {
    path: RoutePath.LOAN_DETAILS,
    element: <LoanDetailsPage />,
  },
  [AppRoutes.LOAN_DOCUMENT]: {
    path: RoutePath.LOAN_DOCUMENT,
    element: <LoanDocumentPage />,
  },
  [AppRoutes.LOAN_SIGN]: {
    path: RoutePath.LOAN_SIGN,
    element: <LoanSignPage />,
  },
  [AppRoutes.LOAN_CODE]: {
    path: RoutePath.LOAN_CODE,
    element: <LoanCodePage />,
  },
  [AppRoutes.NOTFOUND]: {
    path: RoutePath.NOTFOUND,
    element: <NotFoundPage />,
  },
};
