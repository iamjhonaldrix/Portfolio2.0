import { useState } from "react";

interface Certification {
  title: string;
  issuer: string;
  category: string;
  status: string;
  date?: string;
  skills: string[];
  certUrl?: string;
}

export default function Certifications() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Featured certifications
  const featuredCertifications: Certification[] = [
    {
      title: "Certified Cybersecurity Practitioner (CCP)",
      issuer: "Appkademiya",
      category: "IT / Security",
      status: "Verified",
      skills: ["Network Security", "Vulnerability Analysis", "Ethical Hacking", "System Defense"],
      certUrl: "/certification/CPP.png"
    },
    {
      title: "LinuxOps Certification",
      issuer: "Appkademiya",
      category: "IT / Operations",
      status: "Verified",
      skills: ["Linux Administration", "Shell Scripting", "System Navigation", "Security Tools"],
      certUrl: "/certification/LinuxOps.png"
    },
    {
      title: "TICO Certification",
      issuer: "Travel Industry Council of Ontario",
      category: "Professional / Non-IT",
      status: "Verified",
      skills: ["Regulatory Compliance", "Industry Standards", "Professional Ethics"],
      certUrl: "/certification/TICO.png"
    }
  ];

  // Complete credential archive
  const allCredentials: Certification[] = [
    ...featuredCertifications,
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      category: "Module",
      status: "Completed",
      date: "2026",
      skills: ["Cyber Hygiene", "Threat Vectors", "Network Defense"],
      certUrl: "/certification/IntroCyberSec.png"
    },
    {
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy",
      category: "Cybersecurity Challenge",
      status: "Verified",
      date: "2026",
      skills: ["Core Syntax", "Data Structures", "Algorithmic Logic"],
      certUrl: "/certification/PythonEs1.png"
    }
  ];

  // Helper to determine whether url is an image format
  const isImageFile = (url?: string) => {
    if (!url) return false;
    return /\.(png|jpe?g|webp|gif|svg)$/i.test(url);
  };

  return (
    <section id="certifications" className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-6xl w-full">
        
        {/* Terminal Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-mono mb-2">
            <span className="text-slate-500">&gt;</span>
            <span>ls -l /var/credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
            Certifications & Credentials
          </h2>
        </div>

        {/* Featured Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredCertifications.map((cert, index) => (
            <div
              key={index}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <span className="text-indigo-400 font-semibold">{cert.category}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2 font-mono">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  Issuer: <span className="text-slate-300">{cert.issuer}</span>
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-slate-800/80 mb-6">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Open In-Site Document Modal */}
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 py-2.5 px-4 rounded-xl font-mono text-xs transition-colors"
                >
                  <span>View Certificate</span>
                  <span>🔍</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Credentials Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsArchiveOpen(true)}
            className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-indigo-300 hover:text-white border border-slate-700 hover:border-indigo-500/60 px-6 py-3 rounded-xl font-mono text-sm transition-all duration-200 shadow-lg group"
          >
            <span>[+] View All Credentials Archive</span>
            <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">&gt;</span>
          </button>
        </div>

      </div>

      {/* 1. Credential Archive Modal */}
      {isArchiveOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2 font-mono text-indigo-400 text-sm">
                <span>&gt;</span>
                <span className="text-white font-bold">Credential Archive</span>
              </div>
              <button
                type="button"
                onClick={() => setIsArchiveOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-lg px-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {allCredentials.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/40 border border-slate-800 hover:border-indigo-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-indigo-400 font-semibold">{item.category}</span>
                      {item.date && <span className="text-slate-500">· {item.date}</span>}
                    </div>
                    <h4 className="text-white font-bold text-base">{item.title}</h4>
                    <p className="text-xs text-slate-400">Issuer: {item.issuer}</p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {item.skills.map((s, sIdx) => (
                        <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCert(item)}
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3 py-2 rounded-lg text-xs font-mono transition-colors"
                  >
                    <span>View Certificate</span>
                    <span>🔍</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
              <button
                type="button"
                onClick={() => setIsArchiveOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono transition-colors"
              >
                Close Archive
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. Document Preview Modal (Dynamic PDF/Image Viewer) */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden font-mono">
            
            {/* Topbar */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2 text-indigo-400 text-sm">
                <span>&gt;</span>
                <span className="text-white font-bold truncate max-w-md">{selectedCert.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="text-slate-400 hover:text-white text-lg px-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* In-Page Viewer Container */}
            <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden flex items-center justify-center">
              {selectedCert.certUrl && selectedCert.certUrl !== "#" ? (
                isImageFile(selectedCert.certUrl) ? (
                  <img
                    src={selectedCert.certUrl}
                    alt={selectedCert.title}
                    className="max-w-full max-h-full object-contain rounded-xl border border-slate-800 shadow-md"
                  />
                ) : (
                  <iframe
                    src={selectedCert.certUrl}
                    title={selectedCert.title}
                    className="w-full h-full rounded-xl border border-slate-800"
                  />
                )
              ) : (
                <div className="text-center text-slate-500 p-8">
                  <p className="text-sm">Document preview currently unavailable for this credential.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">Issuer: {selectedCert.issuer}</span>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}