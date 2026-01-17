"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CameraIcon as Camera,
  CircleStackIcon as Database,
  BookOpenIcon as BookOpen,
  HeartIcon as Heart,
  SunIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const navItems = [
  { href: "/uv-checker", label: "UV Checker", icon: SunIcon },
  { href: "/", label: "Scan", icon: Camera },
  { href: "/database", label: "Database", icon: Database },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/ethos", label: "Ethos", icon: Heart },
];

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Bottom nav rendered via portal to avoid being clipped by parents.
  const bottomNav = (
    <nav
      role="navigation"
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-100 border-t border-border bg-card/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around px-2 py-2.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden bg-card md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            aria-label="Go to home"
            className="flex items-center gap-2 rounded-md outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="text-2xl" aria-hidden>
              🪸
            </div>
            <span className="text-2xl font-bold text-foreground">
              BetterBeach
            </span>
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav via portal */}
      {mounted ? createPortal(bottomNav, document.body) : null}

      {/* Spacer to prevent content being covered by the fixed bottom nav on mobile */}
      <div
        aria-hidden
        className="h-16 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      />
    </>
  );
}
