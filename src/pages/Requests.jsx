import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchInbox, acceptRequest } from "../services/requestApi";

export default function Requests() {
  const { user } = useUser();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchInbox(user.id).then(setRequests);
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Session Requests</h1>

      {requests.length === 0 && (
        <p className="text-zinc-400">No new requests</p>
      )}

      {requests.map((r) => (
        <div
          key={r.id}
          className="bg-white border rounded-lg p-4 flex justify-between"
        >
          <div>
            <p className="font-medium">{r.users.name}</p>
            <p className="text-sm text-zinc-500">
              Skill: {r.mentor_skills.skill}
            </p>
          </div>

          <button
            onClick={() => acceptRequest(r.id)}
            className="bg-orange-500 text-white px-4 rounded"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}
