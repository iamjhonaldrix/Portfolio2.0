import { Link } from "react-router-dom";

export default function TechStack() {
  const skills = ["Ethical Hacking", "Networking Fundamentals", "Linux Administration", "CTF Competitions"];
  const tools = ["Kali Linux", "Nmap", "Wireshark", "Burp Suite", "Git & GitHub"];
  const languages = ["Python", "C", "JavaScript", "Bash"];

  return (
    <section id="skills" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Tech Stack & Skills (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                Cybersecurity Stack
              </h2>
              <Link 
                to="/tech-stack" 
                className="inline-flex items-center gap-1 text-sm font-mono text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
              >
                View Details <span className="text-xs">&gt;</span>
              </Link>
            </div>

            <div className="space-y-6">
              {/* Category: Skills */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs sm:text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category: Tools */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Security Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-300 text-xs sm:text-sm font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category: Programming */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-emerald-400 text-xs sm:text-sm font-mono">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Whoami / Terminal Context (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            {/* Terminal Header Bar */}
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-mono mb-6 bg-slate-950/80 p-3 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-bold">b3rl1n@kali</span>
              <span className="text-slate-500">:</span>
              <span className="text-slate-300">~ $</span>
              <span className="text-white">whoami</span>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <div>
                <h4 className="text-lg font-bold text-white">Jhon Aldrix Bernil</h4>
                <p className="text-xs font-mono text-indigo-400">b3rl1n · PUP Philippines</p>
              </div>

              <p className="text-slate-300">
                Cybersecurity practitioner focused on ethical hacking, penetration testing, and defensive architecture.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm">
                Actively solving hands-on labs (TryHackMe & Hack The Box) to analyze how systems break and engineering robust controls to protect them.
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Affiliation:</span>
                <span className="text-indigo-300 font-semibold">A1SBERG Security Community</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}