interface StatBlockProps {
  figure: string;
  label: string;
  className?: string;
  isDark?: boolean;
}

export function StatBlock({
  figure,
  label,
  className = "",
  isDark = false,
}: StatBlockProps) {
  return (
    <div className={`flex flex-col gap-2 pt-4 border-t border-hairline ${className}`}>
      <span
        className={`numeral ${
          isDark ? "text-on-dark" : "text-ink"
        }`}
      >
        {figure}
      </span>
      <span
        className={`meta-label text-[0.6875rem] ${
          isDark ? "text-muted" : "text-muted"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
