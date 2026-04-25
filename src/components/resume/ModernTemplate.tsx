export const ModernTemplate = ({ data }: { data: any }) => {
  return (
    <div className="bg-white text-slate-900 p-12 min-h-[1056px] w-[816px] shadow-2xl mx-auto font-sans leading-relaxed">
      <div className="border-b-4 border-indigo-600 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">{data.personal.name}</h1>
          <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm">{data.personal.summary.split('.')[0]}</p>
        </div>
        <div className="text-right text-slate-500 text-xs space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.location}</p>
          <p>{data.personal.website}</p>
          <p>github.com/{data.personal.github}</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Professional Summary</h2>
          <p className="text-slate-700 text-sm leading-relaxed">{data.personal.summary}</p>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Experience</h2>
          {data.experience.map((exp: any, i: number) => (
            <div key={i} className="mb-6 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-900">{exp.company}</h3>
                <span className="text-xs font-bold text-slate-400">{exp.duration}</span>
              </div>
              <p className="text-indigo-600 font-bold text-xs mb-2 uppercase tracking-wide">{exp.position}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Technical Projects</h2>
          <div className="grid grid-cols-2 gap-6">
            {data.projects.map((project: any, i: number) => (
              <div key={i} className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{project.name}</h3>
                <p className="text-slate-600 text-xs mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[9px] font-bold uppercase">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
           <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string) => (
                  <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">{skill}</span>
                ))}
              </div>
           </section>
           <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Education</h2>
              {data.education.map((edu: any, i: number) => (
                <div key={i} className="mb-2">
                  <h3 className="font-bold text-slate-900 text-xs">{edu.school}</h3>
                  <p className="text-slate-600 text-[11px]">{edu.degree} • {edu.duration}</p>
                </div>
              ))}
           </section>
        </div>
      </div>
    </div>
  );
};
