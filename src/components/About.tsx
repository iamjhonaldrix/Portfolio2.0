export default function About() {
  const competencies = [
    "Capture The Flag (CTF) challenges & binary exploitation",
    "Network reconnaissance, enumeration, & packet analysis (Nmap, Wireshark)",
    "Linux environment administration & shell scripting",
    "Application vulnerability assessment & secure coding practices",
    "Version control & collaborative workflows (Git/GitHub)",
    "Core networking principles & security architecture"
  ];

  return (
    <section id="about" className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main About Card */}
        <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-mono mb-4">
              <span className="text-slate-500">&gt;</span>
              <span>whoami</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 font-mono">
              About Me
            </h2>

            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p>
                I am an IT student and developer specializing in cybersecurity, system defense, and modern web technologies. My work centers on leveraging <span className="text-white font-medium">Python and C</span> to engineer secure applications and analyze software vulnerabilities.
              </p>
              <p>
                With a strong background in CTF competitions and custom scripting, I bridge the gap between software development and security analysis to build resilient systems from the ground up.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-indigo-300 text-sm font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Focus: Network Defense & System Security</span>
          </div>
        </div>

        {/* Technical Focus Section */}
        <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6 font-mono text-indigo-400">
              Technical Focus
            </h2>

            <ul className="space-y-3">
              {competencies.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-800/40 p-3 rounded-xl border border-slate-800 text-slate-300 text-xs sm:text-sm">
                  <span className="text-indigo-400 font-mono font-bold select-none">[0{idx + 1}]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}