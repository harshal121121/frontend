import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Coverage from "../pages/Coverage/Coverage";
import AIRisk from "../pages/AIRisk/AIRisk";
import Builds from "../pages/Builds/Builds";

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<MainLayout />}
      >

        {/* HOME PAGE */}

        <Route
          index
          element={<Home />}
        />

        {/* DASHBOARD */}

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* COVERAGE */}

        <Route
          path="coverage"
          element={<Coverage />}
        />

        {/* AI RISK */}

        <Route
          path="ai-risk"
          element={<AIRisk />}
        />

        {/* BUILDS */}

        <Route
          path="builds"
          element={<Builds />}
        />

      </Route>

    </Routes>
  );
};

export default AppRoutes;