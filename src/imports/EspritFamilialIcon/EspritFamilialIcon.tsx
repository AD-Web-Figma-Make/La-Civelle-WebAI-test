import svgPaths from "./svg-uh2olhvo9h.ts";

export default function EspritFamilialIcon({ 
  stroke = "#2D4A3E", 
  fill = "none", 
  fillOpacity = 1, 
  strokeWidth = 3.33333,
  className = "" 
}: { 
  stroke?: string; 
  fill?: string; 
  fillOpacity?: number; 
  strokeWidth?: number | string;
  className?: string;
}) {
  return (
    <div className={className} data-name="esprit_familial_icon">
      <svg className="w-full h-full block" fill={fill} fillOpacity={fillOpacity} viewBox="0 0 40 40">
        <g id="esprit_familial_icon">
          <path d={svgPaths.p8a13ff0} id="Vector" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  );
}