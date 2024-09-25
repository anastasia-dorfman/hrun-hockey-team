import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout, { loader as layoutLoader } from "./pages/Layout";
import Layout from "./pages/Layout";
import Home, { loader as latestNewsLoader } from "./pages/Home";
import News, { loader as newsLoader } from "./pages/News";
import NewsContent, { loader as newsContentLoader } from "./pages/NewsContent";
import Team, { loader as coachesLoader } from "./pages/Team";
import TeamHistory, { loader as milestonesLoader } from "./pages/TeamHistory";
// import StatsLayout from "./components/StatsLayout";
import StatsLayout from "./pages/stats/StatsLayout";
import Dashboard from "./pages/stats/Dashboard";
import StatsSummary from "./pages/stats/StatsSummary";
import StatsTeams from "./pages/stats/StatsTeams";
import StatsGlossary from "./pages/stats/StatsGlossary";
import Shop, { loader as productsLoader } from "./pages/Shop";
import ProductDetail, { loader as productLoader } from "./pages/ProductDetail";
import Schedule, { loader as scheduleLoader } from "./pages/Schedule";
import Community from "./pages/Community";
import HockeySchool from "./pages/HockeySchool";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import CreateAccount, { action as createAccount } from "./pages/CreateAccount";
import Login, { action as login } from "./pages/Login";
import AccountLayout from "./pages/account/AccountLayout"; // loader as userLoader,
import Profile from "./pages/account/Profile";
import Register from "./pages/account/Register";
import MyOrders, { loader as ordersLoader } from "./pages/account/MyOrders";
import Settings from "./pages/account/Settings";
import Support from "./pages/account/Support";
import Cart, { loader as cartLoader } from "./pages/Cart";
import Tickets from "./pages/Tickets";
import NotFound from "./pages/NotFound";
import "./App.css";
import PageOverlay from "./components/shared/PageOverlay";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import ErrorBoundry from "./components/shared/ErrorBoundry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader: layoutLoader,
    children: [
      { index: true, element: <Home />, loader: latestNewsLoader },
      { path: "news", element: <News />, loader: newsLoader },
      { path: "news/:id", element: <NewsContent />, loader: newsContentLoader },
      { path: "team", element: <Team />, loader: coachesLoader },
      { path: "history", element: <TeamHistory />, loader: milestonesLoader },
      {
        path: "stats/",
        element: <StatsLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "skaters", element: <StatsSummary playerType="skater" /> },
          { path: "goalies", element: <StatsSummary playerType="goalie" /> },
          { path: "teams", element: <StatsTeams /> },
          { path: "glossary", element: <StatsGlossary /> },
        ],
      },
      { path: "shop", element: <Shop />, loader: productsLoader },
      { path: "shop/:id", element: <ProductDetail />, loader: productLoader },
      { path: "schedule", element: <Schedule />, loader: scheduleLoader },
      { path: "community", element: <Community /> },
      { path: "school", element: <HockeySchool /> },
      { path: "events", element: <Events /> },
      { path: "contact", element: <Contact /> },
      {
        path: "account/",
        element: (
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        ),
        // element: <AccountLayout />,
        // loader: userLoader,
        children: [
          { index: true, element: <Profile /> },
          { path: "register", element: <Register /> },
          { path: "orders", element: <MyOrders />, loader: ordersLoader },
          { path: "settings", element: <Settings /> },
          { path: "support", element: <Support /> },
        ],
      },
      { path: "cart", element: <Cart />, loader: cartLoader },
      { path: "tickets", element: <Tickets /> },
      { path: "register", element: <CreateAccount />, action: createAccount },
      { path: "login", element: <Login />, action: login },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundry>
      <PageOverlay>
        <RouterProvider router={router} />
      </PageOverlay>
    </ErrorBoundry>
  );
}

export default App;
