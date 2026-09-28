'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import { 
  Plus, Edit, Trash2, X, Loader2, RefreshCw, 
  MessageSquare, Eye, Users
} from 'lucide-react';

// Types
interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  image?: string;
}

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface Stats {
  projects: number;
  skills: number;
  visitors: number;
  messages: number;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  body: string;
  createdAt: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatSession {
  _id: string;
  sessionId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface FormDataState {
  title?: string;
  description?: string;
  techStack?: string;
  liveUrl?: string;
  repoUrl?: string;
  name?: string;
  category?: string;
  proficiency?: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [token] = useState<string | null>(() => 
    typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
  );
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [stats, setStats] = useState<Stats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'messages' | 'chats'>('projects');

  // Chat modal state
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | Skill | null>(null);
  const [modalType, setModalType] = useState<'project' | 'skill'>('project');
  const [modalLoading, setModalLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    repoUrl: '',
    name: '',
    category: '',
    proficiency: 0,
  });

  const fetchAllData = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const [statsRes, projectsRes, skillsRes, messagesRes, chatsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/stats`, {
          headers: { Authorization: `Bearer ${t}` },
        }),
        fetch(`${API_BASE}/admin/projects`, {
          headers: { Authorization: `Bearer ${t}` },
        }),
        fetch(`${API_BASE}/admin/skills`, {
          headers: { Authorization: `Bearer ${t}` },
        }),
        fetch(`${API_BASE}/admin/messages`, {
          headers: { Authorization: `Bearer ${t}` },
        }),
        fetch(`${API_BASE}/chat/sessions`, {
          headers: { Authorization: `Bearer ${t}` },
        }),
      ]);

      if (statsRes.status === 401 || projectsRes.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      const statsData = await statsRes.json();
      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();
      const messagesData = await messagesRes.json();
      const chatsData = await chatsRes.json();

      setStats(statsData);
      setProjects(projectsData);
      setSkills(skillsData);
      setMessages(messagesData);
      setChatSessions(chatsData);
    } catch {
      // ignore network errors
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Auth check and initial data load
  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (!t) {
      router.push('/admin/login');
      return;
    }

    let isMounted = true;
    (async () => {
      try {
        const [statsRes, projectsRes, skillsRes, messagesRes, chatsRes] = await Promise.all([
          fetch(`${API_BASE}/admin/stats`, { headers: { Authorization: `Bearer ${t}` } }),
          fetch(`${API_BASE}/admin/projects`, { headers: { Authorization: `Bearer ${t}` } }),
          fetch(`${API_BASE}/admin/skills`, { headers: { Authorization: `Bearer ${t}` } }),
          fetch(`${API_BASE}/admin/messages`, { headers: { Authorization: `Bearer ${t}` } }),
          fetch(`${API_BASE}/chat/sessions`, { headers: { Authorization: `Bearer ${t}` } }),
        ]);

        if (statsRes.status === 401 || projectsRes.status === 401) {
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
          return;
        }

        const statsData = await statsRes.json();
        const projectsData = await projectsRes.json();
        const skillsData = await skillsRes.json();
        const messagesData = await messagesRes.json();
        const chatsData = await chatsRes.json();

        if (isMounted) {
          setStats(statsData);
          setProjects(projectsData);
          setSkills(skillsData);
          setMessages(messagesData);
          setChatSessions(chatsData);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  // --- CRUD Operations ---
  const handleDelete = async (id: string, type: 'project' | 'skill' | 'message') => {
    if (!confirm(`Delete this ${type}?`)) return;
    try {
      const endpoint = type === 'project' ? `projects/${id}` : type === 'skill' ? `skills/${id}` : `messages/${id}`;
      const res = await fetch(`${API_BASE}/admin/${endpoint}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        if (type === 'project') fetchProjects();
        else if (type === 'skill') fetchSkills();
        else fetchMessages();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const fetchProjects = async () => {
    const res = await fetch(`${API_BASE}/admin/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
  };

  const fetchSkills = async () => {
    const res = await fetch(`${API_BASE}/admin/skills`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setSkills(data);
    }
  };

  const fetchMessages = async () => {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  // Open modal for add/edit
  const openModal = (type: 'project' | 'skill', item?: Project | Skill) => {
    setModalType(type);
    setEditingItem(item || null);
    if (item) {
      if (type === 'project') {
        const p = item as Project;
        setFormData({
          title: p.title || '',
          description: p.description || '',
          techStack: p.techStack ? p.techStack.join(', ') : '',
          liveUrl: p.liveUrl || '',
          repoUrl: p.repoUrl || '',
        });
      } else {
        const s = item as Skill;
        setFormData({
          name: s.name || '',
          category: s.category || '',
          proficiency: s.proficiency || 0,
        });
      }
    } else {
      setFormData(type === 'project' 
        ? { title: '', description: '', techStack: '', liveUrl: '', repoUrl: '' }
        : { name: '', category: '', proficiency: 0 }
      );
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setModalLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      let endpoint = '';
      let method = 'POST';
      let body = {};

      if (modalType === 'project') {
        endpoint = 'projects';
        const payload = {
          title: formData.title || '',
          description: formData.description || '',
          techStack: (formData.techStack || '').split(',').map((t: string) => t.trim()).filter(Boolean),
          liveUrl: formData.liveUrl || '',
          repoUrl: formData.repoUrl || '',
        };
        body = payload;
        if (editingItem) {
          endpoint += `/${(editingItem as Project)._id}`;
          method = 'PUT';
        }
      } else {
        endpoint = 'skills';
        const payload = {
          name: formData.name,
          category: formData.category,
          proficiency: Number(formData.proficiency),
        };
        body = payload;
        if (editingItem) {
          endpoint += `/${(editingItem as Skill)._id}`;
          method = 'PUT';
        }
      }

      const res = await fetch(`${API_BASE}/admin/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        closeModal();
        if (modalType === 'project') fetchProjects();
        else fetchSkills();
        // Update stats
        const statsRes = await fetch(`${API_BASE}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } else {
        const err = await res.json();
        alert('Error: ' + (err.error || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Network error');
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-[#2563EB]" />
          <span className="text-sm text-[#475569] font-mono">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2">
              <span>⚙️</span> Admin Dashboard
            </h1>
            <p className="text-sm text-[#475569]">Manage your portfolio content in real-time</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAllData(token!)}
              className="p-2 rounded-lg hover:bg-[#E2E8F0] transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4 text-[#475569]" />
            </button>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-[#475569] hover:text-[#2563EB] transition"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#EF4444] text-white text-sm font-medium rounded-lg hover:bg-[#DC2626] transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="text-2xl font-bold text-[#0B1120]">{stats?.projects || 0}</div>
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">Projects</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="text-2xl font-bold text-[#0B1120]">{stats?.skills || 0}</div>
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">Skills</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="text-2xl font-bold text-[#0B1120]">{stats?.visitors || 0}</div>
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">Visitors</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="text-2xl font-bold text-[#0B1120]">{stats?.messages || 0}</div>
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">Messages</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E2E8F0] pb-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'projects'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'skills'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'messages'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            Messages ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('chats')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'chats'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            Chats ({chatSessions.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#0B1120]">Projects</h2>
              <button
                onClick={() => openModal('project')}
                className="px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              {projects.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#94A3B8]">No projects found. Add one!</div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-[#475569]">Title</th>
                      <th className="px-4 py-3 text-left font-medium text-[#475569] hidden md:table-cell">Tech Stack</th>
                      <th className="px-4 py-3 text-left font-medium text-[#475569]">Status</th>
                      <th className="px-4 py-3 text-right font-medium text-[#475569]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project._id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                        <td className="px-4 py-3 font-medium text-[#0B1120]">{project.title}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.slice(0, 3).map((t, i) => (
                              <span key={i} className="px-2 py-0.5 text-[10px] bg-[#EFF6FF] text-[#2563EB] rounded-full">
                                {t}
                              </span>
                            ))}
                            {project.techStack.length > 3 && (
                              <span className="text-[10px] text-[#94A3B8]">+{project.techStack.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-[#22C55E]">
                            <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                            Online
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openModal('project', project)}
                              className="p-1.5 rounded hover:bg-[#E2E8F0] transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-[#475569]" />
                            </button>
                            <button
                              onClick={() => handleDelete(project._id, 'project')}
                              className="p-1.5 rounded hover:bg-[#FEE2E2] transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-[#EF4444]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#0B1120]">Skills</h2>
              <button
                onClick={() => openModal('skill')}
                className="px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              {skills.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#94A3B8]">No skills found. Add one!</div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-[#475569]">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-[#475569]">Category</th>
                      <th className="px-4 py-3 text-left font-medium text-[#475569]">Proficiency</th>
                      <th className="px-4 py-3 text-right font-medium text-[#475569]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill) => (
                      <tr key={skill._id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                        <td className="px-4 py-3 font-medium text-[#0B1120]">{skill.name}</td>
                        <td className="px-4 py-3 text-[#475569]">{skill.category}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#2563EB] rounded-full"
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-[#475569]">{skill.proficiency}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openModal('skill', skill)}
                              className="p-1.5 rounded hover:bg-[#E2E8F0] transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-[#475569]" />
                            </button>
                            <button
                              onClick={() => handleDelete(skill._id, 'skill')}
                              className="p-1.5 rounded hover:bg-[#FEE2E2] transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-[#EF4444]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 className="text-lg font-semibold text-[#0B1120] mb-4">Messages</h2>
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#94A3B8]">No messages yet.</div>
              ) : (
                <div className="divide-y divide-[#F1F5F9]">
                  {messages.map((msg) => (
                    <div key={msg._id} className="p-4 hover:bg-[#F8FAFC] transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#0B1120]">{msg.name}</span>
                            <span className="text-sm text-[#94A3B8]">({msg.email})</span>
                            <span className="text-xs text-[#94A3B8] font-mono">
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-[#475569] mt-1 whitespace-pre-wrap">{msg.body}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(msg._id, 'message')}
                          className="p-1.5 rounded hover:bg-[#FEE2E2] transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-[#EF4444]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'chats' && (
          <div>
            <h2 className="text-lg font-semibold text-[#0B1120] mb-4">Conversations</h2>
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              {chatSessions.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#94A3B8]">No chat conversations yet.</div>
              ) : (
                <div className="divide-y divide-[#F1F5F9]">
                  {chatSessions.map((session) => (
                    <div key={session._id} className="p-4 hover:bg-[#F8FAFC] transition flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#94A3B8]" />
                          <span className="font-mono text-sm text-[#0B1120]">{session.sessionId}</span>
                          <span className="text-xs text-[#94A3B8] font-mono">
                            {new Date(session.updatedAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-[#475569] truncate max-w-sm">
                          {session.messages.length > 0 ? session.messages[0].content : 'No messages'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="w-3 h-3 text-[#94A3B8]" />
                          <span className="text-xs text-[#94A3B8] font-mono">
                            {session.messages.length} messages
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedSession(session);
                          setShowChatModal(true);
                        }}
                        className="p-2 rounded-lg hover:bg-[#E2E8F0] transition"
                        title="View conversation"
                      >
                        <Eye className="w-4 h-4 text-[#475569]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0B1120]">
                {editingItem ? `Edit ${modalType === 'project' ? 'Project' : 'Skill'}` : `Add ${modalType === 'project' ? 'Project' : 'Skill'}`}
              </h3>
              <button onClick={closeModal} className="p-1 rounded hover:bg-[#F1F5F9] transition">
                <X className="w-5 h-5 text-[#94A3B8]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType === 'project' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="Project name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="Brief description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Live URL</label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Repository URL</label>
                    <input
                      type="url"
                      value={formData.repoUrl}
                      onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Skill Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="e.g., React"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Category *</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="e.g., Frontend, Backend, DevOps"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Proficiency (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.proficiency}
                      onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="85"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#F1F5F9] rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition disabled:opacity-50 flex items-center gap-2"
                >
                  {modalLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat View Modal */}
      {showChatModal && selectedSession && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#0B1120]">Conversation</h3>
                <p className="text-xs text-[#94A3B8] font-mono mt-1">Session: {selectedSession.sessionId}</p>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 rounded hover:bg-[#F1F5F9] transition"
              >
                <X className="w-5 h-5 text-[#94A3B8]" />
              </button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {selectedSession.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#2563EB] text-white rounded-br-sm'
                        : msg.role === 'system'
                        ? 'bg-[#F1F5F9] text-[#0B1120] rounded-bl-sm italic text-xs'
                        : 'bg-[#EFF6FF] text-[#0B1120] rounded-bl-sm border border-[#BFDBFE]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowChatModal(false)}
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}