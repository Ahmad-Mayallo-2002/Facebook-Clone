import { type IconType } from "react-icons";
import { FaNewspaper, FaUser } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";
import { BiSolidMessageAltDots } from "react-icons/bi";

type Feature = {
  title: string;
  description: string;
  icon: IconType;
  iconColor: string;
  iconBackground: string;
};

export const features: Feature[] = [
  {
    title: "News Feed",
    description:
      "Stay updated with posts, photos, and videos from friends and pages you follow",
    icon: FaNewspaper,
    iconColor: "#2563EB", // blue
    iconBackground: "#DBEAFE", // light blue,
  },
  {
    title: "Friend Connections",
    description:
      "Find and connect with friends, family, and people who share your interests",
    icon: RiUserHeartLine,
    iconColor: "#7C3AED", // purple
    iconBackground: "#EDE9FE", // light purple
  },
  {
    title: "Messaging",
    description:
      "Chat instantly with friends through text, voice, and video messages",
    icon: BiSolidMessageAltDots,
    iconColor: "#16A34A", // green
    iconBackground: "#DCFCE7", // light green
  },
  {
    title: "User Profiles",
    description:
      "Create your unique profile and share your story with the world",
    icon: FaUser,
    iconColor: "#F97316", // orange
    iconBackground: "#FFEDD5", // light orange
  },
];

type Value = {
  title: string;
  value: string;
};

export const values: Value[] = [
  {
    title: "Active Users",
    value: "2.9B+",
  },
  {
    title: "Photos Shared Daily",
    value: "100M+",
  },
  {
    title: "Messages Sent Daily",
    value: "1.5B+",
  },
];

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

export const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "News Feed", href: "/news-feed" },
      { label: "Messenger", href: "/messenger" },
      { label: "Stories", href: "/stories" },
      { label: "Groups", href: "/groups" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Safety Center", href: "/safety" },
      { label: "Community", href: "/community" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
