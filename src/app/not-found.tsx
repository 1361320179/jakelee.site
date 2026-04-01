import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/modules/site/components/site-footer";
import { SiteHeader } from "@/modules/site/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex min-h-[50vh] max-w-lg flex-1 flex-col items-center justify-center px-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            The link may be broken or the page was removed.
          </p>
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-10")}>
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
