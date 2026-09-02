/**
 * App — Root shell for the Camping La Civelle single-page site.
 *
 * Exports:
 *   TopBar         — Fixed 40/48px utility bar (desktop links, language, mobile burger)
 *   BottomBookingWidget — Slide-up booking search panel fixed to the bottom of the viewport
 *   VirtualAssistant    — Chat prompt row rendered inside the footer
 *   MobileMenu     — Full-screen drawer nav for mobile (z-100, 300px right panel)
 *   default App    — Root component wiring pages, scroll-top button, and floating chat button
 *
 * Routing: pushState-based SPA. Pages: "home" | "le-camping" | "mobile-home-confort"
 *
 * Layout notes:
 *   TopBar is fixed; a sibling spacer div (h-[48px] md:h-[40px]) prevents content jump.
 *   SecondaryNav sits immediately after the hero on the home page; on inner pages it is rendered
 *   above the page component so it sticks correctly below the TopBar.
 *   BottomBookingWidget and the floating chat/scroll-top buttons use z-[100] to stay above all content.
 */

import { useState, useEffect } from "react";
import LeCampingPage from "./LeCampingPage";
import MobileHomePage from "./MobileHomePage";
import SecondaryNav, { mainNavLinks } from "./components/SecondaryNav";
import {
  ChevronDown,
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowRight,
  ArrowUp,
  TreePine,
  Waves,
  Bike,
  ShoppingBag,
  Flame,
  Leaf,
  RefreshCcw,
  Car,
  Train,
  Plane,
  Utensils,
  Wine,
  Banknote,
  PawPrint,
  X,
  Phone,
  HelpCircle,
  Video,
  User,
} from "lucide-react";

import EauChauffeeIcon from "../imports/EauChauffeeIcon/EauChauffeeIcon";
import EspritFamilialIcon from "../imports/EspritFamilialIcon/EspritFamilialIcon";
import AnimationsEteIcon from "../imports/AnimationsEteIcon/AnimationsEteIcon";

import ButtonOuvrirLeChat from "../imports/ButtonOuvrirLeChat/ButtonOuvrirLeChat";

import heroVideo from "../imports/FILM_20MO_COMPLICES.mp4";

import igPhoto1 from "../imports/CampingLaCivelleAccueil/f81aded7cfb3f6bb1c39b73d318f6e27a8f6704f.png";
import igPhoto2 from "../imports/CampingLaCivelleAccueil/19c036d178623ddf987b1cee715d90b4e9a99418.png";
import igPhoto3 from "../imports/CampingLaCivelleAccueil/195f381497f2b9623695bb59c560f1bef8d03eb0.png";
import igPhoto4 from "../imports/CampingLaCivelleAccueil/002b5128be73607a2ee1e813c19e209a69530c60.png";
import igPhoto5 from "../imports/CampingLaCivelleAccueil/ea3b93b3f41992f5b8d79fc4fd479ca349c044b4.png";
import igPhoto6 from "../imports/CampingLaCivelleAccueil/0c915306f5988b5622d54d44766893ed4a46b82d.png";

import imgEmplacementsImg from "../imports/AccueilImages/e7c2cf6672d47127a07894afd505fe855b2fcf69.png";
import imgLocationsImg from "../imports/AccueilImages/18d4b7475b387b4d1cbbf4d064c592999b2228c1.png";
import imgRestaurantImg from "../imports/AccueilImages/fe7f2da4b71b0d030d544ae57f12bab1211afc66.png";
import imgPiscineImg from "../imports/AccueilImages/aa7559c955e11b7d45004f4a4d265e6a3a1316f6.png";
import imgCapbretonImg from "../imports/AccueilImages/3905d8f65b77c42d61c8f03efa56744d872db131.png";
import imgSurfImg from "../imports/AccueilImages/54966417f791800c03035ed49176be8d447c5a50.png";
import imgPaysBasqueImg from "../imports/AccueilImages/4965a4264036c4060463ad110ac976c7929e2135.png";
import imgGastronomieImg from "../imports/AccueilImages/94c5ba2a851bd7fcb4895cb2b96ab3af8333ef94.png";

import partner01 from "../imports/partner_01.png";
import partner02 from "../imports/partner_02.png";
import partner03 from "../imports/partner_03.png";
import partner04 from "../imports/partner_04.png";
import partner05 from "../imports/partner_05.png";
import partner06 from "../imports/partner_06.png";
import siteLogo from "../imports/site-logo.png";

const igPhotos = [igPhoto1, igPhoto2, igPhoto3, igPhoto4, igPhoto5, igPhoto6];

const topBarSvgPaths = {
  p10101980: "M8.75 1.75H11.0833C11.3928 1.75 11.6895 1.87292 11.9083 2.09171C12.1271 2.3105 12.25 2.60725 12.25 2.91667V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H8.75",
  p16485200: "M9.33333 7.58333L12.3801 9.6145C12.424 9.64373 12.475 9.66049 12.5277 9.66302C12.5804 9.66554 12.6328 9.65372 12.6793 9.62881C12.7258 9.60391 12.7647 9.56686 12.7918 9.52161C12.819 9.47635 12.8333 9.42459 12.8333 9.37183V4.59083C12.8333 4.53951 12.8198 4.4891 12.7941 4.44468C12.7684 4.40026 12.7315 4.3634 12.687 4.33784C12.6425 4.31228 12.592 4.03605 12.5407 4.29908C12.4894 4.29926 12.439 4.31297 12.3947 4.33883L9.33333 6.125",
  p1b614b80: "M5.83333 9.91667L8.75 7L5.83333 4.08333",
  p21d23a70: "M7 1.16667C5.50214 2.73942 4.66667 4.8281 4.66667 7C4.66667 9.1719 5.50214 11.2606 7 12.8333C8.49786 11.2606 9.33333 9.1719 9.33333 7C9.33333 4.8281 8.49786 2.73942 7 1.16667Z",
  p24950300: "M5.3025 5.25C5.43964 4.86014 5.71034 4.5314 6.06664 4.32199C6.42294 4.11259 6.84186 4.03605 7.24919 4.10592C7.65652 4.17578 8.02598 4.38756 8.29213 4.70372C8.55828 5.01989 8.70395 5.42005 8.70333 5.83333C8.70333 7 6.95333 7.58333 6.95333 7.58333",
  p2a640080: "M12.8333 4.08333L7.60083 7.40833C7.42074 7.52117 7.21252 7.58101 7 7.58101C6.78748 7.58101 6.57926 7.52117 6.39917 7.40833L1.16667 4.08333",
  p2e981000: "M8.16667 3.5H2.33333C1.689 3.5 1.16667 4.02233 1.16667 4.66667V9.33333C1.16667 9.97767 1.689 10.5 2.33333 10.5H8.16667C8.811 10.5 9.33333 9.97767 9.33333 9.33333V4.66667C9.33333 4.02233 8.811 3.5 8.16667 3.5Z",
  p5c184f0: "M11.6667 2.33333H2.33333C1.689 2.33333 1.16667 2.85567 1.16667 3.5V10.5C1.16667 11.1443 1.689 11.6667 2.33333 11.6667H11.6667C12.311 11.6667 12.8333 11.1443 12.8333 10.5V3.5C12.8333 2.85567 12.311 2.33333 11.6667 2.33333Z",
  pc012c00: "M7 12.8333C10.2217 12.8333 12.8333 10.2217 12.8333 7C12.8333 3.77834 10.2217 1.16667 7 1.16667C3.77834 1.16667 1.16667 3.77834 1.16667 7C1.16667 10.2217 3.77834 12.8333 7 12.8333Z",
};

