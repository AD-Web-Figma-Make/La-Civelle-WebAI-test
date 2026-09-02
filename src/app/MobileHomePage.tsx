/**
 * MobileHomePage — Detail page for the "Mobile Home Confort 3 chambres" rental.
 *
 * Props:
 *   navigateTo — SPA navigation callback, used for breadcrumb "Accueil" link and back-link.
 *
 * Layout notes:
 *   Structured as a single long-form product page: hero → spec bar → two-column content →
 *   booking widget → comparison card. The photo gallery uses a controlled index (activePhoto)
 *   with prev/next buttons and a 6-thumbnail strip below the main image.
 *   The spec-bar grid uses conditional border classes to create a 2×2 layout on mobile
 *   that transitions to a single row of 4 on sm+ screens.
 */

import { useState } from "react";
import { BookingWidget } from "./components/BookingWidget";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X as XIcon,
  Calendar,
  Shield,
  FileText,
  Download,
  Users,
  Bed,
  Maximize2,
  Wind,
  Coffee,
  Utensils,
  TreePine,
  Bath,
  Wifi,
  Tv,
  Dog,
  Car,
  DoorOpen,
} from "lucide-react";

import pict101 from "../imports/pict_10_1.jpg";
import pict102 from "../imports/pict_10_2.jpg";
import pict103 from "../imports/pict_10_3.jpg";
import pict104 from "../imports/pict_10_4.jpg";
import pict105 from "../imports/pict_10_5.jpg";
import pict106 from "../imports/pict_10_6.jpg";

import imgCottageImg from "../imports/AccueilImages/18d4b7475b387b4d1cbbf4d064c592999b2228c1.png";

const galleryImages = [
  pict101,
  pict102,
  pict103,
  pict104,
  pict105,
  pict106,
];

const bedrooms = [
  { desc: "Chambre 1 : lit double 140×190 cm" },
  { desc: "Chambre 2 : 2 lits superposés 80×190 cm" },
  { desc: "Chambre 3 : 2 lits simples 80×190 cm" },
];

const equipment: { label: string; included: boolean; icon: any }[] = [
  { label: "Cuisine équipée (réfrigérateur, plaques, micro-ondes)", included: true, icon: Coffee },
  { label: "Vaisselle et ustensiles complets", included: true, icon: Utensils },
  { label: "Literie fournie (draps, couettes)", included: true, icon: Bed },
  { label: "Terrasse couverte avec salon de jardin", included: true, icon: TreePine },
  { label: "Salle d'eau (douche + lavabo)", included: true, icon: Bath },
  { label: "WC séparé", included: true, icon: DoorOpen },
  { label: "WiFi haut débit inclus", included: true, icon: Wifi },
  { label: "Télévision", included: true, icon: Tv },
  { label: "Climatisation", included: false, icon: Wind },
  { label: "Lave-vaisselle", included: false, icon: Utensils },
  { label: "Animaux admis", included: false, icon: Dog },
  { label: "Parking inclus sur emplacement", included: true, icon: Car },
];

interface MobileHomePageProps {
  navigateTo: (page: any) => void;
}

