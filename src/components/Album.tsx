import { useState } from "react";

interface MediaItem {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
  date?: string;
  tags: string[];
}

export default function Album() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Complete List of Images (img1.JPG to img8.JPG)
  const allMediaArchive: MediaItem[] = [
    {
      id: "1",
      title: "Snapshot 01",
      category: "Personal",
      src: "/image/img1.JPG",
      description: "Personal gallery photo 01.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "2",
      title: "Snapshot 02",
      category: "Personal",
      src: "/image/img2.JPG",
      description: "Personal gallery photo 02.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "3",
      title: "Snapshot 03",
      category: "Personal",
      src: "/image/img3.JPG",
      description: "Personal gallery photo 03.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "4",
      title: "Snapshot 04",
      category: "My Baby",
      src: "/image/img4.JPG",
      description: "Personal gallery photo 04.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "5",
      title: "Snapshot 05",
      category: "cHIMPPPP",
      src: "/image/img5.JPG",
      description: "Personal gallery photo 05.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "6",
      title: "Snapshot 06",
      category: "Personal",
      src: "/image/img6.JPG",
      description: "Personal gallery photo 06.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "7",
      title: "Snapshot 07",
      category: "With my TEAM",
      src: "/image/img7.JPG",
      description: "Personal gallery photo 07.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "8",
      title: "Snapshot 08",
      category: "Personal",
      src: "/image/img8.JPG",
      description: "Personal gallery photo 08.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "9",
      title: "Snapshot 9",
      category: "Personal",
      src: "/image/img9.JPG",
      description: "Personal gallery photo 09.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "10",
      title: "Snapshot 10",
      category: "My Baby",
      src: "/image/img10.JPG",
      description: "Personal gallery photo 10.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    },
    {
      id: "11",
      title: "Snapshot 11",
      category: "CAVOICE",
      src: "/image/img11.JPG",
      description: "Personal gallery photo 11.",
      date: "2026",
      tags: ["Gallery", "Photo"]
    }
];


  // Featured photos shown on main grid (First 3 photos)
  const featuredMedia = allMediaArchive.slice(0, 3);

  const filters = ["All", "Personal"];

  const filteredFeatured =
    activeFilter === "All"
      ? featuredMedia
      : featuredMedia.filter((item) => item.category === activeFilter);

  const filteredArchive =
    activeFilter === "All"
      ? allMediaArchive
      : allMediaArchive.filter((item) => item.category === activeFilter);

  return (
    <section id="album" className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-6xl w-full">
        
        {/* Terminal Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-mono mb-2">
            <span className="text-slate-500">&gt;</span>
            <span>ls -l /var/gallery/media</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
            Personal Media Album
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 font-mono text-xs">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl transition-all border ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                  : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              [{filter}]
            </button>
          ))}
        </div>

        {/* Featured Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredFeatured.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-indigo-600/90 text-white text-xs font-mono px-3 py-1.5 rounded-lg border border-indigo-400/40 backdrop-blur-sm">
                      View Photo 🔍
                    </span>
                  </div>
                </div>

                <div className="p-5 font-mono">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="text-indigo-400 font-semibold">{item.category}</span>
                    {item.date && <span>{item.date}</span>}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 font-mono">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsArchiveOpen(true)}
            className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-indigo-300 hover:text-white border border-slate-700 hover:border-indigo-500/60 px-6 py-3 rounded-xl font-mono text-sm transition-all duration-200 shadow-lg group"
          >
            <span>[+] View Full Album </span>
            <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">&gt;</span>
          </button>
        </div>

      </div>

      {/* Grid Archive Modal */}
      {isArchiveOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2 font-mono text-indigo-400 text-sm">
                <span>&gt;</span>
                <span className="text-white font-bold">Album Grid Gallery</span>
              </div>
              <button
                type="button"
                onClick={() => setIsArchiveOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-lg px-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Album Grid Body */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredArchive.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="relative aspect-square rounded-xl overflow-hidden border border-slate-800 hover:border-indigo-500/60 group cursor-pointer bg-slate-950 transition-all hover:scale-[1.02]"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Hover Overlay with Metadata */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end font-mono">
                      <span className="text-indigo-300 text-[10px] uppercase font-semibold">
                        {item.category}
                      </span>
                      <h4 className="text-white text-xs font-bold truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end font-mono">
              <button
                type="button"
                onClick={() => setIsArchiveOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
              >
                Close Gallery
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-mono">
            
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2 text-indigo-400 text-sm">
                <span>&gt;</span>
                <span className="text-white font-bold truncate">{selectedItem.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-white text-lg px-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden flex items-center justify-center">
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="max-w-full max-h-[60vh] object-contain rounded-xl border border-slate-800 shadow-md"
              />
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-indigo-400">
                <span>Category: {selectedItem.category}</span>
                {selectedItem.date && <span>Date: {selectedItem.date}</span>}
              </div>
              <p className="text-xs text-slate-300">{selectedItem.description}</p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}