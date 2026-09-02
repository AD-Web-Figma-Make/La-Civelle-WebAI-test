import svgPaths from "./svg-x0z2nbp9vt";

function Container1() {
  return (
    <div className="-translate-y-1/2 absolute h-[7.13px] left-[182.95px] top-[calc(50%-0.01px)] w-[5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7.13">
        <g id="Container">
          <path d={svgPaths.p160ee00} fill="var(--fill-0, white)" id="Symbol" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[25.7px] relative shrink-0 w-[187.95px]" data-name="Container">
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Butler-Light:Regular',sans-serif] justify-center leading-[0] left-[calc(50%-7.5px)] not-italic text-[18px] text-center text-white top-[calc(50%-0.85px)] whitespace-nowrap">
        <p className="leading-[25.71px]">Rechercher un séjour</p>
      </div>
      <Container1 />
    </div>
  );
}

export default function HiddenBooking() {
  return (
    <div className="bg-[#123e52] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.4)] flex items-center justify-center relative rounded-tl-[4px] rounded-tr-[4px] size-full" data-name="hidden_booking">
      <Container />
    </div>
  );
}