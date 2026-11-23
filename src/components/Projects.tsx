import ProjectCard from './ProjectCard';
import { connectDB } from '@/lib/mongodb';
import Project from '../../server/models/project';
import { DEFAULT_PROJECTS } from '@/lib/defaults';

interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  deployedAt?: string;
}

async function getProjectsServerSide(): Promise<ProjectItem[]> {
  try {
    const db = await connectDB();
    if (!db) return DEFAULT_PROJECTS;

    await Project.findOneAndUpdate(
      { liveUrl: 'https://jays-food-court.vercel.app' },
      {
        $setOnInsert: {
          title: "Jay's Food Court",
          description: 'Modern digital restaurant & food ordering platform with interactive menu browsing, seamless cart experience, and fast checkout.',
          techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Vercel'],
          liveUrl: 'https://jays-food-court.vercel.app',
          repoUrl: 'https://github.com/johnsonray1840-jpg',
          deployedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    ).catch(() => {});

    const raw = await Project.find().sort({ createdAt: -1 }).lean();
    if (!raw || raw.length === 0) return DEFAULT_PROJECTS;
    return raw.map((p: Record<string, unknown>) => ({
      _id: String(p._id),
      title: String(p.title || ''),
      description: String(p.description || ''),
      techStack: Array.isArray(p.techStack) ? p.techStack.map(String) : [],
      liveUrl: String(p.liveUrl || ''),
      repoUrl: String(p.repoUrl || ''),
      deployedAt: p.deployedAt ? new Date(String(p.deployedAt)).toISOString() : undefined,
    }));
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export default async function Projects() {
  const projects = await getProjectsServerSide();

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
