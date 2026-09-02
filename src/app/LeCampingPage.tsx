/**
 * LeCampingPage — "Le Camping" editorial page presenting the domain, services, surroundings, and values.
 *
 * Props: none (standalone page, navigateTo not required — internal links use href="/").
 *
 * Layout notes:
 *   Full-bleed hero with a layered image + gradient overlay using primary color opacity modifiers.
 *   Two independent image carousels (domain gallery and services gallery) each maintain their own
 *   index in local state.
 *   The "Alentours" section uses a full-bleed background image with a dark gradient overlay.
 *   Section alternates between bg-card and bg-muted/40 for visual rhythm.
 */

import { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TreePine,
  Clock,
  Accessibility,
  Leaf,
  Users
} from "lucide-react";

const EspacePreserveIcon = TreePine;
const HorsDuTempsIcon = Clock;
const TourismeHandicapIcon = Accessibility;

import imgEmplacementsImg from "../imports/AccueilImages/e7c2cf6672d47127a07894afd505fe855b2fcf69.png";
import imgLocationsImg from "../imports/AccueilImages/18d4b7475b387b4d1cbbf4d064c592999b2228c1.png";
import imgPiscineImg from "../imports/AccueilImages/aa7559c955e11b7d45004f4a4d265e6a3a1316f6.png";
import imgCapbretonImg from "../imports/AccueilImages/3905d8f65b77c42d61c8f03efa56744d872db131.png";
import imgRestaurantImg from "../imports/AccueilImages/fe7f2da4b71b0d030d544ae57f12bab1211afc66.png";
import igPhoto1 from "../imports/CampingLaCivelleAccueil/f81aded7cfb3f6bb1c39b73d318f6e27a8f6704f.png";
import heroSectionImg from "../imports/hero_section.jpg";

