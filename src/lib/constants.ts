import {
  IconBook,
  IconHome,
  IconParking,
  IconPaw,
  IconSettings,
  IconSoup,
  IconWifi
} from "@tabler/icons-react";

export const API_BASE_URL = "https://v2.api.noroff.dev";

export const PROFILE_LINKS = [
  { text: "Bookings", href: "/profile/bookings", icon: IconBook },
  { text: "Listings", href: "/profile/hosted-listings", icon: IconHome },
  { text: "Settings", href: "/profile/settings", icon: IconSettings }
];

export const API_AVATAR_PLACEHOLDER =
  "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";

export const LISTING_NAME_PLACEHOLDER = "Untitled stay";

export const API_MAX_IMAGES = 10;

export const FOOTER_QUICK_LINKS = [
  { text: "Explore stays", href: "/explore" },
  { text: "Become a host", href: "/become-a-host" },
  { text: "Create account", href: "/register" },
  { text: "Log in", href: "/login" }
];

export const AMENITIES = {
  parking: {
    icon: IconParking,
    title: "Parking"
  },
  breakfast: {
    icon: IconSoup,
    title: "Breakfast"
  },
  wifi: {
    icon: IconWifi,
    title: "Wi-Fi"
  },
  pets: {
    icon: IconPaw,
    title: "Pet friendly"
  }
};
