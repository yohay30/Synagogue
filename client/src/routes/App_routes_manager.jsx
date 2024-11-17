import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeManager from "../manager/pages_manger/homeManager";
import AboutManager from '../manager/pages_manger/aboutManager'
import ContactManager from "../manager/pages_manger/contactManager";
import EventsManager from "../manager/pages_manger/eventsManager";
import FriendsManager from "../manager/pages_manger/friendsManager";
import MassagesManager from "../manager/pages_manger/massagesManager";
import MemorialsManager from "../manager/pages_manger/memorialsManager";
import PrayersManager from "../manager/pages_manger/prayersManager";
import LessonsManager from "../manager/pages_manger/lessonsManager";
import MainBoard from "../../src/mainBoard/pageMainBoard/mainBoard";
import ChairsManager from "../manager/pages_manger/chairsManager";
import HalachaManager from "../manager/pages_manger/halachaManager";


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
