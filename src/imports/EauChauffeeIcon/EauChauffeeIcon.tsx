import svgPaths from "./svg-rrqz7ir9ku.ts";

export default function EauChauffeeIcon({ 
  stroke = "#2D4A3E", 
  fill = "none", 
  fillOpacity = 1, 
  strokeWidth = 2,
  className = "" 
}: { 
  stroke?: string; 
  fill?: string; 
  fillOpacity?: number; 
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <div className={className} data-name="eau_chauffee_icon">
      <svg className="w-full h-full block" fill={fill} fillOpacity={fillOpacity} viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d3f6c80} id="Vector" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
          <path d={svgPaths.p37cfb400} id="Vector_2" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  );
}