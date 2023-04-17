import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./views/Home";
import { Timer } from "./views/Timer";
import Calendars from "./views/Calendars";
import { Blue } from "./views/Blue";
import { Red } from "./views/Red";
import { White } from "./views/White";
import { Black } from "./views/Black";
import Leaders from "./views/Leaders";

// BACK END 
import { Teams } from './be/views/Teams';
import { Admin } from './be/views/Admin';
import { Players } from "./be/views/Players";
import { Calendar } from "./be/views/Calendar";
import { StatisticsPerGame } from './be/views/StatisticsPerGame';
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/views/timer" element={<Timer />} />
        <Route exact path="/views/calendars" element={<Calendars />} />
        <Route exact path="/views/blue" element={<Blue />} />
        <Route exact path="/views/red" element={<Red />} />
        <Route exact path="/views/white" element={<White />} />
        <Route exact path="/views/black" element={<Black />} />
        <Route exact path="/views/leaders" element={<Leaders />} />

        {/* BACK END  */}
        <Route path="/be/views/admin" element={<Admin />} />
        <Route path="/be/views/teams" element={<Teams />} />
        <Route path="/be/views/players" element={<Players />} />
        <Route path="/be/views/calendar" element={<Calendar />} />
        <Route path="/be/views/statisticsPerGame" element={<StatisticsPerGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
