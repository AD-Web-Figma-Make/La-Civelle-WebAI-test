import svgPaths from "./svg-hpfxdrtxpk.ts";

function Icon() {
  return (
    <div className="absolute left-[16px] size-[24px] top-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1023c700} id="Vector" className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return <div className="absolute bg-secondary border-2 border-background border-solid left-[42px] rounded-full size-[16px] top-[-2px]" data-name="Text" />;
}

export default function ButtonOuvrirLeChat() {
  return (
    <div className="bg-primary shadow-lg relative rounded-full size-full" data-name="Button - Ouvrir le chat">
      <Icon />
      <Text />
    </div>
  );
}
