import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { getLanguageTag, getLocalizedPath, type SiteLocale } from "@/i18n/config";
import type { PostMeta } from "@/modules/blog/schemas/post";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PostCardProps = {
  locale: SiteLocale;
  post: PostMeta;
};

export function PostCard({ locale, post }: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" aria-hidden />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(getLanguageTag(locale), {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {post.readingMinutes} min
          </span>
          {post.category ? (
            <Badge variant="secondary" className="font-normal">
              {post.category}
            </Badge>
          ) : null}
        </div>
        <CardTitle className="font-heading text-xl leading-snug sm:text-2xl">
          <Link href={getLocalizedPath(locale, `/blog/${post.slug}`)} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        {post.description ? (
          <CardDescription className="text-base leading-relaxed">
            {post.description}
          </CardDescription>
        ) : null}
      </CardHeader>
      {post.tags.length > 0 ? (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`${getLocalizedPath(locale, "/blog")}?tag=${encodeURIComponent(tag)}`}
              >
                <Badge variant="outline" className="font-normal hover:bg-accent">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
