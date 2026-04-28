import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.split("-")[0].replace(/^\w/, (c) => c.toUpperCase());
  
  return {
    title: `${name}'s Verified Professional Dossier | DevProof`,
    description: `View the verified career identity and technical ledger for ${name}. Powered by DevProof Intelligence Protocol.`,
    openGraph: {
      title: `${name} | Verified Software Engineer`,
      description: `Verified engineering dossier and project ledger on DevProof.`,
      type: "profile",
    },
  };
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
