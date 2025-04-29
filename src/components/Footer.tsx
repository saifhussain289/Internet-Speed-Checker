"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-4 md:px-8 border-t mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Internet Speed Checker. All rights reserved.
        </p>

        <div className="flex items-center space-x-4">
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
