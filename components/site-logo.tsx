import Link from "next/link";
import { siteName } from "@/lib/site";

export function Logo({ className = "h-16" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center">
      <img src="/logo.svg" alt={siteName} width={2000} height={2000} className={`${className} w-auto`} />
    </Link>
  );
}
