import { useUser } from "@clerk/clerk-react";
import { Star } from "lucide-react";

export default function MentorSkillCard({ mentor }) {

  const { user } = useUser(); 

  if (!user) return null;


  return (
    <div className="w-[320px] bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border">
      {/* Banner */}
      <div className="h-44 bg-zinc-100">
        <img
          src={mentor.bannerUrl || "mentor-skill.jpg"}
          alt={mentor.skill}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "mentor-skill.jpg";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Skill */}
        <h3 className="text-lg font-bold tracking-tight capitalize">
          {mentor.skill}
        </h3>

        {/* Mentor name */}
        <span className="text-sm text-zinc-500">
          Mentor •{" "}
          <span className="font-medium text-zinc-800">{mentor.mentorName}</span>
        </span>

        {/* Rating + learners */}

        <div className="flex items-center gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="font-medium">{mentor.rating || 0}</span>
          </div>

          <span>•</span>

          <span>{mentor.totalLearners || 0}+ learners</span>
        </div>

        {/* Level badge */}
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-600 font-semibold">
          {mentor.level}
        </span>

        {/* CTA */}
        <button
          onClick={async () => {
            try {
              await fetch(`${import.meta.env.VITE_API_URL}/api/requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  fromClerkId: user.id, // ✅ FIXED
                  toUserId: mentor.userId, // mentor owner
                  mentorSkillId: mentor.id,
                }),
              });

              alert("Request sent!");
            } catch (err) {
              console.error(err);
              alert("Failed to send request");
            }
          }}
          className="w-full mt-3 py-2.5 rounded-lg border border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition"
        >
          Request Session
        </button>
      </div>
    </div>
  );
}
