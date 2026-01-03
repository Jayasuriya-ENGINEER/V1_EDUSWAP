import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Landing from "./pages/Landing";
import UserHome from "./pages/UserHome";
import ExploreSkills from "./pages/ExploreSkills";
import SkillMentors from "./pages/SkillMentors";
import DashboardLayout from "./layouts/DashboardLayout";

import useSyncUser from "./hooks/useSyncUser"; // ✅ ADD THIS


import TeachSkill from "./pages/TeachSkill";

import ExploreMentors from "./pages/ExploreMentors";


import Requests from "./pages/Requests";

//import Conversation from "./pages/Conversation";

import Communities from "./pages/Communities";
//import Conversation from "./pages/Conversation";


import Chats from "./pages/Chats";


export default function MainApp() {
  // ✅ This runs silently after login
  useSyncUser();

  return (
    <>
      <SignedOut>
        <Landing />
      </SignedOut>

      <SignedIn>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/explore-skills" element={<ExploreSkills />} />
            <Route path="/skills/:skillName" element={<SkillMentors />} />
            <Route path="/teach-skill" element={<TeachSkill />} />
            <Route path="/mentors" element={<ExploreMentors />} />
            <Route path="/requests" element={<Requests />} />
          
            <Route path="/explore-communities" element={<Communities />} />
            <Route path="/messages" element={<Chats />} />
            <Route path="/chats" element={<Chats />} />
          </Route>
        </Routes>
      </SignedIn>
    </>
  );
}
