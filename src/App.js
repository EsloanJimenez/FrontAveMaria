import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import { Timer } from "./views/Timer";
import Calendars from "./views/Calendars";
import { Team1 } from "./views/Team1";
import { Team2 } from "./views/Team2";
import { Team3 } from "./views/Team3";
import { Team4 } from "./views/Team4";
import { Team5 } from "./views/Team5";
import { Team6 } from "./views/Team6";
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
        <Route exact path="/views/1" element={<Team1 />} />
        <Route exact path="/views/2" element={<Team2 />} />
        <Route exact path="/views/3" element={<Team3 />} />
        <Route exact path="/views/4" element={<Team4 />} />
        <Route exact path="/views/5" element={<Team5 />} />
        <Route exact path="/views/6" element={<Team6 />} />
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
