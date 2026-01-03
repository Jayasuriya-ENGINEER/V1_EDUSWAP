import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { addMentorSkill } from "../services/mentorSkillsApi";
import { useNavigate } from "react-router-dom";

export default function TeachSkill() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mentorName: "",
    skill: "",
    level: "Beginner",
    weeklyAvailability: "",
    description: "",
    bannerUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addMentorSkill({
        clerkId: user.id,
        ...form,
      });

      alert("Skill added successfully");
      navigate("/");
    } catch (err) {
      alert("Failed to add skill");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-xl w-full rounded-xl p-6 space-y-4 border"
      >
        <h2 className="text-xl font-semibold">Add Skill You Teach</h2>

        <input
          name="mentorName"
          placeholder="Mentor name"
          className="w-full border px-4 py-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="skill"
          placeholder="Skill you offer"
          className="w-full border px-4 py-2 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="level"
          className="w-full border px-4 py-2 rounded"
          onChange={handleChange}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>

        <input
          name="weeklyAvailability"
          placeholder="Weekly availability (eg: 5 hrs/week)"
          className="w-full border px-4 py-2 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Short description"
          className="w-full border px-4 py-2 rounded"
          onChange={handleChange}
        />

        <input
          name="bannerUrl"
          placeholder="Banner image URL (optional)"
          className="w-full border px-4 py-2 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-orange-500 text-white py-2 rounded">
          Add Skill
        </button>
      </form>
    </div>
  );
}
