import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RoughBoxProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
  type?: 'rectangle' | 'ellipse' | 'circle' | 'polygon';
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'sunburst' | 'dashed' | 'zigzag-line';
  padding?: number;
}

export function RoughBox({
  children,
  className,
  type = 'rectangle',
  fill = 'transparent',
  stroke = '#1A1A1A',
  strokeWidth = 1.5,
  roughness = 1.5,
  bowing = 1,
  fillStyle = 'hachure',
  padding = 0,
  ...props
}: RoughBoxProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = svgRef.current;
    const container = containerRef.current;
    const rc = rough.svg(svg);

    const draw = () => {
      // Clear previous
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      // Adjust for padding
      const w = width + padding * 2;
      const h = height + padding * 2;
      
      svg.setAttribute('width', `${w}`);
      svg.setAttribute('height', `${h}`);
      svg.style.left = `-${padding}px`;
      svg.style.top = `-${padding}px`;

      let node;
      const options = {
        fill,
        stroke,
        strokeWidth,
        roughness,
        bowing,
        fillStyle,
      };

      if (type === 'rectangle') {
        node = rc.rectangle(0, 0, w, h, options);
      } else if (type === 'ellipse') {
        node = rc.ellipse(w / 2, h / 2, w, h, options);
      } else if (type === 'circle') {
        const diameter = Math.max(w, h);
        node = rc.circle(w / 2, h / 2, diameter, options);
      }

      if (node) {
        svg.appendChild(node);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      draw();
    });

    resizeObserver.observe(container);
    
    // Initial draw
    draw();

    return () => {
      resizeObserver.disconnect();
    };
  }, [type, fill, stroke, strokeWidth, roughness, bowing, fillStyle, padding, children]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)} {...props}>
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 pointer-events-none boiling"
        style={{ zIndex: -1 }}
      />
      {children}
    </div>
  );
}
