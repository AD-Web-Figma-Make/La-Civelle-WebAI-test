/**
 * BookingWidget — Availability table with search controls for the Mobile Home Confort 3ch.
 *
 * Props: none (self-contained; booking data is hardcoded — connect to API to make dynamic)
 *
 * Layout notes:
 *   Two search modes: "exact dates" (radio toggle, not yet wired) and "monthly" (active default).
 *   The availability grid uses a custom grid-cols template to align photo, period headers, and
 *   result cells in a single responsive table. Horizontal scroll is hidden but functional on mobile.
 *   Period keys are derived from `period.from` strings, which are unique within each month block.
 */

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import pict101 from "../../imports/pict_10_1.jpg";

type PeriodStatus = "past" | "available" | "full" | "unavailable";

interface Period {
  from: string;
  to: string;
  status: PeriodStatus;
  price?: string;
  originalPrice?: string;
  discount?: string;
}

interface MonthData {
  label: string;
  periods: Period[];
}

const BOOKING_DATA: MonthData[] = [
  {
    label: "JUIN 2026",
    periods: [
      { from: "mar. 02", to: "mar. 09", status: "past" },
      {
        from: "mar. 09", to: "mar. 16", status: "available",
        price: "521,01€", originalPrice: "578,90€", discount: "-10%",
      },
      {
        from: "mar. 16", to: "mar. 23", status: "available",
        price: "521,01€", originalPrice: "578,90€", discount: "-10%",
      },
      {
        from: "mar. 23", to: "mar. 30", status: "full",
        price: "774,36€", originalPrice: "860,40€", discount: "-10%",
      },
    ],
  },
  {
    label: "JUILLET 2026",
    periods: [
      { from: "mar. 30", to: "mar. 07", status: "unavailable" },
      {
        from: "sam. 04", to: "sam. 11", status: "available",
        price: "890,00€",
      },
      {
        from: "sam. 11", to: "sam. 18", status: "available",
        price: "890,00€",
      },
      {
        from: "sam. 18", to: "sam. 25", status: "full",
        price: "890,00€",
      },
    ],
  },
];

