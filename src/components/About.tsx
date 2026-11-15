export default function About() {
  const competencies = [
    "Web security & ethical hacking through Capture The Flag (CTF) challenges",
    "Full-stack web development: secure, scalable applications",
    "Network reconnaissance, enumeration, & packet analysis (Nmap, Wireshark)",
    "Linux & system skills, including shell scripting",
    "Containerization with Docker & deployments on Microsoft Azure",
    "Version control & collaborative workflows (Git/GitHub)"
  ];

  return (
    <section id="about" className="min-h-screen w-full scroll-mt-40 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
                I&apos;m an IT student at <span className="text-white font-medium">PUP Santa Maria Campus</span> passionate about web development and cybersecurity. I&apos;m currently learning to develop secure and scalable web applications while turning ideas into functional systems, and I&apos;m eager to understand systems and networks in depth.
              </p>
              <p>
                Through Capture The Flag (CTF) challenges, I continuously sharpen my skills in ethical hacking, system security, and full-stack development. I&apos;m also learning to containerize apps with <span className="text-white font-medium">Docker</span> and deploy them on <span className="text-white font-medium">Microsoft Azure</span> to build impactful digital solutions.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-indigo-300 text-sm font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Focus: Web Security &amp; Full-Stack Development</span>
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