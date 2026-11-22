import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col justify-center items-center px-6 text-center">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <span className="meta-label text-muted tracking-[0.24em]">
          ACT 404 · THE MISSING ROOM
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-ink font-normal">
          This path ends <em className="italic">here.</em>
        </h1>
        <p className="body-editorial text-body text-base">
          The page you are looking for has been moved or does not exist in this edition.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-ink text-on-ink text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            <span>Return to the estate</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
