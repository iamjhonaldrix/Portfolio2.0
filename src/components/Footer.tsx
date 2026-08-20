export default function Footer() {
  return (
    <footer className="w-full bg-slate-900/80 backdrop-blur-md border-t border-slate-800 text-slate-400 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-200 font-semibold">B3RL1N</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Jhon Aldrix Bernil</span>
        </div>

        {/* Center: Copyright */}
        <p className="text-slate-500 text-center">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/iamjhonaldrix/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="#about"
            className="hover:text-indigo-400 transition-colors"
          >
            Back to top ↑
          </a>
        </div>

      </div>
    </footer>
  );
}