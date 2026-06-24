export default function DocsPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <h2 className="text-3xl font-semibold text-white">Project documentation</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-300">
        The docs folder contains the architecture diagram, database model, API reference, Redis scaling notes, Docker guide, deployment guide, and phased roadmap.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <h3 className="text-lg font-semibold text-white">Recruiter view</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Share the live demo link, screenshots, and temporary credentials so the project output is visible in one pass.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <h3 className="text-lg font-semibold text-white">How to open it</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Start the stack with Docker Compose, or use the deployed frontend URL and backend API URL from the README.
          </p>
        </div>
      </div>
    </section>
  );
}
