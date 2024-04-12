import Link from "next/link";
import type { Metadata } from "next";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, we couldn&apos;t find the requested resource.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFound;

export const metadata: Metadata = {
  title: "Not Found",
  description: "Page not found",
};
