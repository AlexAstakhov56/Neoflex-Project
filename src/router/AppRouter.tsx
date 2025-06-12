import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "./routeConfig";

const AppRouter: FC = () => {
  return (
    <Suspense fallback={"loading..."}>
      <Routes>
        {Object.values(routeConfig).map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
