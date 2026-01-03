import { useState } from "react";
import useSyncUser from "../hooks/useSyncUser";
import { SignOutButton } from "@clerk/clerk-react";

export default function Dashboard() {
  const [dbUser, setDbUser] = useState(null);

  useSyncUser(setDbUser);

  if (!dbUser) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white p-8">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {dbUser.name}</h1>

        <p className="text-white/80 mb-6">
          Credits Balance:
          <span className="text-indigo-400 text-xl ml-2">{dbUser.credits}</span>
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-xl p-4">
            Skills Taught: <strong>0</strong>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            Sessions Completed: <strong>0</strong>
          </div>
        </div>

        <div className="mt-8">
          <SignOutButton>
            <button className="px-4 py-2 bg-red-500 rounded">Logout</button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
