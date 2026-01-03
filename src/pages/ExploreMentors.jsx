import { useEffect, useState } from "react";
import { fetchPublicMentorSkills } from "../services/mentorSkillsApi";
import MentorSkillCard from "../components/MentorSkillCard";

export default function ExploreMentors() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchPublicMentorSkills().then(setSkills).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Learn from Community Mentors
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <MentorSkillCard key={skill.id} data={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
