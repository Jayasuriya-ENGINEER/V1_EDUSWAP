import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="flex items-center gap-2 text-xl font-bold tracking-wide text-white">
            <img
              src="image.png"            // or "/images/logo.png" if in public/images
              alt="SkillCommunity logo"
              className="h-12 w-13 object-contain"
            />
              <span   style={{
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


          <div className="flex gap-4">
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 border border-orange-500/30 transition-colors">
                Login
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold leading-tight text-white">
            Learn. Teach. Grow <br />
            <span className="text-orange-500">Together as a Community</span>
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            A peer-driven platform where students exchange skills freely and
            communities support creators through memberships — no barriers, no
            pressure.
          </p>

          <div className="mt-8 flex justify-center gap-6">
            <SignUpButton mode="modal">
              <button className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-lg transition-colors">
                Get Started
              </button>
            </SignUpButton>

            <a
              href="#features"
              className="px-6 py-3 rounded-xl border border-orange-500 hover:bg-orange-500/10 text-white transition-colors"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            ["Create Profile", "List skills you can teach and want to learn"],
            ["Exchange Skills", "Learn through short mentorship sessions"],
            ["Earn & Support", "Join communities and support creators"],
          ].map(([title, desc], i) => (
             <div
                key={i}
                className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:border-orange-500 border border-transparent transition-all duration-300"
              >
              <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
              <p className="text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

        {/* FEATURES */}
      <section id="features" className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Platform Features
          </h3>

          <div className="space-y-10">
            {[
              {
                title: "Skill Exchange (No Money)",
                image:
                  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
                description:
                  "Swap skills directly with peers instead of paying cash, keeping learning community-driven.",
                points: [
                  "No financial barriers",
                  "Peer-to-peer learning",
                  "Earn by teaching skills",
                ],
              },
              {
                title: "Micro-Mentorship Sessions",
                image:
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
                description:
                  "Short mentorship calls designed to solve specific problems quickly.",
                points: [
                  "15–30 minute sessions",
                  "Cost-effective guidance",
                  "Fast doubt resolution",
                ],
              },
              {
                title: "Community Memberships",
                image:
                  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
                description:
                  "Join creator-led communities for continuous learning and support.",
                points: [
                  "Exclusive content & events",
                  "Mentor priority access",
                  "Strong peer network",
                ],
              },
              {
                title: "Rural Skill Empowerment",
                image:
                  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop",
                description:
                  "Connect rural learners and local experts using low-bandwidth tools.",
                points: [
                  "Low data consumption",
                  "Easy onboarding",
                  "Supports local expertise",
                ],
              },
              {
                title: "Secure Auth with Clerk",
                image:
                  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop",
                description:
                  "Modern authentication with secure login and session handling.",
                points: [
                  "Social & email login",
                  "Secure sessions",
                  "Scalable auth system",
                ],
              },
              {
                title: "Ethical Monetization",
                image:
                  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
                description:
                  "Monetization tied to real value without ads or manipulation.",
                points: [
                  "No ads or dark patterns",
                  "Creator-first revenue",
                  "User-respecting design",
                ],
              },
            ].map((feature, i) => (
                <div
                key={i}
                className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:border-orange-500 border border-transparent transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6 items-center">

                  {/* TEXT */}
                  <div className={i % 2 === 0 ? "order-1" : "order-2"}>
                    <h4 className="text-2xl font-semibold mb-3 text-orange-400">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 mb-4">
                      {feature.description}
                    </p>

                    <ul className="space-y-2 text-sm text-gray-300">
                      {feature.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-orange-400">✔</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* IMAGE */}
                  <div
                    className={`rounded-xl overflow-hidden border border-orange-500/40 shadow-md shadow-orange-500/10 ${
                      i % 2 === 0 ? "order-2" : "order-1"
                    }`}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-56 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* IMPACT */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-white">
            Empowering Rural & Student Communities
          </h3>
          <p className="text-gray-300 text-lg">
            Skilled individuals can build trusted communities, share knowledge,
            and earn sustainably — without algorithms, ads, or content pressure.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-orange-500/10">
        <div className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/5 border border-orange-500/30 rounded-3xl p-12">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Ready to be part of the community?
          </h3>
          <p className="text-gray-300 mb-8">
            Join today and start learning, teaching, and growing together.
          </p>

          <SignUpButton mode="modal">
            <button className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-lg text-white transition-colors">
              Join Now
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-400">
        © 2026 SkillCommunity • Built for GDG Hackathon
      </footer>
    </div>
  );
}