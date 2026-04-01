import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function createMdxComponents(): MDXComponents {
  return {
    a: ({ href, children, className, ...props }) => {
      if (href?.startsWith("/")) {
        return (
          <Link href={href} className={className} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt, className, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className={`my-6 max-h-[480px] w-full rounded-xl border border-border object-cover ${className ?? ""}`}
        {...props}
      />
    ),
    hr: (props) => <hr className="my-10 border-border" {...props} />,
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-border bg-muted/50 px-3 py-2 text-left font-medium"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-border/80 px-3 py-2 align-top" {...props} />
    ),
  };
}
