import { fetchProjects } from '@/lib/api';
import ProjectCard from './ProjectCard';

interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  deployedAt?: string;
}

export default async function Projects() {
  let projects: ProjectItem[] = [];
  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error('Failed to load projects:', error);
  }

  const totalProjects = projects.length;
  const sectionNumber = '03';

  return (
    <section id="projects" className="px-4 max-w-5xl mx-auto">
      {/* Section Header with Glass styling */}
      <div className="flex items-center gap-6 mb-12">
        <span className="text-5xl md:text-6xl font-mono font-bold text-[#CBD5E1] select-none">
          {sectionNumber}
        </span>
        <span className="h-px flex-1 bg-[#E2E8F0]" />
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-[#2563EB] font-semibold tracking-[0.3em] uppercase">
            Selected Systems
          </span>
          {totalProjects > 0 && (
            <span className="px-3 py-1 text-[10px] font-mono font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-full">
              {totalProjects} {totalProjects === 1 ? 'system' : 'systems'}
            </span>
          )}
        </div>
      </div>

      {/* Projects List - Wrapped in Premium Glass */}
      <div className="glass-premium rounded-2xl p-6 md:p-8 shadow-xl shadow-[#2563EB]/5 border border-white/80">
        {projects.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-4xl block mb-3">⚙️</span>
            <p className="text-[#94A3B8] font-mono text-sm">No systems deployed yet.</p>
            <p className="text-[#CBD5E1] text-xs font-mono mt-1">Check back soon for updates.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {projects.map((project: ProjectItem, idx: number) => (
              <ProjectCard key={project._id} project={project} index={idx} />
            ))}
          </div>
        )}
      </div>

      {/* Footer Meta */}
      <div className="flex items-center justify-between mt-6 px-2">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-[#94A3B8]">
            {totalProjects > 0 ? `● ${totalProjects} systems online` : '● No systems deployed'}
          </span>
          <span className="w-px h-3 bg-[#E2E8F0]" />
          <span className="text-[10px] font-mono text-[#94A3B8]">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
        {totalProjects > 0 && (
          <span className="text-[10px] font-mono text-[#CBD5E1]">
            {projects.filter((p: ProjectItem) => p.liveUrl).length} live previews available
          </span>
        )}
      </div>
    </section>
  );
}