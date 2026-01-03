import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import NotificationBell from "../components/notifications/NotificationBell";

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
        {/* Logo */}
       {/* <div className="font-semibold text-lg text-orange-500">Skill Swap</div> */}
       <h1 className="flex items-center gap-2 text-xl font-bold tracking-wide text-white">
            <img
              src="logo.png"            // or "/images/logo.png" if in public/images
              alt="SkillCommunity logo"
              className="h-12 w-13 object-contain"
            />
              <span   
                    className="text-black" 
                      style={{
                      fontFamily: " system-ui, sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      // fontWeight: "900",
                      fontSize: "1.2rem",
              }}>
                SKILL
              </span>
              <span
                    className="text-orange-500"
                    style={{
                      fontFamily: "'Retro Pixel', system-ui, sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: "900",
                      fontSize: "2.5rem",
                      WebkitTextStroke: "0.1px ",  // thick black stroke
                      textShadow: "2px 2px 0 black, -2px -2px 0 black",  // extra outline boost
                    }}
                  >
                    SWAP
                  </span>
          </h1>
        {/* Navigation */}
        <nav className="flex gap-8 text-sm font-medium">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/explore-skills">Explore Skills</NavLink>
          <NavLink to="/explore-communities">Communities</NavLink>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          {/* Messages */}
          <button
            onClick={() => navigate("/messages")}
            className="text-zinc-600 hover:text-orange-500 transition"
            title="Messages"
          >
            <MessageSquare size={22} />
          </button>

          {/* Notifications */}
          <NotificationBell />
        </div>
      </header>

      <main className="max-w-7xl mx-auto pt-6 px-6">
        <Outlet />
      </main>
    </div>
  );
}
