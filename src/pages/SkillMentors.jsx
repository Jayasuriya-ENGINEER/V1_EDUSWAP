import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPublicMentorSkill } from "../services/mentorSkillsApi";

// ✅ IMPORT THE CARD HERE

import MentorSkillCard from "../components/MentorSkillCard";


export default function SkillMentors() {
  const { skillName } = useParams();
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetchPublicMentorSkill(skillName).then(setMentors).catch(console.error);
  }, [skillName]);

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">
          Mentors for <span className="text-orange-500">{skillName}</span>
        </h1>

        {mentors.length === 0 ? (
          <p className="text-zinc-400">No mentors available yet</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <MentorSkillCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
