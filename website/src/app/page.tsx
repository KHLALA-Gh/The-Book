import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Welcome from "@/components/Welcome";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Welcome />
      <Features />
      <Footer />
    </main>
  );
}