export default function MobileHomePage({ navigateTo }: MobileHomePageProps) {
  const [activePhoto, setActivePhoto] = useState(0);

  const prevPhoto = () =>
    setActivePhoto((p) => (p - 1 + galleryImages.length) % galleryImages.length);
  const nextPhoto = () =>
    setActivePhoto((p) => (p + 1) % galleryImages.length);

  return (
    <>
      {/* ========================================
          HERO SECTION
          Layered hero with a static photo at 40% opacity and a primary-tone gradient overlay.
          Hero text is left-aligned. Breadcrumb nav sits above the H1.
          ======================================== */}
      <section className="relative flex items-end overflow-hidden bg-primary min-h-[440px]">
        <div className="absolute inset-0">
          <img
            src={pict101}
            alt="Mobile Home Confort 3 chambres - Vue extérieure"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/25 to-primary/42" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-24">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6">
            <button
              onClick={() => navigateTo("home")}
              className="text-primary-foreground/70 text-[12px] font-medium"
            >
              Accueil
            </button>
            <svg className="w-3 h-3 text-secondary" fill="none" viewBox="0 0 12 12">
              <path
                d="M4.5 9L7.5 6L4.5 3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            <span className="text-primary-foreground/70 text-[12px] font-medium">Nos Locations</span>
            <svg className="w-3 h-3 text-secondary" fill="none" viewBox="0 0 12 12">
              <path
                d="M4.5 9L7.5 6L4.5 3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            <span className="text-primary-foreground text-[12px] font-semibold">Mobile Home Confort 3 chambres</span>
          </nav>

          {/* Suptitle */}
          <p className="text-secondary text-sm font-bold tracking-[4.6px] uppercase mb-4">Location mobil-home · Capbreton</p>

          {/* H1 */}
          <h1 className="text-primary-foreground leading-[1.05] mb-5">
            Mobile Home Confort<br className="hidden sm:block" /> 3 chambres
          </h1>

          {/* Subtitle */}
          <p className="text-primary-foreground/80 text-lg font-normal tracking-[-0.3px]">
            38 m² · 6 personnes · Terrasse couverte · À partir de 490 €/sem.
          </p>
        </div>
      </section>

      {/* ========================================
          QUICK SPEC BAR
          4-cell summary row (capacity, bedrooms, area, AC). 2×2 on mobile, 1×4 on sm+.
          Uses conditional border classes to preserve the grid divider lines at all breakpoints.
          ======================================== */}
      <div className="bg-card border-b border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { Icon: Users, label: "Capacité", value: "6 personnes" },
              { Icon: Bed, label: "Chambres", value: "3 chambres" },
              { Icon: Maximize2, label: "Surface", value: "38 m²" },
              { Icon: Wind, label: "Climatisation", value: "Non inclus" },
            ].map(({ Icon, label, value }, idx) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 px-5 py-4 border-border ${
                  idx < 2 ? "border-b sm:border-b-0" : ""
                } ${idx % 2 === 0 ? "border-r" : "sm:border-r"} ${
                  idx === 3 ? "sm:border-r-0" : ""
                }`}
              >
                <Icon className="w-4 h-4 text-secondary shrink-0" strokeWidth={1.5} />
                <span className="text-muted-foreground text-sm">{label} :</span>
                <span className="text-foreground text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================
          MAIN CONTENT SECTION
          Contains the intro module, bedroom composition, equipment list, conditions,
          the BookingWidget, and the compare card — all in a single scrollable section.
          ======================================== */}
      <section className="bg-card py-12 md:py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 md:gap-20">

            {/* ─── INTRO MODULE (Two Columns) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

              {/* SEO Text & Actions */}
              <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
                <div>
                  <p className="text-secondary text-[12px] font-bold tracking-[3.6px] uppercase mb-4">
                    Camping 3 étoiles · Capbreton · Landes
                  </p>
                  <h2 className="text-primary leading-snug mb-7">
                    Location mobil-home 3 chambres à Capbreton :<br />
                    séjour en famille dans les Landes
                  </h2>

                  <div className="space-y-8 text-muted-foreground text-base leading-relaxed">
                    <p>
                      Le <strong className="text-primary">Mobile Home Confort 3 chambres</strong> du
                      Camping La Civelle est la location idéale pour les familles souhaitant passer des
                      vacances à Capbreton dans les Landes, sans les contraintes du camping traditionnel.
                      Sur 38 m², ce mobil-home entièrement équipé vous accueille jusqu'à 6 personnes dans
                      un cadre naturel exceptionnel — la forêt de pins maritimes à seulement 800 mètres
                      des plages de l'Atlantique.
                    </p>
                  </div>
                </div>

                {/* Document Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-sm">
                    <FileText className="w-5 h-5" strokeWidth={1.5} />
                    <span>Plan de la location</span>
                  </button>
                  <button className="border-2 border-primary text-primary font-bold text-sm px-8 py-3.5 rounded-2xl inline-flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    <span>Inventaire PDF</span>
                  </button>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
                {/* Main photo */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-border shadow-lg">
                  <img
                    src={galleryImages[activePhoto]}
                    alt={`Vue ${activePhoto + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/90 rounded-full flex items-center justify-center shadow-lg"
                    aria-label="Photo précédente"
                  >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/90 rounded-full flex items-center justify-center shadow-lg"
                    aria-label="Photo suivante"
                  >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>
                  <div className="absolute bottom-4 right-5 bg-black/50 backdrop-blur-sm text-primary-foreground text-[13px] font-bold px-3 py-1.5 rounded-full">
                    {activePhoto + 1} / {galleryImages.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {galleryImages.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setActivePhoto(i)}
                      className={`aspect-[4/3] rounded-xl overflow-hidden border-[3px] ${
                        activePhoto === i ? "border-secondary" : "border-transparent opacity-70"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Vue ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── ADDITIONAL INFO COLUMN ─── */}
            <div className="space-y-14">
              
              {/* Bedroom Composition + Comfort Copy */}
              <div className="bg-background rounded-2xl border border-border p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <div>
                    <h4 className="font-bold tracking-[1.2px] text-[18px] mb-[24px] text-primary">
                      Composition des chambres
                    </h4>
                    
                    <div className="space-y-2">
                      {bedrooms.map((room) => (
                        <div
                          key={room.desc}
                          className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-3"
                        >
                          <DoorOpen className="w-4 h-4 shrink-0 text-secondary" strokeWidth={1.5} />
                          <span className="text-muted-foreground text-sm">{room.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 text-muted-foreground text-base leading-relaxed">
                    <h3 className="text-[18px] font-heading font-bold text-secondary">
                      Confort et espace pour toute la famille
                    </h3>
                    <p>Les trois chambres permettent une répartition confortable des adultes et enfants. La chambre parentale dispose d'un lit double 140×190, tandis que les deux chambres enfants proposent lits superposés et lits simples.</p>
                    <p>Le séjour ouvert sur la cuisine crée une ambiance conviviale, et la terrasse couverte prolonge l'espace de vie vers l'extérieur sous les pins. Barbecue à disposition sur demande.</p>
                  </div>
                </div>
              </div>

              {/* Equipment & Services */}
              <div>
                <div className="flex mx-[0px] mt-[0px] mb-[24px]">
                  <h4 className="text-muted-foreground text-[12px] font-bold tracking-[1.2px] uppercase">
                    Équipements & services
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {equipment.map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-2xl px-4 py-3 flex items-center gap-3 border ${
                        item.included
                          ? "bg-card border-border"
                          : "bg-muted/30 border-border opacity-60"
                      }`}
                    >
                      {item.label === "WC séparé" ? (
                        <svg
                          className={`w-4 h-4 shrink-0 ${
                            item.included ? "text-secondary" : "text-muted-foreground"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 12h10" />
                          <path d="M8 12V5a2 2 0 0 1 2-2h5v9" />
                          <path d="M7 12a5 5 0 0 0 5 5h1a5 5 0 0 0 5-5" />
                          <path d="M10 21h5" />
                          <path d="M12 17v4" />
                        </svg>
                      ) : (
                        <item.icon
                          className={`w-4 h-4 shrink-0 ${
                            item.included ? "text-secondary" : "text-muted-foreground"
                          }`}
                          strokeWidth={1.5}
                        />
                      )}
                      <span className={`text-sm ${item.included ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {item.label}
                      </span>
                      {!item.included && (
                        <XIcon className="w-3 h-3 ml-auto text-muted-foreground/50" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrival / Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                    <span className="text-muted-foreground text-[12px] font-bold tracking-[1.2px] uppercase">
                      Arrivée & départ
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      Arrivée : à partir de{" "}
                      <strong className="text-foreground font-bold">16h00</strong>
                    </li>
                    <li>
                      Départ : avant{" "}
                      <strong className="text-foreground font-bold">10h00</strong>
                    </li>
                    <li>
                      Location à la semaine :{" "}
                      <strong className="text-foreground font-bold">samedi → samedi</strong>
                    </li>
                    <li>Location courte durée possible hors saison</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                    <span className="text-muted-foreground text-[12px] font-bold tracking-[1.2px] uppercase">
                      Conditions
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      Caution :{" "}
                      <strong className="text-foreground font-bold">300 € (chèque)</strong>
                    </li>
                    <li>
                      Animaux :{" "}
                      <strong className="text-foreground font-bold">non admis en location</strong>
                    </li>
                    <li>Fumeur : interdit à l'intérieur</li>
                    <li>Ménage fin de séjour : 50 € (option)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ─── BOOKING SECTION ─── */}
            <div className="w-full space-y-8">
              <div className="max-w-3xl mx-auto text-center space-y-5">
                <h2 className="text-primary">
                  Tarifs et réservation mobil-home à Capbreton
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Le Mobile Home Confort 3 chambres est loué à la semaine (samedi au samedi), d'avril à fin septembre. La literie, le WiFi et la taxe de séjour sont inclus dans le tarif.
                </p>
              </div>
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          COMPARE SECTION
          Single Cottage Premium card (max-w-[326px]) with a back-to-locations link below.
          ======================================== */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-secondary text-[12px] font-bold tracking-[3.6px] uppercase mb-2 text-left">
              Comparer
            </p>
            <h2 className="text-foreground font-heading font-bold text-left">
              Notre autre location
            </h2>
          </div>

          <div className="flex justify-left">
            {/* Cottage Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden w-full sm:max-w-[326px] shadow-sm">
              <div className="h-[220px] overflow-hidden">
                <img
                  src={imgCottageImg}
                  alt="Cottage Premium 3 chambres"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-foreground text-[18px] font-heading font-bold mb-1">
                  Cottage Premium 3 chambres
                </h3>
                <p className="text-muted-foreground text-[12px] mb-1">45 m² · 3 chambres</p>
                <p className="text-secondary text-[12px] font-semibold mb-5">
                  À partir de 1 190 €/sem. (haute saison)
                </p>
                <button className="flex items-center gap-2 text-primary text-[12px] font-medium">
                  <span>Voir la fiche</span> <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navigateTo("home"); }}
            className="inline-flex items-center gap-3 text-primary text-xl font-bold border-b-2 border-primary/20 px-[0px] pt-[24px] pb-[4px]"
          >
            <ArrowLeft className="w-6 h-6" /> Retour à toutes nos locations
          </a>
        </div>
      </section>
    </>
  );
}
