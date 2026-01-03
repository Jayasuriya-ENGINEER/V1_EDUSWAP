import {
  Coins,
  BookOpen,
  GraduationCap,
  Activity,
  TrendingUp,
} from "lucide-react";

import LearningProgressChart from "../components/LearningProgressChart";
import { DashboardCard } from "../components/dashboard/DashboardCard";
import { StatCard } from "../components/dashboard/StatCard";
import { CardHeader } from "../components/dashboard/CardHeader";
import { SkillTag } from "../components/dashboard/SkillTag";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchDashboardSummary } from "../services/dashboardApi";

import { fetchLearningProgress } from "../services/dashboardApi";

import { fetchUserSkills } from "../services/dashboardApi";

//import { useNavigate } from "react-router-dom";

import { fetchSkillInterests } from "../services/skillsApi";
import { fetchMyMentorSkills } from "../services/mentorSkillsApi";

import { useNavigate } from "react-router-dom";

import Speedometer from "../components/dashboard/Speedometer";


export default function UserHome() {
  // ✅ Hooks MUST be here
  const { user } = useUser();
  const [summary, setSummary] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [skills, setSkills] = useState({
    skillsTaught: [],
    skillsLearned: [],
  });
  const [skillInterests, setSkillInterests] = useState([]);

  const [mentorSkills, setMentorSkills] = useState([]);


  const navigate = useNavigate();

  // const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    fetchDashboardSummary(user.id).then(setSummary).catch(console.error);
    fetchLearningProgress(user.id).then(setProgressData).catch(console.error);
    fetchUserSkills(user.id).then(setSkills).catch(console.error);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    fetchSkillInterests(user.id).then(setSkillInterests).catch(console.error);
  }, [user]);



  useEffect(() => {
    if (!user) return;
    fetchMyMentorSkills(user.id).then(setMentorSkills).catch(console.error);
  }, [user]);

  return (
    <div className="min-h-screen bg-zinc-100 overflow-hidden pb-10">
      <div className="max-w-7xl mx-auto space-y-8 pt-5">
        {/* USER INFO */}
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome, {summary?.name || "Learner"}
          </h1>

          <p className="text-zinc-500">Lifelong learner</p>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* CREDITS + GRAPH */}
          <DashboardCard col="col-span-12 md:col-span-8">
            <CardHeader
              icon={<Coins />}
              title="Credits Earned"
              value={summary?.credits ?? "-"}
            />
            <LearningProgressChart data={progressData} />
          </DashboardCard>

          {/* AVG LEARNING */}
          {/* AVG LEARNING with Speedometer */}
          <DashboardCard col="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Avg Learning / Week</p>
              </div>
            </div>
            <Speedometer
              value={summary?.avgLearningPerWeek ?? 0}
              maxValue={20}
            />
          </DashboardCard>

          {/* STATS */}
          <StatCard
            icon={<BookOpen />}
            title="Skills Taught"
            value={summary?.skillsTaught ?? "-"}
          />

          <StatCard
            icon={<GraduationCap />}
            title="Lessons Completed"
            value={summary?.lessonsCompleted ?? "-"}
          />

          <StatCard icon={<TrendingUp />} title="Learning Rate" value="+12%" />

          {/* SKILLS */}
          <DashboardCard col="col-span-12 md:col-span-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Skills I Teach</h3>

              <button
                onClick={() => navigate("/teach-skill")}
                className="text-sm text-orange-600 font-medium hover:underline"
              >
                + Add Skill
              </button>
            </div>

            {mentorSkills.length === 0 ? (
              <p className="text-sm text-zinc-400">
                No teaching skills yet. Start mentoring 🚀
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {mentorSkills.map((s) => (
                  <SkillTag key={s.id} text={`${s.skill} (${s.level})`} />
                ))}
              </div>
            )}
          </DashboardCard>

          <DashboardCard col="col-span-12 md:col-span-6">
            <h3 className="font-medium mb-4">Skills I Want to Learn</h3>

            {skillInterests.length === 0 ? (
              <p className="text-sm text-zinc-400">No interests added yet</p>
            ) : (
              skillInterests.map((skill) => (
                <SkillTag key={skill} text={skill} />
              ))
            )}
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
