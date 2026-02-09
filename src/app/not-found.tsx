import Link from "next/link";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header variant="solid" />

      <main className="min-h-[70vh] flex items-center justify-center bg-cream">
        <div className="max-w-xl mx-auto px-6 text-center py-24">
          <p className="font-heading text-accent text-sm tracking-widest uppercase mb-4">
            Page Not Found
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-gray-800 mb-6">
            404
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/portfolio" className="btn-outline">
              View Portfolio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
