export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

/* Where to send the refund / lost-money claim form. */
export const GFORM = "https://forms.gle/your-google-form"; // TODO: paste real Google Form link