export function BookingWidget() {
  const [searchMode, setSearchMode] = useState<"monthly" | "exact">("monthly");
  const [selectedMonth, setSelectedMonth] = useState("juin-2026");
  const [selectedDuration, setSelectedDuration] = useState("7");
  const [selectedArrival, setSelectedArrival] = useState("mardi");

  const visibleBookingData = BOOKING_DATA.map((month) => ({
    ...month,
    periods: month.periods.slice(
      0,
      month.label.startsWith("JUIN") ? month.periods.length : 1,
    ),
  })).filter((month) => month.periods.length > 0);
  const visiblePeriods = visibleBookingData.flatMap((m) => m.periods);
  const resultsGridClass = "grid grid-cols-[minmax(148px,224px)_repeat(5,minmax(0,1fr))]";

  return (
    <div className="bg-card rounded-[16px] border border-border shadow-sm overflow-hidden">

      {/* ── Search Controls ── */}
      <div className="px-6 py-6">

        {/* Option 1: Exact dates */}
        <div
          className="flex items-center gap-3 mb-5 cursor-pointer select-none"
          onClick={() => setSearchMode("exact")}
        >
          <div
            className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
              searchMode === "exact" ? "border-primary" : "border-muted-foreground/40"
            }`}
          >
            {searchMode === "exact" && (
              <div className="w-3.5 h-3.5 rounded-full bg-primary" />
            )}
          </div>
          <p className="text-[14px] text-muted-foreground">
            Je préfère rechercher sur mes dates exactes de début et de fin de séjour
          </p>
        </div>

        {/* Option 2: Monthly search */}
        <div className="flex items-center gap-3">
          <div
            className={`shrink-0 w-8 h-8 rounded-full border-2 cursor-pointer flex items-center justify-center ${
              searchMode === "monthly" ? "border-primary" : "border-muted-foreground/40"
            }`}
            onClick={() => setSearchMode("monthly")}
          >
            {searchMode === "monthly" && (
              <div className="w-3.5 h-3.5 rounded-full bg-primary" />
            )}
          </div>

          <div className="flex flex-wrap gap-3 flex-1">
            {/* MOIS DU SÉJOUR */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <p className="text-[12px] tracking-[1.2px] uppercase text-muted-foreground whitespace-nowrap">
                MOIS DU SÉJOUR
              </p>
              <div className="relative border border-border bg-card">
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-[12px] text-foreground whitespace-nowrap uppercase font-medium">
                    {selectedMonth === "juin-2026" ? "JUIN 2026" : "JUILLET 2026"}
                  </span>
                  <ChevronDown className="w-3 h-3 text-foreground ml-2 shrink-0" />
                </div>
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="juin-2026">JUIN 2026</option>
                  <option value="juillet-2026">JUILLET 2026</option>
                </select>
              </div>
            </div>

            {/* DURÉE DU SÉJOUR */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <p className="text-[12px] tracking-[1.2px] uppercase text-muted-foreground whitespace-nowrap">
                DURÉE DU SÉJOUR
              </p>
              <div className="relative border border-border bg-card">
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-[12px] text-foreground whitespace-nowrap font-medium">
                    {selectedDuration} NUITS
                  </span>
                  <ChevronDown className="w-3 h-3 text-foreground ml-2 shrink-0" />
                </div>
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  <option value="7">7 NUITS</option>
                  <option value="14">14 NUITS</option>
                </select>
              </div>
            </div>

            {/* ARRIVÉE LE */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <p className="text-[12px] tracking-[1.2px] uppercase text-muted-foreground whitespace-nowrap">
                ARRIVÉE LE
              </p>
              <div className="relative border border-border bg-card">
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-[12px] text-foreground whitespace-nowrap uppercase font-medium">
                    {selectedArrival}
                  </span>
                  <ChevronDown className="w-3 h-3 text-foreground ml-2 shrink-0" />
                </div>
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  value={selectedArrival}
                  onChange={(e) => setSelectedArrival(e.target.value)}
                >
                  <option value="samedi">SAMEDI</option>
                  <option value="mardi">MARDI</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Availability Table ── */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-[560px]">

          {/* Month header tabs */}
          <div className="grid grid-cols-[minmax(148px,224px)_minmax(0,1fr)]">
            <div />
            <div className="grid grid-cols-2">
              {visibleBookingData.map((month) => (
                <div
                  key={month.label}
                  className={`text-center py-2.5 text-[12px] md:text-[14px] text-primary-foreground tracking-[0.08em] rounded-t-[16px] font-bold ${
                    month.label.startsWith("JUIN") ? "bg-primary" : "bg-muted-foreground/60"
                  }`}
                >
                  {month.label}
                </div>
              ))}
            </div>
          </div>

          {/* Period header row */}
          <div className={`${resultsGridClass} border-b border-t border-border`}>
            <div className="border-r border-border" />
            {visiblePeriods.map((period) => (
              <div
                key={period.from}
                className="flex flex-col items-center justify-center px-2 py-6 border-r border-border text-center"
              >
                <p className="text-[12px] md:text-[14px] text-foreground font-medium">du {period.from}</p>
                <p className="text-[12px] md:text-[14px] text-foreground font-medium">au {period.to}</p>
              </div>
            ))}
          </div>

          {/* Result row */}
          <div className={resultsGridClass}>

            {/* Photo + location name */}
            <div className="relative min-h-[219px] border-r border-border">
              <img
                src={pict101}
                alt="Mobile Home Confort 3 chambres"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/90 to-transparent px-4 pb-3 pt-10">
                <p className="text-[14px] text-primary-foreground leading-snug font-medium">
                  Mobile Home Confort 3 chambres
                </p>
              </div>
            </div>

            {/* Period result cells */}
            {visiblePeriods.map((period) => (
              <div
                key={period.from}
                className="relative min-h-[219px] border-r border-border"
              >
                {period.status === "past" && (
                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <p className="text-[14px] text-muted-foreground text-center">
                      Cette période n'est plus disponible
                    </p>
                  </div>
                )}

                {(period.status === "available" || period.status === "full") && (
                  <>
                    {period.discount && (
                      <div className="absolute top-0 right-0 bg-secondary px-2 py-1">
                        <p className="text-[14px] text-primary-foreground font-bold whitespace-nowrap">
                          {period.discount}
                        </p>
                      </div>
                    )}

                    <p className="absolute top-[35px] inset-x-2 text-center text-[12px] md:text-[14px] text-muted-foreground">
                      A partir de
                    </p>
                    {period.originalPrice && (
                      <p className="absolute top-[65px] inset-x-2 text-center text-[16px] md:text-[20px] text-muted-foreground line-through">
                        {period.originalPrice}
                      </p>
                    )}
                    <p className="absolute top-[95px] inset-x-2 text-center text-[20px] md:text-[26px] text-foreground font-heading font-bold">
                      {period.price}
                    </p>

                    {period.status === "available" && (
                      <button
                        className="absolute inset-x-2 bottom-5 flex min-h-11 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-primary-foreground bg-primary font-bold uppercase text-[12px] tracking-[1.2px]"
                      >
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span className="whitespace-nowrap">Réserver</span>
                      </button>
                    )}

                    {period.status === "full" && (
                      <p className="absolute top-[143px] inset-x-2 text-center text-[14px] text-muted-foreground font-medium">
                        Complet
                      </p>
                    )}
                  </>
                )}

                {period.status === "unavailable" && (
                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <p className="text-[14px] text-muted-foreground text-center">Non disponible</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
