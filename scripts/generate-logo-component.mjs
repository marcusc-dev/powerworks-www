import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'public', 'POWERWORKS-LOGO.svg');
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Extract all path groups
const pathGroups = svgContent.match(/<g><path[^>]*\/><\/g>/g) || [];

// Helper to extract fill and coordinates from a path
function getPathInfo(pathStr) {
  const fillMatch = pathStr.match(/fill="([^"]+)"/);
  const coordMatch = pathStr.match(/d="M ([0-9.]+),([0-9.]+)/);
  if (fillMatch && coordMatch) {
    return {
      fill: fillMatch[1],
      x: parseFloat(coordMatch[1]),
      y: parseFloat(coordMatch[2])
    };
  }
  return null;
}

// Convert SVG style to React-compatible format
function convertToReact(pathStr) {
  // Remove <g> wrapper
  let result = pathStr.replace(/<g>|<\/g>/g, '');
  // Convert style="opacity:1" to style={{ opacity: 1 }}
  result = result.replace(/style="opacity:1"/g, 'style={{ opacity: 1 }}');
  // Convert self-closing tag to proper JSX
  result = result.replace(/\/>$/, ' />');
  return result;
}

// Categorize paths
const pistonPaths = [];
const wheelPaths = [];
const otherPaths = [];

pathGroups.forEach(pg => {
  const info = getPathInfo(pg);
  if (!info) {
    otherPaths.push(pg);
    return;
  }
  
  const { fill, x, y } = info;
  const fillLower = fill.toLowerCase();
  
  // Piston: Red-ish colors in upper-right area
  const isPistonColor = fillLower.startsWith('#cc') || fillLower.startsWith('#cd') || 
                        fillLower.startsWith('#cb') || fillLower.startsWith('#ca') ||
                        fillLower.startsWith('#ce') || fillLower.startsWith('#d') ||
                        fillLower.startsWith('#e');
  const isPistonArea = x > 750 && y < 320;
  
  // Wheel: Blue colors in center area  
  const isWheelColor = /^#[2-4][0-9a-f]{5}$/i.test(fillLower);
  const isWheelArea = x > 400 && x < 720 && y > 380 && y < 680;
  
  if (isPistonColor && isPistonArea) {
    pistonPaths.push(pg);
  } else if (isWheelColor && isWheelArea) {
    wheelPaths.push(pg);
  } else {
    otherPaths.push(pg);
  }
});

// Build the grouped paths with React-compatible syntax
const otherPathsJsx = otherPaths.map(convertToReact).join('\n          ');
const wheelPathsJsx = wheelPaths.map(convertToReact).join('\n            ');
const pistonPathsJsx = pistonPaths.map(convertToReact).join('\n            ');

// Generate the component
const componentContent = `'use client';

import React from 'react';
import styles from './PowerworksLogoAnimated.module.css';

interface PowerworksLogoAnimatedProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const PowerworksLogoAnimated: React.FC<PowerworksLogoAnimatedProps> = ({
  className = '',
  width = 200,
  height = 'auto'
}) => {
  return (
    <div className={\`\${styles.logo} \${className}\`} style={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 972"
        style={{
          shapeRendering: 'geometricPrecision',
          textRendering: 'geometricPrecision',
          fillRule: 'evenodd',
          clipRule: 'evenodd'
        }}
      >
        {/* Background and static elements */}
        ${otherPathsJsx}
        
        {/* Wheel group - rotates on hover */}
        <g id="wheel" className={styles.wheel}>
          ${wheelPathsJsx}
        </g>
        
        {/* Piston group - pumps on hover */}
        <g id="piston" className={styles.piston}>
          ${pistonPathsJsx}
        </g>
      </svg>
    </div>
  );
};

export default PowerworksLogoAnimated;
`;

// Write the component
const componentPath = path.join(process.cwd(), 'components', 'PowerworksLogoAnimated.tsx');
fs.writeFileSync(componentPath, componentContent);
console.log('✓ Generated component:', componentPath);
console.log('  - Other paths:', otherPaths.length);
console.log('  - Wheel paths:', wheelPaths.length);
console.log('  - Piston paths:', pistonPaths.length);
