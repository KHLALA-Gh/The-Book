import Bar from "@/components/Bar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Bar />
      {children}
    </>
  );
}