function TopBar({ onMenuToggle, isMenuOpen }: { onMenuToggle: () => void; isMenuOpen: boolean }) {
  return (
    <div className="bg-background border-b border-border h-[48px] md:h-[40px] flex items-center fixed top-0 left-0 right-0 z-[60]">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Side: Links (Desktop only) */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d={topBarSvgPaths.pc012c00} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d={topBarSvgPaths.p24950300} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d="M7 9.91667H7.00583" className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
            <span className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase">Aide</span>
          </a>
          <a href="#" className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d={topBarSvgPaths.p5c184f0} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d={topBarSvgPaths.p2a640080} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
            <span className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase">Contact</span>
          </a>
          <a href="#" className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d={topBarSvgPaths.p16485200} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d={topBarSvgPaths.p2e981000} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
            <span className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase">Webcams</span>
          </a>
          <a href="#" className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d={topBarSvgPaths.p10101980} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d={topBarSvgPaths.p1b614b80} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d="M8.75 7H1.75" className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
            <span className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase">Se connecter</span>
          </a>
        </div>

        {/* Mobile: Small Logo */}
        <div className="md:hidden">
          <img src={siteLogo} alt="Logo" className="h-7 w-auto invert" />
        </div>

        {/* Right Side: Language, Reservation & Burger */}
        <div className="flex items-center h-full gap-2 md:gap-0">
          <div className="flex items-center gap-1.5 px-3 md:px-4 h-full cursor-pointer">
             <span className="text-[13px] md:text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
               <span>FR</span>
             </span>
             <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
               <path d="M3 4.5L6 7.5L9 4.5" className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>
          <div className="w-px h-4 bg-border hidden md:block" />
          <div className="pl-3 md:pl-4 py-1.5 hidden md:block">
            <button className="bg-secondary text-primary-foreground text-[10px] md:text-[11px] font-bold uppercase tracking-[1.2px] h-[32px] md:h-[28px] px-4 md:px-6 rounded flex items-center justify-center">
              Réserver
            </button>
          </div>
          
          {/* Burger Button */}
          <button 
            onClick={onMenuToggle}
            className="md:hidden p-2 -mr-2 text-primary"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={2.5} />
            ) : (
              <svg className="w-[18px] h-[16px]" viewBox="0 0 17.5 15.5" fill="none">
                <path d="M0.75 0.75H12.75M0.75 7.75H16.75M0.75 14.75H8.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const footerSvgPaths = {
  p11232f00: "M16.325 5.57533C15.4943 5.39265 14.7428 4.95152 14.1784 4.31524C13.614 3.67895 13.2656 2.88022 13.1833 2.03366V1.66699H10.3083V13.0587C10.3089 13.5641 10.1504 14.057 9.85537 14.4674C9.56029 14.8778 9.14356 15.1849 8.66422 15.3453C8.18487 15.5057 7.66721 15.5112 7.18456 15.3611C6.70191 15.2109 6.27874 14.9127 5.975 14.5087C5.70287 14.151 5.53624 13.7244 5.49394 13.277C5.45164 12.8296 5.53537 12.3793 5.73565 11.977C5.93593 11.5747 6.24477 11.2365 6.62726 11.0005C7.00974 10.7646 7.45061 10.6404 7.9 10.642C8.14853 10.6406 8.39583 10.6771 8.63333 10.7503V7.83366C8.35695 7.79943 8.07842 7.7855 7.8 7.79199C6.77442 7.8194 5.7791 8.14527 4.9359 8.72972C4.09271 9.31416 3.43824 10.1318 3.05265 11.0825C2.66705 12.0332 2.56706 13.0758 2.76493 14.0825C2.96279 15.0891 3.44992 16.0163 4.16667 16.7503C4.90124 17.4972 5.84124 18.0088 6.86724 18.2202C7.89324 18.4315 8.95893 18.3331 9.92888 17.9375C10.8988 17.5418 11.7293 16.8667 12.3147 15.998C12.9001 15.1293 13.2141 14.1062 13.2167 13.0587V7.22533C14.3762 8.05362 15.7667 8.4967 17.1917 8.49199V5.65866C16.9118 5.65981 16.6325 5.63189 16.3583 5.57533H16.325Z",
  p163cc8f0: "M6.99996 1.16699C5.5021 2.73975 4.66663 4.82842 4.66663 7.00033C4.66663 9.17223 5.5021 11.2609 6.99996 12.8337C8.49782 11.2609 9.33329 9.17223 9.33329 7.00033C9.33329 4.82842 8.49782 2.73975 6.99996 1.16699Z",
  p1dd9ba00: "M3.33335 5.00033C4.25383 5.00033 5.00002 4.25413 5.00002 3.33366C5.00002 2.41318 4.25383 1.66699 3.33335 1.66699C2.41288 1.66699 1.66669 2.41318 1.66669 3.33366C1.66669 4.25413 2.41288 5.00033 3.33335 5.00033Z",
  p212a8900: "M8.33333 12.5L12.5 10L8.33333 7.5V12.5Z",
  p22d5dd80: "M11.6666 2.91699H2.33329C1.68896 2.91699 1.16663 3.43933 1.16663 4.08366V9.91699C1.16663 10.5613 1.68896 11.0837 2.33329 11.0837H11.6666C12.311 11.0837 12.8333 10.5613 12.8333 9.91699V4.08366C12.8333 3.43933 12.311 2.91699 11.6666 2.91699Z",
  p2417b900: "M13.3333 6.66699C14.6594 6.66699 15.9312 7.19378 16.8688 8.13146C17.8065 9.06914 18.3333 10.3409 18.3333 11.667V17.5003H15V11.667C15 11.225 14.8244 10.801 14.5118 10.4885C14.1993 10.1759 13.7753 10.0003 13.3333 10.0003C12.8913 10.0003 12.4674 10.1759 12.1548 10.4885C11.8422 10.801 11.6666 11.225 11.6666 11.667V17.5003H8.33331V11.667C8.33331 10.3409 8.8601 9.06914 9.79778 8.13146C10.7355 7.19378 12.0072 6.66699 13.3333 6.66699Z",
  p27787900: "M14.6667 11.2797V13.2797C14.6674 13.4654 14.6294 13.6492 14.555 13.8193C14.4806 13.9894 14.3715 14.1421 14.2347 14.2676C14.0979 14.3932 13.9364 14.4887 13.7605 14.5482C13.5846 14.6077 13.3983 14.6298 13.2133 14.6131C11.1619 14.3902 9.19134 13.6892 7.46001 12.5664C5.84923 11.5428 4.48356 10.1772 3.46001 8.56641C2.33333 6.82721 1.63217 4.84707 1.41334 2.78641C1.39668 2.60205 1.41859 2.41625 1.47767 2.24082C1.53676 2.0654 1.63172 1.9042 1.75652 1.76749C1.88131 1.63077 2.03321 1.52155 2.20253 1.44675C2.37186 1.37196 2.5549 1.33325 2.74001 1.33307H4.74001C5.06354 1.32989 5.3772 1.44446 5.62251 1.65543C5.86783 1.8664 6.02806 2.15937 6.07334 2.47974C6.15775 3.11978 6.31431 3.74822 6.54001 4.35307C6.6297 4.59169 6.64911 4.85102 6.59594 5.10033C6.54277 5.34964 6.41925 5.57848 6.24001 5.75974L5.39334 6.60641C6.34238 8.27544 7.72431 9.65737 9.39334 10.6064L10.24 9.75974C10.4213 9.5805 10.6501 9.45697 10.8994 9.4038C11.1487 9.35063 11.4081 9.37004 11.6467 9.45974C12.2515 9.68544 12.88 9.84199 13.52 9.92641C13.8439 9.97209 14.1396 10.1352 14.351 10.3847C14.5624 10.6343 14.6748 10.9528 14.6667 11.2797Z",
  p27897b80: "M13.3333 6.66634C13.3333 9.99501 9.64066 13.4617 8.40066 14.5323C8.28514 14.6192 8.14452 14.6662 7.99999 14.6662C7.85546 14.6662 7.71484 14.6192 7.59932 14.5323C6.35932 13.4617 2.66666 9.99501 2.66666 6.66634C2.66666 5.25185 3.22856 3.8953 4.22875 2.89511C5.22895 1.89491 6.5855 1.33301 7.99999 1.33301C9.41448 1.33301 10.771 1.89491 11.7712 2.89511C12.7714 3.8953 13.3333 5.25185 13.3333 6.66634Z",
  p278bf580: "M7 8.16699C8.933 8.16699 10.5 6.59999 10.5 4.66699C10.5 2.734 8.933 1.16699 7 1.16699C5.067 1.16699 3.5 2.734 3.5 4.66699C3.5 6.59999 5.067 8.16699 7 8.16699Z",
  p28f18400: "M15 1.66699H12.5C11.3949 1.66699 10.3351 2.10598 9.5537 2.88738C8.7723 3.66878 8.33331 4.72859 8.33331 5.83366V8.33366H5.83331V11.667H8.33331V18.3337H11.6666V11.667H14.1666L15 8.33366H11.6666V5.83366C11.6666 5.61265 11.7544 5.40068 11.9107 5.2444C12.067 5.08812 12.279 5.00033 12.5 5.00033H15V1.66699Z",
  p2f67c3e0: "M9.02823 7.51953L9.91198 12.493C9.92188 12.5516 9.91366 12.6118 9.88842 12.6656C9.86319 12.7193 9.82214 12.7641 9.77077 12.7939C9.7194 12.8237 9.66015 12.8371 9.60095 12.8324C9.54174 12.8276 9.48541 12.8049 9.43948 12.7672L7.35114 11.1998C7.25033 11.1245 7.12786 11.0838 7.00202 11.0838C6.87618 11.0838 6.75371 11.1245 6.65289 11.1998L4.56106 12.7666C4.51516 12.8042 4.4589 12.8269 4.39977 12.8317C4.34064 12.8365 4.28145 12.8231 4.23011 12.7934C4.17878 12.7636 4.13772 12.719 4.11243 12.6653C4.08714 12.6116 4.07881 12.5515 4.08856 12.493L4.97173 7.51953",
  p3a470400: "M2.08333 14.1667C1.50119 11.4194 1.50119 8.58061 2.08333 5.83333C2.15982 5.55434 2.30762 5.30006 2.51217 5.09551C2.71673 4.89095 2.97101 4.74316 3.25 4.66667C7.71954 3.92622 12.2805 3.92622 16.75 4.66667C17.029 4.74316 17.2833 4.89095 17.4878 5.09551C17.6924 5.30006 17.8402 5.55434 17.9167 5.83333C18.4988 8.58061 18.4988 11.4194 17.9167 14.1667C17.8402 14.4457 17.6924 14.6999 17.4878 14.9045C17.2833 15.1091 17.029 15.2568 16.75 15.3333C12.2805 16.0739 7.71953 16.0739 3.25 15.3333C2.97101 15.2568 2.71673 15.1091 2.51217 14.9045C2.30762 14.6999 2.15982 14.4457 2.08333 14.1667Z",
  p3a5e5a00: "M8 8.66699C9.10457 8.66699 10 7.77156 10 6.66699C10 5.56242 9.10457 4.66699 8 4.66699C6.89543 4.66699 6 5.56242 6 6.66699C6 7.77156 6.89543 8.66699 8 8.66699Z",
  p3a870700: "M6.99996 12.8337C10.2216 12.8337 12.8333 10.222 12.8333 7.00033C12.8333 3.77866 10.2216 1.16699 6.99996 1.16699C3.7783 1.16699 1.16663 3.77866 1.16663 7.00033C1.16663 10.222 3.7783 12.8337 6.99996 12.8337Z",
  p3b65bfe0: "M14.6667 4.66699L8.68668 8.46699C8.48086 8.59594 8.24289 8.66433 8.00001 8.66433C7.75713 8.66433 7.51916 8.59594 7.31334 8.46699L1.33334 4.66699",
  p4e8a00: "M14.1667 1.66699H5.83332C3.53214 1.66699 1.66666 3.53247 1.66666 5.83366V14.167C1.66666 16.4682 3.53214 18.3337 5.83332 18.3337H14.1667C16.4678 18.3337 18.3333 16.4682 18.3333 14.167V5.83366C18.3333 3.53247 16.4678 1.66699 14.1667 1.66699Z",
  pa2d6000: "M13.3333 9.47525C13.4362 10.1688 13.3177 10.8771 12.9948 11.4994C12.6719 12.1218 12.161 12.6264 11.5347 12.9416C10.9084 13.2569 10.1987 13.3666 9.5065 13.2552C8.81428 13.1438 8.17481 12.817 7.67904 12.3212C7.18327 11.8255 6.85645 11.186 6.74507 10.4938C6.63368 9.80154 6.7434 9.09183 7.05862 8.46556C7.37383 7.8393 7.8785 7.32837 8.50083 7.00545C9.12316 6.68254 9.83147 6.56407 10.525 6.66692C11.2324 6.77182 11.8874 7.10147 12.3931 7.60717C12.8988 8.11288 13.2284 8.76782 13.3333 9.47525Z",
  pa97b900: "M13.3333 2.66699H2.66668C1.9303 2.66699 1.33334 3.26395 1.33334 4.00033V12.0003C1.33334 12.7367 1.9303 13.3337 2.66668 13.3337H13.3333C14.0697 13.3337 14.6667 12.7367 14.6667 12.0003V4.00033C14.6667 3.26395 14.0697 2.66699 13.3333 2.66699Z",
};

function BottomBookingWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground h-[44px] px-8 rounded-t-[16px] flex items-center justify-center gap-3 shadow-md pointer-events-auto relative z-20 font-heading text-[14px] font-medium tracking-wide"
      >
        <span>
          {isOpen ? "Fermer la recherche" : "Réserver votre séjour"}
        </span>
        <ChevronDown className="w-5 h-5" strokeWidth={2} />
      </button>

      {/* Form panel — Static toggle without slide-up animation */}
      {isOpen && (
        <div className="w-full max-w-[1140px] bg-background shadow-2xl rounded-t-[16px] pointer-events-auto relative z-10">
          <div className="flex flex-col md:flex-row items-stretch w-full overflow-hidden rounded-t-[16px]">
            {/* Arrivée & Départ */}
            <div className="flex-1 border-r border-border p-4 flex flex-col justify-center">
              <label className="text-[10px] font-normal uppercase tracking-[1.5px] text-secondary mb-1 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-primary stroke-primary fill-secondary/25" strokeWidth={2} />
                Dates du séjour
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-body text-[13px] text-foreground font-medium">26 Mai</span>
                  <div className="w-4 h-[1.5px] bg-secondary/50" />
                  <span className="font-body text-[13px] text-foreground font-medium">02 Juin 2026</span>
                </div>
                <Calendar className="w-4 h-4 text-secondary" strokeWidth={2} />
              </div>
            </div>

            {/* Participants */}
            <div className="flex-1 border-r border-border p-4 flex flex-col justify-center">
              <label className="text-[10px] font-normal uppercase tracking-[1.5px] text-secondary mb-1 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-primary stroke-primary fill-secondary/25" strokeWidth={2} />
                Participants
              </label>
              <div className="flex items-center justify-between cursor-pointer">
                <span className="font-body text-[13px] text-foreground font-medium">
                  2 Adultes, 1 Enfant
                </span>
                <ChevronDown className="w-4 h-4 text-secondary" />
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-secondary px-12 flex items-center justify-center min-h-[80px] md:min-h-0 text-primary-foreground font-heading font-normal text-[16px] tracking-wide gap-3">
              <span>Rechercher</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function VirtualAssistant() {
  return (
    <div className="border-b border-border pb-10 mb-16">
      <div className="flex flex-col xl:flex-row items-center gap-8 justify-between">
        {/* Left part: Text info */}
        <div className="flex flex-col gap-1.5 text-center xl:text-left">
          <p className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary">
            Assistant virtuel
          </p>
          <p className="font-body font-semibold text-[14px] leading-tight text-primary">
            Une question sur votre séjour ?
          </p>
          <p className="font-body text-[12px] text-muted-foreground">
            Réponse immédiate 24h/24
          </p>
        </div>

        {/* Center part: Input-like button */}
        <button className="flex-1 max-w-[420px] w-full bg-background border border-border rounded-[14px] px-[17px] py-[13px] flex items-center gap-3 text-left">
          <svg className="size-4 shrink-0" fill="none" viewBox="0 0 16 16">
            <path
              d="M5.26667 13.3333C6.53905 13.986 8.00272 14.1628 9.39392 13.8319C10.7851 13.5009 12.0124 12.6839 12.8545 11.5281C13.6966 10.3724 14.0983 8.95381 13.9871 7.52811C13.8758 6.10241 13.2591 4.76331 12.2479 3.75213C11.2367 2.74094 9.89759 2.12417 8.47189 2.01294C7.04619 1.90172 5.62765 2.30336 4.47188 3.1455C3.31611 3.98763 2.49913 5.21487 2.16815 6.60608C1.83717 7.99728 2.01396 9.46095 2.66667 10.7333L1.33333 14.6667L5.26667 13.3333Z"
              className="stroke-secondary"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.33333"
            />
          </svg>
          <span className="font-body text-[14px] font-medium text-muted-foreground line-clamp-1">
            Comment puis-je vous aider ? Tapez votre question…
          </span>
        </button>

        {/* Right part: Quick tags */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {[
            { icon: Banknote, label: "Tarifs 2026" },
            { icon: Calendar, label: "Disponibilités" },
            { icon: Car, label: "Comment accéder ?" },
            { icon: PawPrint, label: "Animaux acceptés ?" },
          ].map((item) => (
            <button
              key={item.label}
              className="border border-border rounded-full px-5 py-2.5 flex items-center gap-3 bg-background"
            >
              <item.icon className="w-4 h-4 text-secondary" strokeWidth={2} />
              <span className="font-body font-medium text-[11px] text-muted-foreground whitespace-nowrap uppercase tracking-wider">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="absolute top-0 right-0 bottom-0 w-[300px] bg-background shadow-2xl flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <img src={siteLogo} alt="Logo" className="h-10 w-auto" />
          <button onClick={onClose} className="p-2 -mr-2 text-primary">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Main Links */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-secondary mb-6">Menu principal</p>
            {mainNavLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between text-[14px] font-bold tracking-[0.5px] uppercase text-foreground py-2 border-b border-border"
              >
                {item.label}
                {item.drop && <ChevronDown className="w-4 h-4 text-secondary" />}
              </a>
            ))}
          </div>

          {/* Top Bar Links */}
          <div className="space-y-4 pt-4">
             <p className="text-[10px] font-bold uppercase tracking-[2px] text-secondary mb-6">Informations</p>
             <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex flex-col gap-2 p-3 bg-card rounded-[16px] border border-border">
                   <HelpCircle className="w-5 h-5 text-primary" />
                   <span className="text-[12px] font-medium text-foreground">Aide</span>
                </a>
                <a href="#" className="flex flex-col gap-2 p-3 bg-card rounded-[16px] border border-border">
                   <Phone className="w-5 h-5 text-primary" />
                   <span className="text-[12px] font-medium text-foreground">Contact</span>
                </a>
                <a href="#" className="flex flex-col gap-2 p-3 bg-card rounded-[16px] border border-border">
                   <Video className="w-5 h-5 text-primary" />
                   <span className="text-[12px] font-medium text-foreground">Webcams</span>
                </a>
                <a href="#" className="flex flex-col gap-2 p-3 bg-card rounded-[16px] border border-border">
                   <User className="w-5 h-5 text-primary" />
                   <span className="text-[12px] font-medium text-foreground">Compte</span>
                </a>
             </div>
          </div>

          {/* Language Selector in Menu */}
          <div className="space-y-4 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-secondary mb-2">Langue</p>
            <div className="flex items-center justify-between bg-card p-4 rounded-[16px] border border-border">
              <span className="text-[14px] font-medium text-foreground flex items-center gap-2.5">
                <span className="text-xl">🇫🇷</span>
                <span className="lowercase">français</span>
              </span>
              <ChevronDown className="w-4 h-4 text-secondary" />
            </div>
          </div>
        </div>

        {/* Footer of menu */}
        <div className="p-6 bg-card border-t border-border">
           <button className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-[1.5px] py-4 rounded-[16px] text-[13px]">
              Réserver en direct
           </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "le-camping" | "mobile-home-confort">(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      if (p === "/le-camping") return "le-camping";
      if (p === "/mobile-home-confort") return "mobile-home-confort";
    }
    return "home";
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPopState = () => {
      const p = window.location.pathname;
      if (p === "/le-camping") setCurrentPage("le-camping");
      else if (p === "/mobile-home-confort") setCurrentPage("mobile-home-confort");
      else setCurrentPage("home");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigateTo = (page: "home" | "le-camping" | "mobile-home-confort") => {
    const pathMap: Record<string, string> = {
      "le-camping": "/le-camping",
      "mobile-home-confort": "/mobile-home-confort",
      "home": "/",
    };
    window.history.pushState({}, "", pathMap[page] ?? "/");
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`bg-background min-h-screen font-body ${isMenuOpen ? "overflow-hidden" : ""}`}>

      <TopBar isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="h-[48px] md:h-[40px]" /> {/* Spacer for fixed TopBar */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ========================================
          HOME PAGE
          ======================================== */}
      {currentPage === "home" && <>

      {/* ========================================
          HERO SECTION
          Full-viewport video background with site logo and location supertitle.
          Video muted attribute is enforced via a ref callback for autoplay policy compliance.
          ======================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted={true}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover origin-center"
        >
          <source src={heroVideo} type="video/mp4"/>
        </video>

        <div className="absolute inset-0 bg-black/35" />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" 
          ref={(el) => {
            if (el) {
              const video = el.parentElement?.querySelector("video");
              if (video) {
                video.muted = true;
                video.defaultMuted = true;
                if (video.paused) {
                  video.play().catch(() => {});
                }
              }
            }
          }}
        />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-[920px]">
          <p className="text-secondary text-sm font-bold tracking-[4.6px] uppercase mb-8">
            Capbreton · Landes · Atlantique
          </p>

          <img 
            src={siteLogo} 
            alt="Camping La Civelle" 
            className="w-[240px] sm:w-[360px] md:w-[500px] h-auto mb-8 drop-shadow-2xl object-contain"
          />     
        </div>
      </section>

      {/* ========================================
          SECONDARY NAV (home page placement)
          Positioned here so it renders inline below the hero; becomes sticky on scroll.
          ======================================== */}
      <SecondaryNav currentPage={currentPage} navigateTo={navigateTo} />

      {/* ========================================
          INTRO TEXT SECTION
          Two-column layout: decorative image with "Since 30 ans" badge on the left,
          narrative text and two sub-topics (emplacements / plages) on the right.
          ======================================== */}
      <section className="bg-card py-12 md:py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start">
            
            {/* Left Column: Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden shadow-2xl">
                <img 
                  src={imgEmplacementsImg} 
                  alt="Nature au Camping La Civelle" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Decorative "Since" Badge */}
              <div className="absolute -bottom-6 right-0 md:-bottom-8 md:-right-8 w-24 h-24 md:w-32 md:h-32 bg-secondary rounded-full flex flex-col items-center justify-center text-center p-4 shadow-xl border-4 border-card z-10">
                <span className="font-heading text-primary-foreground text-[10px] uppercase tracking-[2px] font-bold leading-none mb-1">Depuis</span>
                <span className="font-heading text-primary-foreground text-[32px] font-black leading-none">30</span>
                <span className="font-heading text-primary-foreground text-[10px] uppercase tracking-[1px] font-bold leading-none mt-1">Ans</span>
              </div>
              
              <div className="absolute -top-6 left-0 md:-left-6 w-24 h-24 border-t-2 border-l-2 border-border rounded-tl-[16px]" />
            </div>

            {/* Right Column: Narrative Content */}
            <div className="lg:col-span-7 pt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-secondary" />
                <p className="text-secondary text-[12px] font-bold tracking-[3.6px] uppercase whitespace-nowrap">
                  Camping 3 étoiles · Capbreton · Landes
                </p>
              </div>
              
              <h2 className="text-primary mb-10 leading-[1.15] max-w-3xl">
                Bienvenue au Camping La Civelle,
                <span className="block text-secondary mt-2">votre camping à Capbreton au cœur des Landes</span>
              </h2>

              <div className="mb-14">
                <p className="text-muted-foreground text-[22px] leading-relaxed font-medium">
                  Niché au cœur de la forêt landaise, le{" "}
                  <strong className="text-primary">Camping La Civelle</strong> vous accueille à{" "}
                  <strong className="text-primary">Capbreton</strong>, à seulement 800 mètres des plages de
                  l'Atlantique.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mt-6">
                  Ce domaine de 11 hectares de pins maritimes est un sanctuaire où la nature, le calme et la convivialité se conjuguent pour des vacances inoubliables. Que vous soyez en famille, en couple ou entre amis, notre camping landais est le point de départ idéal pour découvrir la Côte d'Argent et le Pays Basque.
                </p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 border-t border-border pt-10 md:pt-16 mt-10 md:mt-16 lg:mt-24">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <TreePine className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                <h3 className="text-secondary text-xl font-bold">
                  Emplacements nature et locations tout confort
                </h3>
              </div>
              <p className="text-muted-foreground text-[15px] leading-relaxed">Du simple emplacement nature pour tente, camping-car ou caravane, jusqu'à nos spacieux mobil-homes et cottages premium équipés, La Civelle propose une gamme complète d'hébergements adaptés à tous les budgets et toutes les envies. Profitez de notre piscine chauffée, de notre restaurant de cuisine régionale et de nos animations estivales pour ne manquer aucun moment de votre séjour dans les Landes.</p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Waves className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-primary">
                  Capbreton : surf, plages et art de vivre landais
                </h3>
              </div>
              <p className="text-muted-foreground text-[15px] leading-relaxed">Depuis votre camping à Capbreton, partez à vélo rejoindre l'océan, explorez le port de pêche authentique, ou tentez le surf sur les vagues mythiques de la Côte d'Argent. Hossegor, Biarritz et le Pays Basque sont à moins d'une heure. Le camping La Civelle Capbreton est ouvert du 1er avril au 30 septembre — réservez dès maintenant pour la saison 2026.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          POURQUOI LA CIVELLE SECTION
          3-column icon grid (forêt / plages / esprit familial) with circular icon frames.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-card relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 lg:mb-20">
            <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
              Notre esprit
            </p>
            <h2 className="text-primary">
              Pourquoi choisir La Civelle ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            {[
              {
                icon: TreePine,
                title: "Au cœur de la forêt landaise",
                body: "11 hectares de nature préservée pour un séjour ressourçant. Pins maritimes, senteurs sylvestres, calme absolu. Notre camping dans les Landes est classé parmi les meilleurs sites naturels de la Côte d'Argent.",
              },
              {
                icon: Waves,
                title: "À 800 m des plages de l'Atlantique",
                body: "Rejoignez les plages de Capbreton à pied ou en vélo en moins de 10 minutes. Surf, baignade et farniente sur le sable fin de la Côte d'Argent à deux pas de votre emplacement ou de votre location.",
              },
              {
                icon: EspritFamilialIcon,
                title: "Esprit familial & convivial",
                body: "Camping à taille humaine tenu par une équipe passionnée depuis plus de 30 ans. Restaurant, piscine chauffée, animations d'été — tout est réuni pour que chaque membre de la famille reparte avec de beaux souvenirs.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                  <div className="absolute inset-0 rounded-full border border-border" />
                  <div className="relative z-10">
                    <item.icon
                      className="w-10 h-10 text-primary"
                      strokeWidth={1.2}
                    />
                  </div>
                </div>
                <h3 className="text-secondary text-2xl mb-4 font-bold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          HÉBERGEMENTS SECTION
          Asymmetric 5/7 image card grid (emplacements / locations).
          Cards are full-bleed image overlays with gradient-to-top and a CTA button.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 lg:mb-20">
            <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
              Hébergements
            </p>
            <h2 className="text-foreground mb-6">
              Nos Hébergements
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl font-medium">
              Du simple emplacement nature aux cottages premium, trouvez l'hébergement qui vous convient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {[
              { title: "Nos Emplacements", subtitle: "Cyclo Rando · Confort · Camping-car · Privilège", img: imgEmplacementsImg, span: "lg:col-span-5", page: "" },
              { title: "Nos Locations", subtitle: "Mobile Home Confort 3 ch · Cottage Premium 3 ch", img: imgLocationsImg, span: "lg:col-span-7", page: "mobile-home-confort" },
            ].map((item) => {
              const handleCardClick = item.page
                ? () => navigateTo(item.page as "home" | "le-camping" | "mobile-home-confort")
                : undefined;
              return (
              <div key={item.title} className={`relative rounded-2xl overflow-hidden h-[360px] md:h-[500px] lg:h-[620px] ${item.span}`}>
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-12">
                  <h3 className="text-primary-foreground text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-xl mb-10 font-medium">{item.subtitle}</p>
                  <button
                    onClick={handleCardClick}
                    className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>Découvrir</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          REVIEWS SECTION
          3-column review cards with star rating, italic quote, and author/date footer.
          Rating summary (4.8 / 5 · 328 avis) centered above the grid.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
              GuestSuite
            </p>
            <h2 className="text-primary mb-6">
              Ce que disent nos campeurs
            </h2>
            <div className="flex items-center justify-center gap-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={32} className="fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-primary text-3xl font-bold">
                4,8 / 5
              </span>
              <span className="text-muted-foreground text-3xl">·</span>
              <span className="text-muted-foreground text-xl font-medium">328 avis vérifiés</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  '"Magnifique camping au calme, proche des plages. L\'accueil est chaleureux et le restaurant excellent !"',
                author: "Sophie M.",
                date: "Août 2025",
                stars: 5,
              },
              {
                quote: '"Parfait pour des vacances en famille. Les enfants ont adoré la forêt et les animations proposées."',
                author: "Marc L.",
                date: "Juillet 2025",
                stars: 5,
              },
              {
                quote:
                  '"Très bel emplacement dans les pins. À quelques minutes de Capbreton et Hossegor. On reviendra !"',
                author: "Julie D.",
                date: "Septembre 2025",
                stars: 4,
              },
            ].map((review) => (
              <div key={review.author} className="bg-card border border-border rounded-2xl p-6 md:p-10 lg:p-12 shadow-sm">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < review.stars ? "fill-secondary text-secondary" : "text-border"}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-xl italic leading-relaxed mt-6 md:mt-10 mb-6 md:mb-10">{review.quote}</p>
                <div className="border-t border-border pt-6 md:pt-10 flex items-center justify-between">
                  <span className="text-secondary text-xl font-bold">
                    {review.author}
                  </span>
                  <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          RESTAURANT SECTION
          7/5 two-column layout: large image on the left, text + hours card + CTAs on the right.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-32 items-center">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden h-[340px] md:h-[520px] lg:h-[680px] shadow-2xl">
              <img src={imgRestaurantImg} alt="Le Restaurant" className="w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5">
              <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
                Sur place
              </p>
              <h2 className="text-foreground mb-8">
                Le Restaurant
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Cuisine régionale préparée avec des produits locaux et de saison. Profitez de la terrasse ombragée pour
                vos déjeuners et dîners en famille ou entre amis.
              </p>
              <div className="bg-card border border-border rounded-2xl p-8 mb-10 shadow-sm">
                <p className="text-lg font-bold text-foreground mb-6 uppercase tracking-wider">
                  Horaires de service
                </p>
                <div className="space-y-6">
                  <div className="text-muted-foreground flex items-center gap-4 text-lg font-medium">
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <div className="absolute inset-0 rounded-full border border-border" />
                      <Utensils className="w-5 h-5 text-primary" strokeWidth={1.2} />
                    </div>
                    Déjeuner — 12h00 · 14h30
                  </div>
                  <div className="text-muted-foreground flex items-center gap-4 text-lg font-medium">
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <div className="absolute inset-0 rounded-full border border-border" />
                      <Wine className="w-5 h-5 text-primary" strokeWidth={1.2} />
                    </div>
                    Dîner — 19h00 · 22h00
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-8 italic font-bold">Ouvert juillet &amp; août · Sur réservation hors saison</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-sm">
                  <span>Voir la carte</span> <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border-2 border-secondary text-secondary font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2">
                  <span>Réserver une table</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PISCINE SECTION
          Reversed 5/7 two-column layout (text + feature cards on left, image on right).
          Column order swaps on mobile using order-1/order-2 classes.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-32 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
                Baignade &amp; Détente
              </p>
              <h2 className="text-primary mb-8">
                La Piscine
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed mb-10">
                Piscine chauffée entourée de transats et d'espaces ombragés. Bassin principal 15 × 8 m, pataugeoire pour
                les petits et cours d'aquagym en juillet-août.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: EauChauffeeIcon, label: "Eau chauffée", detail: "26 °C" },
                  { icon: Waves, label: "Aquagym", detail: "Juil. – Août" },
                ].map((feat) => (
                  <div
                    key={feat.label}
                    className="bg-card border border-border rounded-2xl p-8 flex flex-col items-start"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                      <div className="absolute inset-0 rounded-full border border-border" />
                      <feat.icon
                        className="w-8 h-8 text-primary"
                        strokeWidth={1.2}
                      />
                    </div>
                    <p className="text-xl font-bold text-secondary">
                      {feat.label}
                    </p>
                    <p className="text-muted-foreground mt-1 font-medium">{feat.detail}</p>
                  </div>
                ))}
              </div>
              <button className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-sm">
                <span>En savoir plus</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 rounded-2xl overflow-hidden h-[340px] md:h-[520px] lg:h-[680px] shadow-2xl">
              <img src={imgPiscineImg} alt="La Piscine" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          ACTIVITÉS & SERVICES SECTION
          6-column icon grid with circular icon frames and all-caps labels.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 lg:mb-20">
            <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
              Sur place
            </p>
            <h2 className="text-foreground mb-6">
              Activités &amp; Services
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl font-medium">
              Tout ce dont vous avez besoin pour des vacances réussies, sans quitter le camping.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {[
              { icon: ShoppingBag, label: "Épicerie" },
              { icon: Bike, label: "Location de vélos" },
              { icon: RefreshCcw, label: "Laverie" },
              { icon: Leaf, label: "Loisirs nature" },
              { icon: Flame, label: "Barbecues" },
              { icon: AnimationsEteIcon, label: "Animations d'été" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border rounded-2xl p-5 md:p-8 flex flex-col items-center gap-5 shadow-sm"
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-border" />
                  <item.icon
                    className="w-8 h-8 text-primary"
                    strokeWidth={1.2}
                  />
                </div>
                <p className="text-[10px] font-bold text-foreground text-center uppercase tracking-widest">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-start">
            <button className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-sm">
              <span>Voir tous les services</span> <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================
          ALENTOURS SECTION
          4-column image card grid (Capbreton, Surf & Plages, Pays Basque, Gastronomie).
          Each card is a full-bleed overlay with gradient-to-top, tag, title, and arrow link.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 lg:mb-20">
            <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
              La région
            </p>
            <h2 className="text-primary mb-6">
              Découvrez les alentours
            </h2>
            <p className="text-muted-foreground text-xl font-medium">Côte landaise, Pays Basque, surf et gastronomie à deux pas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-16">
            {[
              { tag: "Village & port", title: "Capbreton", img: imgCapbretonImg },
              { tag: "Atlantique", title: "Surf & Plages", img: imgSurfImg },
              { tag: "Excursions", title: "Pays Basque", img: imgPaysBasqueImg },
              { tag: "Marchés & saveurs", title: "Gastronomie", img: imgGastronomieImg },
            ].map((dest) => (
              <div key={dest.title} className="relative rounded-2xl overflow-hidden h-[320px] md:h-[420px] lg:h-[540px] cursor-pointer">
                <img src={dest.img} alt={dest.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 md:p-8 lg:p-10">
                  <p className="text-secondary text-xs font-bold uppercase tracking-[2px] mb-3">
                    {dest.tag}
                  </p>
                  <h3 className="text-primary-foreground text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 font-bold">
                    {dest.title}
                  </h3>
                  <span className="text-primary-foreground font-bold text-sm flex items-center gap-3">Découvrir <ArrowRight className="size-5" /></span>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-3 text-primary text-xl font-bold border-b-2 border-primary/20 pb-1"
          >
            Explorer toute la région <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* ========================================
          ACTUALITÉS SECTION
          3-column blog article cards with image, category badge, date, title, and read link.
          Images sourced from Unsplash; replace with CMS/media-library URLs in production.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 lg:mb-20">
            <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
              Blog
            </p>
            <h2 className="text-foreground">
              Actualités
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {[
              { 
                cat: "Camping", 
                date: "15 Mars 2026", 
                title: "Nouvelle saison 2026 : toutes les nouveautés",
                image: "https://images.unsplash.com/photo-1612871095817-ab20a3738723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW1waW5nJTIwcGFyayUyMHBpbmUlMjBmb3Jlc3R8ZW58MXx8fHwxNzc5NzgzODU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              },
              { 
                cat: "Tourisme", 
                date: "10 Mars 2026", 
                title: "Les meilleures plages autour de Capbreton",
                image: "https://images.unsplash.com/photo-1650288880899-a4ad8335227c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGxhbnRpYyUyMGJlYWNoJTIwY2FwYnJldG9uJTIwZnJhbmNlJTIwbGFuZHNjYXBlc3xlbnwxfHx8fDE3Nzk3ODM4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              },
              { 
                cat: "Gastronomie", 
                date: "5 Mars 2026", 
                title: "Recette du week-end : Gâteau basque",
                image: "https://images.unsplash.com/photo-1525203135335-74d272fc8d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGZyZW5jaCUyMGNoZXJyeSUyMGNha2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc3OTc4Mzg1OHww&ixlib=rb-4.1.0&q=80&w=1080"
              },
            ].map((article) => (
              <div
                key={article.title}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="h-[280px] overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-5 md:p-8 lg:p-10">
                  <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                    <span className="bg-secondary/10 text-secondary text-xs font-bold tracking-[2px] uppercase px-4 py-2 rounded-full">
                      {article.cat}
                    </span>
                    <span className="text-muted-foreground text-xs font-bold tracking-widest">{article.date}</span>
                  </div>
                  <h3 className="text-foreground text-2xl leading-snug mb-8 font-bold">
                    {article.title}
                  </h3>
                  <a href="#" className="text-secondary text-sm font-bold flex items-center gap-3">
                    Lire l'article <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-3 text-primary text-xl font-bold border-b-2 border-primary/20 pb-1"
          >
            Voir toutes les actualités <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* ========================================
          ACCÈS & LOCALISATION SECTION
          7/5 two-column layout: Google Maps embed on the left, address + transport info on the right.
          iframe uses inline style={{ border: 0 }} — required by Google Maps embed spec, not avoidable.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-32 items-start">
            {/* Map iframe */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden h-[340px] md:h-[500px] lg:h-[640px] bg-muted shadow-inner border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.87635923985!2d-1.428458923419992!3d43.65074297110223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5169a689b0d1e1%3A0x6d859e2b1d3d6e5d!2sRoute%20de%20la%20Plage%2C%2040130%20Capbreton!5e0!3m2!1sfr!2sfr!4v1711370000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Camping La Civelle"
              />
            </div>

            {/* Info */}
            <div className="lg:col-span-5">
              <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
                Venir nous voir
              </p>
              <h2 className="text-primary mb-16">
                Accès &amp; Localisation
              </h2>

              <div className="flex items-start gap-8 mb-12">
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border border-border" />
                  <MapPin className="w-8 h-8 text-primary relative z-10" strokeWidth={1.2} />
                </div>
                <div>
                  <p className="text-secondary text-2xl font-bold mb-2">
                    Camping La Civelle
                  </p>
                  <p className="text-muted-foreground text-xl">Route de la Plage · 40130 Capbreton, France</p>
                </div>
              </div>

              <div className="bg-background border border-border rounded-2xl p-10 mb-16 space-y-4">
                <div className="text-muted-foreground text-xl flex items-center gap-6 font-medium">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0">
                    <Car className="w-8 h-8 text-primary" strokeWidth={1.2} />
                  </div>
                  <span className="text-[16px]">Autoroute A63 — Sortie Capbreton / Hossegor</span>
                </div>
                <div className="text-muted-foreground text-xl flex items-center gap-6 font-medium">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0">
                    <Train className="w-8 h-8 text-primary" strokeWidth={1.2} />
                  </div>
                  <span className="text-[16px]">Gare de Capbreton à 3 km</span>
                </div>
                <div className="text-muted-foreground text-xl flex items-center gap-6 font-medium">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0">
                    <Plane className="w-8 h-8 text-primary" strokeWidth={1.2} />
                  </div>
                  <span className="text-[16px]">Aéroport Biarritz-Anglet à 35 km</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <button className="bg-secondary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-sm">
                  <span>Calculer mon itinéraire</span> <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border-2 border-primary text-primary font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2">
                  <span>Plan du camping</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          INSTAGRAM SECTION
          6-column square photo grid (aspect-square) with a handle link button.
          Photos are static imports from src/imports/CampingLaCivelleAccueil/.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8">
            <div className="text-center md:text-left">
              <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
                Instagram
              </p>
              <h2 className="text-foreground">
                Notre vie au camping
              </h2>
            </div>
            <a
              href="#"
              className="border-2 border-primary text-primary text-sm font-bold px-8 py-3.5 rounded-2xl inline-flex items-center gap-2"
            >
              @camping_lacivelle
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {igPhotos.map((src, i) => (
              <div key={src} className="aspect-square rounded-2xl overflow-hidden">
                <img src={src} alt={`Camping La Civelle — photo Instagram ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      </>}

      {/* ─── LE CAMPING PAGE ─── */}
      {currentPage === "le-camping" && (
        <>
          <SecondaryNav currentPage={currentPage} navigateTo={navigateTo} />
          <LeCampingPage />
        </>
      )}

      {/* ─── MOBILE HOME CONFORT PAGE ─── */}
      {currentPage === "mobile-home-confort" && (
        <>
          <SecondaryNav currentPage={currentPage} navigateTo={navigateTo} />
          <MobileHomePage navigateTo={navigateTo} />
        </>
      )}

      <BottomBookingWidget />

      {/* ─── FOOTER ─── */}
      <footer className="bg-footer text-muted-foreground py-16 md:py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <VirtualAssistant />

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16">
            {/* Column 1: Contact */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary mb-4">
                  Contact
                </h4>
                <div className="flex gap-3">
                  <div className="shrink-0 mt-1">
                    <svg className="size-4" fill="none" viewBox="0 0 16 16">
                      <path d={footerSvgPaths.p27897b80} className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d={footerSvgPaths.p3a5e5a00} className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body font-medium text-[14px] text-primary-foreground mb-1">Camping La Civelle ★★★</p>
                    <p className="text-[14px] leading-relaxed text-primary-foreground/70">
                      Route de la Plage<br />
                      40130 Capbreton, France
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 16 16">
                  <path d={footerSvgPaths.p27787900} className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
                <p className="text-[14px] text-primary-foreground/70">05 58 72 12 34</p>
              </div>

              <div className="flex items-start gap-3">
                <svg className="size-4 shrink-0 mt-1" fill="none" viewBox="0 0 16 16">
                  <path d={footerSvgPaths.pa97b900} className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={footerSvgPaths.p3b65bfe0} className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
                <p className="text-[14px] break-all text-primary-foreground/70">contact@camping-lacivelle.com</p>
              </div>
            </div>

            {/* Column 2: Plan du site */}
            <div className="lg:col-span-2">
              <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary mb-4">
                Plan du site
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                {[
                  { label: "Le Camping", href: "/le-camping" },
                  { label: "Nos Emplacements", href: "#" },
                  { label: "Nos Locations", href: "#" },
                  { label: "Activités & Services", href: "#" },
                  { label: "Restaurant", href: "#" },
                  { label: "La Piscine", href: "#" },
                  { label: "Infos Pratiques", href: "#" },
                  { label: "Tourisme", href: "#" },
                ].map((link) => (
                  <li key={link.label}><a href={link.href} className="text-primary-foreground/70 hover:text-secondary">{link.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Column 3: Autres pages */}
            <div className="lg:col-span-2">
              <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary mb-4">
                Autres pages
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                {["Galerie Média", "Espace Propriétaire", "Actualités / Blog", "Contact", "Offres d'emploi", "Plan du site"].map((link) => (
                  <li key={link}><a href="#" className="text-primary-foreground/70 hover:text-secondary">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Column 4: Infos Pratiques */}
            <div className="lg:col-span-2">
              <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary mb-4">
                Infos Pratiques
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                {["Application mobile", "Plan interactif", "Nos Engagements", "FAQ", "Météo"].map((link) => (
                  <li key={link}><a href="#" className="text-primary-foreground/70 hover:text-secondary">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Column 5: Newsletter & Langue */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary mb-4">
                  Newsletter
                </h4>
                <p className="text-[14px] leading-relaxed mb-4 text-primary-foreground/70">
                  Offres spéciales, agenda d'été et nouveautés
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="bg-white/5 border border-white/10 rounded-[16px] px-3 py-2 text-[14px] text-primary-foreground focus:outline-none focus:border-secondary"
                  />
                  <button className="bg-secondary text-primary-foreground font-semibold text-[14px] py-2 rounded-[16px]">
                    S'inscrire
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="size-3.5" fill="none" viewBox="0 0 14 14">
                    <path d={footerSvgPaths.p3a870700} className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                    <path d={footerSvgPaths.p163cc8f0} className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                    <path d="M1.16667 7H12.8333" className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  </svg>
                  <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary">
                    Langue
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: "FR", iso: "fr", active: true },
                    { code: "EN", iso: "gb", active: false },
                    { code: "ES", iso: "es", active: false },
                    { code: "DE", iso: "de", active: false },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-[16px] text-[14px] font-medium ${
                        lang.active ? "bg-secondary text-primary-foreground" : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      <img
                        src={`https://flagcdn.com/w20/${lang.iso}.png`}
                        alt={`Drapeau ${lang.code}`}
                        className="w-4 h-4 object-cover rounded-sm"
                      />
                      {lang.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Labels & Partners */}
          <div className="border-b border-white/10 pb-[48px]">
            <div className="flex flex-col items-center gap-6">
              <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary">
                Nos Labels & Partenaires
              </h4>
              <div className="w-full max-w-[800px] bg-transparent">
                <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8 w-full py-4">
                  <img src={partner01} alt="Label 1" className="h-12 w-auto object-contain" />
                  <img src={partner02} alt="Label 2" className="h-12 w-auto object-contain" />
                  <img src={partner03} alt="Label 3" className="h-12 w-auto object-contain" />
                  <img src={partner04} alt="Label 4" className="h-12 w-auto object-contain" />
                  <img src={partner05} alt="Label 5" className="h-12 w-auto object-contain" />
                  <img src={partner06} alt="Label 6" className="h-12 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Socials & Payments */}
          <div className="py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10">
            <div className="space-y-4">
              <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary">
                Suivez-nous
              </h4>
              <div className="flex gap-3">
                {[
                  { name: "Instagram", path: footerSvgPaths.p4e8a00, path2: footerSvgPaths.pa2d6000 },
                  { name: "Facebook", path: footerSvgPaths.p28f18400 },
                  { name: "YouTube", path: footerSvgPaths.p3a470400, path2: footerSvgPaths.p212a8900 },
                  { name: "LinkedIn", path: footerSvgPaths.p2417b900, path2: footerSvgPaths.p1dd9ba00 },
                  { name: "TikTok", path: footerSvgPaths.p11232f00, isFill: true },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="size-10 bg-white/5 rounded-full flex items-center justify-center"
                  >
                    <svg className="size-5" fill="none" viewBox="0 0 20 20">
                      {social.isFill ? (
                        <path d={social.path} fill="currentColor" className="text-muted-foreground" />
                      ) : (
                        <>
                          <path d={social.path} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          {social.path2 && <path d={social.path2} className="stroke-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />}
                        </>
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg className="size-3.5" fill="none" viewBox="0 0 14 14">
                  <path d={footerSvgPaths.p22d5dd80} className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  <path d="M1.16663 5.83301H12.8333" className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                </svg>
                <h4 className="font-body font-bold text-[10px] tracking-[1.1px] uppercase text-secondary">
                  Paiements acceptés
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {["CB", "Visa", "Mastercard", "Chèques vacances", "ANCV"].map((p) => (
                  <span key={p} className="bg-white/5 px-3 py-1.5 rounded text-[12px] text-muted-foreground">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {["CGV", "CGU", "Mentions légales", "RGPD", "Gestion des cookies", "Règlement intérieur"].map((link) => (
                <a key={link} href="#" className="text-muted-foreground">{link}</a>
              ))}
            </div>
            <p className="text-muted-foreground">© 2026 Camping La Civelle — Tous droits réservés</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] w-14 h-14 cursor-pointer">
        <ButtonOuvrirLeChat />
      </div>

      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-[100] w-14 h-14 cursor-pointer bg-primary rounded-full flex items-center justify-center text-secondary shadow-lg"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
