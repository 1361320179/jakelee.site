import { SiteFooter } from "@/modules/site/components/site-footer";
import { SiteHeader } from "@/modules/site/components/site-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
