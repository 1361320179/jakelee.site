import { SiteFooter } from "@/modules/site/components/site-footer";
import { SiteHeader } from "@/modules/site/components/site-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-4 pt-6 sm:pt-8">{children}</main>
      <SiteFooter />
    </div>
  );
}
