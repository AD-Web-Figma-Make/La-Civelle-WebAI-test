/**
 * SecondaryNav — Sticky main navigation bar with logo, dropdown menus, and active-page highlighting.
 *
 * Props:
 *   currentPage  — active page key used to underline the matching nav link
 *   navigateTo   — SPA-style navigation callback (pushState-based)
 *
 * Layout notes:
 *   Uses a wrapper div that takes on a fixed height (h-[64px]) once the nav sticks, preventing
 *   the page content from jumping when the nav transitions from relative to fixed positioning.
 *   TopBar is 40px tall; this nav sticks at top-[40px] to sit directly below it.
 *   Dropdown alignment switches to right-0 for the last two items to avoid viewport overflow.
 */

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import siteLogo from "../../imports/site-logo.png";

export const mainNavLinks = [
  { label: "Le Camping", drop: false, href: "/le-camping" },
  {
    label: "Nos Emplacements", drop: true, href: "#",
    items: ["Cyclo Rando", "Confort", "Camping-car", "Privilège"],
  },
  {
    label: "Nos Locations", drop: true, href: "#",
    items: ["Mobile Home Confort 3ch.", "Cottage Premium 3ch."],
    itemPages: { "Mobile Home Confort 3ch.": "mobile-home-confort" } as Record<string, string>,
  },
  { label: "Activités & Services", drop: false, href: "#" },
  { label: "Restaurant", drop: false, href: "#" },
  { label: "La Piscine", drop: false, href: "#" },
  {
    label: "Infos Pratiques", drop: true, href: "#",
    items: ["Application mobile", "Plan du camping", "Tarifs 2026", "Nos engagements", "FAQ", "Nos Labels"],
  },
  {
    label: "Tourisme", drop: true, href: "#",
    items: ["Capbreton", "Hossegor", "Activités en famille", "Surf & Plages", "Idées pluie", "Excursions Pays Basque", "Gastronomie & marchés", "CIRKWI", "Agenda de l'été"],
  },
];

interface SecondaryNavProps {
  currentPage: string;
  navigateTo: (page: any) => void;
}

export default function SecondaryNav({
  currentPage,
  navigateTo,
}: SecondaryNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navWrapperRef.current) {
        const rect = navWrapperRef.current.getBoundingClientRect();
        setIsScrolled(rect.top <= 40);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={navWrapperRef} className={isScrolled ? "h-[64px]" : "relative"}>
      <nav 
        className={`w-full z-[40] hidden md:block ${
          isScrolled 
            ? "fixed top-[40px] bg-background shadow-lg border-b border-border" 
            : "relative bg-background border-b border-border"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-[64px] justify-between">
            
            {/* Logo — always visible */}
            <div className="flex items-center mr-8">
              <button
                onClick={() => navigateTo("home")}
                className="shrink-0 flex items-center"
                aria-label="Accueil"
              >
                <img 
                  src={siteLogo} 
                  alt="Camping La Civelle" 
                  className="h-8 w-auto invert" 
                />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex items-center gap-1 xl:gap-7 h-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mainNavLinks.map((item, idx) => {
                const isActive =
                  (currentPage === "le-camping" && item.href === "/le-camping") ||
                  (currentPage === "home" && item.label === "Accueil") ||
                  (currentPage === "mobile-home-confort" && item.label === "Nos Locations");
                const isOpen = openDropdown === item.label;
                const dropAlign = idx >= 6 ? "right-0" : "left-0";

                return (
                  <div
                    key={item.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => item.drop ? setOpenDropdown(item.label) : setOpenDropdown(null)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={() =>
                        item.href !== "#"
                          ? navigateTo(item.href.replace("/", "") as any)
                          : undefined
                      }
                      className={`text-[11px] font-bold tracking-[1.16px] uppercase whitespace-nowrap flex items-center gap-1.5 cursor-pointer bg-transparent border-0 h-full px-2 relative group ${
                        isActive ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.drop && (
                        <ChevronDown className="w-3 h-3" />
                      )}
                      
                      {/* Underline for active/hover */}
                      <div className={`absolute bottom-0 left-2 right-2 h-0.5 ${
                        isActive 
                          ? "bg-secondary" 
                          : "bg-transparent group-hover:bg-secondary/50"
                      }`} />
                    </button>

                    {/* Submenu */}
                    {item.drop && isOpen && (
                      <div className={`absolute top-full ${dropAlign} pt-2 z-[50] pointer-events-auto min-w-[220px]`}>
                        <div className="bg-background rounded-[16px] shadow-2xl border border-border overflow-hidden py-3">
                          <div className={`${item.items && item.items.length > 6 ? "grid grid-cols-2 w-[440px]" : "flex flex-col"}`}>
                            {item.items?.map((sub) => (
                              <a
                                key={sub}
                                href="#"
                                onClick={(e) => {
                                  const page = item.itemPages?.[sub];
                                  if (page) { e.preventDefault(); navigateTo(page as any); }
                                }}
                                className="px-5 py-3 text-[12px] font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 block border-l-2 border-transparent hover:border-secondary"
                              >
                                {sub}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reservation Button (Visible when scrolled) */}
            <div className={`overflow-hidden ${isScrolled ? "max-w-[200px] opacity-100 ml-8" : "max-w-0 opacity-0 mr-0"}`}>
               
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
