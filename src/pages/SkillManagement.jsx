import { useState } from "react";


export default function SkillManagement() {
  const [teachSkills, setTeachSkills] = useState([]);
  //const [learnSkills, setLearnSkills] = useState([]);
  const [skill, setSkill] = useState("");

  const addTeachSkill = () => {
    if (!skill.trim()) return;
    setTeachSkills([...teachSkills, skill]);
    setSkill("");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Skill Management</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* TEACH */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Skills I Can Teach</h2>

          <div className="flex gap-2 mb-4">
            <input
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g. UI Design"
              className="flex-1 border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={addTeachSkill}
              className="bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {teachSkills.map((s, i) => (
              <li key={i} className="px-3 py-2 bg-zinc-100 rounded-lg text-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* LEARN */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Skills I Want to Learn</h2>

          <p className="text-sm text-zinc-500">
            (Next step – same UI as teach skills)
          </p>
        </div>
      </div>


    </div>
  );
}
