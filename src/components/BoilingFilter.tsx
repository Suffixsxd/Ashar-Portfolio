export function BoilingFilter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
      <defs>
        <filter id="boil-1">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="0" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="boil-2">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="boil-3">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
