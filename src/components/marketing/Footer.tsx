import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-12 md:flex-row">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
            © 2024 DevProof. Precision Engineering Metrics.
          </p>
        </div>
        <div className="flex items-center gap-8">
          <Link
            href="/about"
            className="text-xs font-normal text-slate-500 transition-colors hover:text-indigo-500 dark:text-slate-400"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-xs font-normal text-slate-500 transition-colors hover:text-indigo-500 dark:text-slate-400"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-xs font-normal text-slate-500 transition-colors hover:text-indigo-500 dark:text-slate-400"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-xs font-normal text-slate-500 transition-colors hover:text-indigo-500 dark:text-slate-400"
          >
            Documentation
          </Link>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-indigo-400">
            terminal
          </span>
          <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-indigo-400">
            code
          </span>
          <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-indigo-400">
            public
          </span>
        </div>
      </div>
    </footer>
  );
}
