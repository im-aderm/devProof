"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ModernTemplate } from "@/components/resume/ModernTemplate"; // Assuming these are created

// Placeholder for other templates
const MinimalTemplate = ({ data }: { data: any }) => <div className="bg-white text-black p-12 w-[816px] mx-auto">Minimal Template</div>;
const ATSTemplate = ({ data }: { data: any }) => <div className="bg-white text-black p-12 w-[816px] mx-auto">ATS Template</div>;

export default function ResumePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState("modern"); // Default template

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchResumeData();
    }
  }, [status, router]);

  const fetchResumeData = async () => {
    try {
      const res = await fetch("/api/user/resume");
      const result = await res.json();
      setResumeData(result.content);
      setTemplate(result.template || "modern");
    } catch (error) {
      console.error("Failed to fetch resume data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await fetch("/api/user/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: resumeData, template }),
      });
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Failed to save resume", error);
      alert("Failed to save resume.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (status === "loading" || loading) {
    return <div className="bg-background min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  // Mock data structure for templates if resumeData is null initially
  const displayData = resumeData || {
    personal: { name: session?.user?.name || "Developer Name", email: session?.user?.email || "developer@example.com", location: "Remote", website: "", github: "github-username", summary: "A placeholder summary..." },
    experience: [{ company: "Previous Company", position: "Software Engineer", duration: "2020 - Present", description: "Placeholder description..." }],
    projects: [{ name: "Project Name", link: "#", description: "Project description.", technologies: ["TypeScript", "Next.js"] }],
    skills: ["JavaScript", "React", "Node.js", "Prisma"],
    education: [{ school: "University Name", degree: "B.S. Computer Science", duration: "2018 - 2022" }]
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardHeader profile={null} name={session?.user?.name || "Developer"} />

      <main className="pt-28 pb-12 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-display-xl font-bold text-on-surface mb-2">Resume Builder</h1>
            <p className="text-on-surface-variant">Craft your professional resume.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              className="px-6 py-3 bg-surface-container-high border border-outline-variant/20 rounded-lg hover:bg-surface-bright transition-colors"
            >
              Save Resume
            </button>
            <button 
              onClick={handlePrint}
              className="px-6 py-3 skill-gradient text-white rounded-lg hover:opacity-90 transition-all"
            >
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            {/* Template Selection and Editor */}
            <div className="glass-card rounded-xl p-8 border-outline-variant/20 space-y-8">
              <h3 className="text-headline-md font-bold">Edit & Select Template</h3>
              
              {/* Template Selection */}
              <div>
                <label className="font-label-bold text-xs uppercase text-on-surface-variant block mb-4">Template Style</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setTemplate("modern")} 
                    className={`px-4 py-2 rounded-lg border transition-colors ${template === "modern" ? "border-primary bg-primary/10" : "border-white/10 hover:bg-white/5"}`}
                  >
                    Modern
                  </button>
                  <button 
                    onClick={() => setTemplate("minimal")} 
                    className={`px-4 py-2 rounded-lg border transition-colors ${template === "minimal" ? "border-primary bg-primary/10" : "border-white/10 hover:bg-white/5"}`}
                  >
                    Minimal
                  </button>
                   <button 
                    onClick={() => setTemplate("ats")} 
                    className={`px-4 py-2 rounded-lg border transition-colors ${template === "ats" ? "border-primary bg-primary/10" : "border-white/10 hover:bg-white/5"}`}
                  >
                    ATS Friendly
                  </button>
                </div>
              </div>

              {/* Editor Section - simplified for now */}
              <div>
                <label className="font-label-bold text-xs uppercase text-on-surface-variant block mb-4">Edit Resume Content</label>
                <textarea
                  className="w-full h-64 bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  value={JSON.stringify(displayData, null, 2)}
                  onChange={(e) => {
                    try {
                      setResumeData(JSON.parse(e.target.value));
                    } catch (err) {
                      console.error("Invalid JSON");
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {/* Preview Section */}
            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <h3 className="text-headline-md font-bold mb-6">Resume Preview</h3>
              <div className="border border-outline-variant/20 rounded-lg overflow-hidden">
                {template === "modern" && <ModernTemplate data={displayData} />}
                {template === "minimal" && <MinimalTemplate data={displayData} />}
                {template === "ats" && <ATSTemplate data={displayData} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
