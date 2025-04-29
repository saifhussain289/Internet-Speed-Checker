"use client";

import Link from "next/link";
import { Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-4 px-4 md:px-8 border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-lg">SpeedTest</span>
        </Link>

        <nav className="space-x-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
