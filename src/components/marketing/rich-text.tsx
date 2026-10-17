/**
 * Renders `**bold**` inline emphasis without injecting raw HTML.
 *
 * Used by the long-form marketing bodies (the legal instrument, the partner
 * FAQ) so emphasis can live in plain-text data modules instead of
 * `dangerouslySetInnerHTML`.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("**").map((part, index) => (
        <span key={index}>
          {index % 2 === 1 ? (
            <strong className="font-semibold text-on-surface">{part}</strong>
          ) : (
            part
          )}
        </span>
      ))}
    </span>
  );
}
