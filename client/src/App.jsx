import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import HockeySchool from "./pages/HockeySchool";
import News from "./pages/News";
import Schedule from "./pages/Schedule";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Stats from "./pages/Stats";
import Team from "./pages/Team";
import Tickets from "./pages/Tickets";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="team" element={<Team />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<ProductDetail />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="community" element={<Community />} />
          <Route path="school" element={<HockeySchool />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="stats" element={<Stats />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
