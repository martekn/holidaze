import { IconBook, IconHome, IconSettings } from "@tabler/icons-react";

export const API_BASE_URL = "https://v2.api.noroff.dev";

export const PROFILE_LINKS = [
  { text: "Bookings", href: "/profile/bookings", icon: IconBook },
  { text: "Listings", href: "/profile/hosted-listings", icon: IconHome },
  { text: "Settings", href: "/profile/settings", icon: IconSettings }
];

export const API_AVATAR_PLACEHOLDER =
  "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";
