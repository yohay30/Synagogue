import React from "react";
import { Route, Routes } from "react-router-dom";

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
    <Routes>
      <Route path="/home-manager" element={<HomeManager />} />
      <Route path="/main-board" element={<MainBoard />} />
      <Route path="/prayers-manager" element={<PrayersManager />} />
      <Route path="/Lessons_manager" element={<LessonsManager />} />
      <Route path="/about_manager" element={<AboutManager />} />
      <Route path="/contact_manager" element={<ContactManager />} />
      <Route path="/events_manager" element={<EventsManager />} />
      <Route path="/friends-manager" element={<FriendsManager />} />
      <Route path="/massages_manager" element={<MassagesManager />} />
      <Route path="/memorials_manager" element={<MemorialsManager />} />
      <Route path="/chairs_manager" element={<ChairsManager />} />
      <Route path="/halacha_manager" element={<HalachaManager />} />
    </Routes>
  );
}
export default App_Routes;
