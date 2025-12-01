import { LucideIcon, Inbox, Bell, Terminal, Home } from "lucide-react";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  current?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    current: true,
  },
  {
    name: "Contact Messages",
    href: "/contact-us",
    icon: Inbox,
    current: false,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    current: false,
  },
  {
    name: "Command Center",
    href: "/command-center",
    icon: Terminal,
    current: false,
  },
];
