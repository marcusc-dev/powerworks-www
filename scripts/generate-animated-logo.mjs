import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'public', 'POWERWORKS-LOGO.svg');
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Extract the SVG header
const headerMatch = svgContent.match(/<svg[^>]*>/);
const svgHeader = headerMatch ? headerMatch[0] : '<svg>';

// Extract all path groups
const pathGroups = svgContent.match(/<g><path[^>]*\/><\/g>/g) || [];

// Define color patterns
const pistonRedColors = /^#c[abcdef][0-9a-f]{4}$/i;
const pistonPinkColors = /^#d[0-9a-f]{5}$/i;
const pistonLightColors = /^#e[0-9a-f]{5}$/i;
const wheelBlueColors = /^#[2-4][0-9a-f]{5}$/i;

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
  
  // Piston: Red-ish colors in upper-right area (x > 750, y < 320)
  const isPistonColor = fillLower.startsWith('#cc') || fillLower.startsWith('#cd') || 
                        fillLower.startsWith('#cb') || fillLower.startsWith('#ca') ||
                        fillLower.startsWith('#ce') || fillLower.startsWith('#d') ||
                        fillLower.startsWith('#e');
  const isPistonArea = x > 750 && y < 320;
  
  // Wheel: Blue colors in center area
  const isWheelColor = fillLower.startsWith('#21') || fillLower.startsWith('#22') || 
                       fillLower.startsWith('#23') || fillLower.startsWith('#24') ||
                       fillLower.startsWith('#25') || fillLower.startsWith('#26') ||
                       fillLower.startsWith('#27') || fillLower.startsWith('#28') ||
                       fillLower.startsWith('#29') || fillLower.startsWith('#2a') ||
                       fillLower.startsWith('#2b') || fillLower.startsWith('#2c') ||
                       fillLower.startsWith('#2d') || fillLower.startsWith('#2e') ||
                       fillLower.startsWith('#2f') || fillLower.startsWith('#30') ||
                       fillLower.startsWith('#31') || fillLower.startsWith('#32') ||
                       fillLower.startsWith('#33') || fillLower.startsWith('#34') ||
                       fillLower.startsWith('#35') || fillLower.startsWith('#36') ||
                       fillLower.startsWith('#37') || fillLower.startsWith('#38') ||
                       fillLower.startsWith('#39') || fillLower.startsWith('#3a') ||
                       fillLower.startsWith('#3b') || fillLower.startsWith('#3c') ||
                       fillLower.startsWith('#3d') || fillLower.startsWith('#3e') ||
                       fillLower.startsWith('#3f') || fillLower.startsWith('#40') ||
                       fillLower.startsWith('#41') || fillLower.startsWith('#42') ||
                       fillLower.startsWith('#43') || fillLower.startsWith('#44') ||
                       fillLower.startsWith('#45') || fillLower.startsWith('#46') ||
                       fillLower.startsWith('#47') || fillLower.startsWith('#48') ||
                       fillLower.startsWith('#49') || fillLower.startsWith('#4a') ||
                       fillLower.startsWith('#4b') || fillLower.startsWith('#4c') ||
                       fillLower.startsWith('#4d') || fillLower.startsWith('#4e') ||
                       fillLower.startsWith('#4f');
  const isWheelArea = x > 400 && x < 720 && y > 380 && y < 680;
  
  if (isPistonColor && isPistonArea) {
    pistonPaths.push(pg);
  } else if (isWheelColor && isWheelArea) {
    wheelPaths.push(pg);
  } else {
    otherPaths.push(pg);
  }
});

console.log('Piston paths:', pistonPaths.length);
console.log('Wheel paths:', wheelPaths.length);
console.log('Other paths:', otherPaths.length);

// Generate the grouped SVG content
const pistonGroup = `<g id="piston">\n${pistonPaths.map(p => p.replace(/<g>|<\/g>/g, '')).join('\n')}\n</g>`;
const wheelGroup = `<g id="wheel">\n${wheelPaths.map(p => p.replace(/<g>|<\/g>/g, '')).join('\n')}\n</g>`;

// Output the first few characters of each group
console.log('\n=== Piston group preview ===');
console.log(pistonGroup.substring(0, 500) + '...');

console.log('\n=== Wheel group preview ===');
console.log(wheelGroup.substring(0, 500) + '...');

// Save the restructured SVG 
const newSvg = svgContent
  .replace(/<\/svg>/, '') // Remove closing tag temporarily
  
let rebuiltSvg = svgHeader + '\n';

// Add other paths first (background, etc)
otherPaths.forEach(p => {
  rebuiltSvg += p + '\n';
});

// Add wheel group
rebuiltSvg += wheelGroup + '\n';

// Add piston group
rebuiltSvg += pistonGroup + '\n';

rebuiltSvg += '</svg>';

// Write to a new file
const outputPath = path.join(process.cwd(), 'public', 'POWERWORKS-LOGO-grouped.svg');
fs.writeFileSync(outputPath, rebuiltSvg);
console.log('\n✓ Saved grouped SVG to:', outputPath);
