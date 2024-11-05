import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeManager from "../pages_manger/homeManager";
import AboutManager from "../pages_manger/aboutManager";
import ContactManager from "../pages_manger/contactManager";
import EventsManager from "../pages_manger/eventsManager";
import FriendsManager from "../pages_manger/friendsManager";
import MassagesManager from "../pages_manger/massagesManager";
import MemorialsManager from "../pages_manger/memorialsManager";
import PrayersManager from "../pages_manger/prayersManager";
import LessonsManager from "../pages_manger/lessonsManager";
import MainBoard from "../pageMainBoard/mainBoard";
import ChairsManager from "../pages_manger/chairsManager";
import HalachaManager from "../pages_manger/halachaManager";


function App_Routes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home-manager" element={<HomeManager />} />
      <Route path="/main-board" element={<MainBoard />} />
      <Route path="/prayers-manager" element={<PrayersManager />} />
      <Route path="/Lessons-manager" element={<LessonsManager />} />
      <Route path="/about-manager" element={<AboutManager />} />
      <Route path="/contact-manager" element={<ContactManager />} />
      <Route path="/events-manager" element={<EventsManager />} />
      <Route path="/friends-manager" element={<FriendsManager />} />
      <Route path="/massages-manager" element={<MassagesManager />} />
      <Route path="/memorials-manager" element={<MemorialsManager />} />
      <Route path="/chairs-manager" element={<ChairsManager />} />
      <Route path="/halacha-manager" element={<HalachaManager />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App_Routes;
