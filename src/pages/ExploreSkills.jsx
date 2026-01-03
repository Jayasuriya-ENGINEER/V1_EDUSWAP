import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchExploreSkills, addSkillInterest } from "../services/skillsApi";
import { useNavigate } from "react-router-dom";



import { fetchPublicMentorSkills } from "../services/mentorSkillsApi";
import MentorSkillCard from "../components/MentorSkillCard";


import MentorSkillSkeleton from "../components/MentorSkillSkeleton";


export default function ExploreSkills() {
  const [loadingMentors, setLoadingMentors] = useState(true);

  const { user } = useUser();
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetchPublicMentorSkills().then(setMentors).catch(console.error);
  }, []);


  
  const filteredMentors = mentors.filter((mentor) =>
    mentor.skill.toLowerCase().includes(search.toLowerCase())
)



  useEffect(() => {
    fetchExploreSkills().then(setSkills).catch(console.error);
  }, []);

  const filteredSkills = skills.filter((s) =>
    s.skill.toLowerCase().includes(search.toLowerCase())
  );




  useEffect(() => {
    setLoadingMentors(true);
    fetchPublicMentorSkills()
      .then(setMentors)
      .catch(console.error)
      .finally(() => setLoadingMentors(false));
  }, []);


  const handleAddSkill = async () => {
    if (!newSkill.trim() || !user) return;

    try {
      setLoading(true);
      await addSkillInterest(user.id, newSkill.trim());
      setNewSkill("");
      alert("Skill added to your learning interests");
    } catch (err) {
      console.error(err);
      alert("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-semibold">Explore Skills</h1>
        <p className="text-zinc-500">
          Discover skills taught by real mentors on Skill Swap
        </p>
      </div>

      {/* SEARCH + ADD SKILL */}
      <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between">
        <input
          placeholder="Search skills to learn..."
          className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <input
            placeholder="Add a skill you want to learn (interest)"
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />

          <button
            onClick={handleAddSkill}
            disabled={loading}
            className="bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* SKILLS GRID */}
      {/* MENTORS GRID */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
        {loadingMentors ? (
          Array.from({ length: 6 }).map((_, i) => (
            <MentorSkillSkeleton key={i} />
          ))
        ) : (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
            {filteredMentors.length === 0 ? (
              <p className="text-zinc-400 col-span-full text-center">
                No mentors found for “{search}”
              </p>
            ) : (
              filteredMentors.map((mentor) => (
                <MentorSkillCard key={mentor.id} mentor={mentor} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