export default function LeCampingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [servicesImageIndex, setServicesImageIndex] = useState(0);

  const carouselImages = [imgEmplacementsImg, imgLocationsImg, imgPiscineImg, imgCapbretonImg];
  const servicesImages = [imgPiscineImg, imgRestaurantImg, imgCapbretonImg];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  const nextServicesImage = () => setServicesImageIndex((prev) => (prev + 1) % servicesImages.length);
  const prevServicesImage = () => setServicesImageIndex((prev) => (prev - 1 + servicesImages.length) % servicesImages.length);

  return (
    <>
      {/* ========================================
          HERO SECTION
          Layered hero: static photo at 20% opacity + full-bleed primary-gradient overlay.
          The gradient overlay uses Tailwind opacity modifiers (from-primary/80) to avoid
          hardcoded hex values. Text is left-aligned on all viewports.
          ======================================== */}
      <section className="relative flex items-end overflow-hidden bg-primary min-h-[440px]">
        <div className="absolute inset-0">
          <img
            src={igPhoto1}
            alt="Forêt de pins landaise au Camping La Civelle"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        {/* Background image layer — split from gradient so no hardcoded hex is needed */}
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: `url(${heroSectionImg})` }}
        />
        {/* Gradient overlay using token opacity modifiers (primary = #0b665d) */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-24 flex flex-col items-left text-left">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6 self-start">
            <a href="/" className="text-primary-foreground/70 text-[12px] font-normal">
              Accueil
            </a>
            <svg className="w-3 h-3 text-secondary" fill="none" viewBox="0 0 12 12">
              <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-primary-foreground text-[12px] font-normal">Le Camping</span>
          </nav>

          <p className="text-secondary text-sm font-bold tracking-[4.6px] uppercase mb-6">
            Capbreton · Landes · Atlantique
          </p>
          <h1 className="text-primary-foreground leading-[1.05] mb-5">
            Le Camping
          </h1>
          <p className="text-primary-foreground/80 text-lg font-normal tracking-[-0.3px]">
            11 hectares de forêt landaise · Camping 3 étoiles
          </p>
        </div>
      </section>

      {/* ========================================
          UN HAVRE DE PAIX SECTION
          Two-column layout: editorial text + stats bar on the left, image carousel on the right.
          Carousel index is controlled by local state (currentImageIndex).
          ======================================== */}
      <section className="bg-card py-16 md:py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Text */}
            <div className="pt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-secondary" />
                <p className="text-secondary text-[12px] font-bold tracking-[3.6px] uppercase whitespace-nowrap">
                  Notre domaine
                </p>
              </div>

              <h2 className="text-primary mb-10 leading-[1.15]">
                Un havre de paix<br />
                <span className="text-secondary">dans les Landes</span>
              </h2>

              <div className="space-y-6 mb-14">
                <p className="text-muted-foreground text-[20px] leading-relaxed font-medium">
                  Le <strong className="text-primary">Camping La Civelle</strong> vous accueille sur un domaine de <strong className="text-primary">11 hectares</strong> au cœur de la forêt de pins des Landes.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">Situé à Capbreton, notre camping 3 étoiles est l'endroit idéal pour vos vacances en famille ou entre amis. Labellisé Tourisme & Handicap et récompensé par l'Écolabel européen, La Civelle conjugue confort, nature préservée et engagement environnemental durable.</p>
                <p className="text-muted-foreground text-lg leading-relaxed">À seulement 800 mètres des plages de l'Atlantique, profitez du meilleur des deux mondes : le calme de la forêt de pins maritimes le matin, et les plaisirs de l'océan l'après-midi. Depuis notre camping landais, la côte basque, Hossegor et les marchés du Pays Basque sont accessibles en moins d'une heure.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  { value: "11", unit: "hectares", label: "de forêt landaise" },
                  { value: "800 m", unit: "", label: "des plages Atlantique" },
                  { value: "+30", unit: "ans", label: "d'accueil familial" },
                ].map((stat) => (
                  <div key={stat.label} className="border-l-2 border-secondary/40 pl-5">
                    <p className="font-heading text-primary text-3xl font-black leading-none mb-1">
                      {stat.value}
                      <span className="text-xl text-secondary">{stat.unit && ` ${stat.unit}`}</span>
                    </p>
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Carousel */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-primary/5">
                <img
                  src={carouselImages[currentImageIndex]}
                  alt="Camping La Civelle gallery"
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button 
                    onClick={prevImage}
                    className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center text-primary pointer-events-auto"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center text-primary pointer-events-auto"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SERVICES & ÉQUIPEMENTS SECTION
          Two-column layout: image carousel on the left, text + primary CTA on the right.
          Second independent carousel (servicesImageIndex).
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">

            {/* Left: Image Carousel */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-primary/5">
                <img 
                  src={servicesImages[servicesImageIndex]} 
                  alt="Services & équipements" 
                  className="w-full h-full object-cover" 
                />
                
                {/* Navigation Arrows */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button 
                    onClick={prevServicesImage}
                    className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center text-primary pointer-events-auto"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextServicesImage}
                    className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center text-primary pointer-events-auto"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
                Sur place
              </p>
              <h2 className="text-foreground mb-8">
                Services &<br />équipements
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">Profitez de nombreuses activités sur place : piscine chauffée, aire de jeux pour enfants, terrain de pétanque et location de vélos pour découvrir les pistes cyclables landaises. Notre épicerie de campagne, notre restaurant et notre espace laverie vous assurent un confort optimal tout au long du séjour.</p>

              <button className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-sm">
                <span>Découvrir les services</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          DÉCOUVREZ LES ALENTOURS — FULL-BLEED CTA SECTION
          Background image with dark gradient overlay. Centered text and secondary CTA button.
          ======================================== */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[560px]">
        <div className="absolute inset-0">
          <img
            src={imgCapbretonImg}
            alt="Alentours de Capbreton"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 max-w-[760px] mx-auto">
          <p className="text-secondary text-sm font-bold tracking-[4.6px] uppercase mb-6">
            La région
          </p>
          <h2 className="text-primary-foreground mb-6 leading-tight">
            Découvrez les Alentours
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed max-w-[520px]">Explorez Capbreton, Hossegor, le Pays Basque et bien plus encore depuis votre base à La Civelle</p>
          <button className="bg-secondary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-sm"><span>Explorer la région</span> <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>

      {/* ========================================
          NOS ENGAGEMENTS & VALEURS SECTION
          Centered 5-column icon grid with label and description per value.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">
              Notre ADN
            </p>
            <h2 className="text-primary">
              Nos Engagements &<br />Valeurs
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 items-start">
            {[
              {
                icon: Leaf,
                label: "Camping labellisé",
                desc: "Certifié 3 étoiles",
              },
              {
                icon: EspacePreserveIcon,
                label: "Espace préservé",
                desc: "Respect de la nature",
              },
              {
                icon: HorsDuTempsIcon,
                label: "Hors du temps",
                desc: "Déconnexion totale",
              },
              {
                icon: Users,
                label: "Esprit familial",
                desc: "Accueil chaleureux",
              },
              {
                icon: TourismeHandicapIcon,
                label: "Tourisme & Handicap",
                desc: "Labellisé",
              },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full border border-border" />
                  <item.icon
                    className="w-8 h-8 text-primary"
                    strokeWidth={1.2}
                  />
                </div>
                <h3 className="text-secondary text-lg mb-3 font-bold">{item.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="border-2 border-primary text-primary font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2">
              <span>En savoir plus</span> <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================
          DÉCOUVREZ AUSSI SECTION
          3-column card grid linking to Actualités, Nos Locations, and FAQ.
          ======================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 lg:mb-20">
            <p className="text-secondary text-sm font-bold tracking-[3.6px] uppercase mb-4">À explorer</p>
            <h2 className="text-foreground">
              Découvrez aussi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Actualités",
                desc: "Suivez nos dernières nouvelles et conseils vacances",
                img: imgEmplacementsImg,
                href: "#",
              },
              {
                title: "Nos Locations",
                desc: "Mobil homes et cottages tout confort",
                img: imgLocationsImg,
                href: "#",
              },
              {
                title: "FAQ",
                desc: "Toutes les réponses à vos questions pratiques",
                img: imgRestaurantImg,
                href: "#",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="h-[240px] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-foreground text-2xl mt-2 mb-4 font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">{item.desc}</p>
                  <a
                    href={item.href}
                    className="text-secondary text-sm font-bold flex items-center gap-3"
                  >
                    Découvrir <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
