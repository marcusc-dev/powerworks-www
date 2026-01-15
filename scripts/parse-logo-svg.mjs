import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'public', 'POWERWORKS-LOGO.svg');
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Extract all paths with their fill colors and first coordinate
const pathRegex = /<g><path[^>]*fill="([^"]+)"[^>]*d="M ([0-9.]+),([0-9.]+)[^"]*"[^>]*\/><\/g>/g;

const paths = [];
let match;
while ((match = pathRegex.exec(svgContent)) !== null) {
  const fill = match[1];
  const x = parseFloat(match[2]);
  const y = parseFloat(match[3]);
  paths.push({ fill, x, y, fullMatch: match[0] });
}

// Red piston colors that are clearly mechanical parts
const redColors = ['#cc', '#cd', '#cb', '#ca', '#ce', '#cf', '#c0', '#c1', '#c2', '#c3', '#c4', '#c5', '#c6', '#c7', '#c8', '#c9'];
const pistonPaths = paths.filter(p => {
  const fillLower = p.fill.toLowerCase();
  // Red-ish colors (piston) in upper-right quadrant  
  return (fillLower.startsWith('#cc') || fillLower.startsWith('#cd') || fillLower.startsWith('#cb') || fillLower.startsWith('#ca') || fillLower.startsWith('#d') || fillLower.startsWith('#e')) &&
         p.x > 750 && p.y < 320;
});

// Wheel paths - the circular tire area (dark blue)
const wheelPaths = paths.filter(p => {
  const fillLower = p.fill.toLowerCase();
  // Dark blue colors
  return (fillLower.startsWith('#21') || fillLower.startsWith('#22') || fillLower.startsWith('#23') || 
          fillLower.startsWith('#24') || fillLower.startsWith('#25') || fillLower.startsWith('#26') ||
          fillLower.startsWith('#27') || fillLower.startsWith('#28') || fillLower.startsWith('#29') ||
          fillLower.startsWith('#2a') || fillLower.startsWith('#2b') || fillLower.startsWith('#2c') ||
          fillLower.startsWith('#2d') || fillLower.startsWith('#2e') || fillLower.startsWith('#2f') ||
          fillLower.startsWith('#30') || fillLower.startsWith('#31') || fillLower.startsWith('#32') ||
          fillLower.startsWith('#33') || fillLower.startsWith('#34') || fillLower.startsWith('#35') ||
          fillLower.startsWith('#36') || fillLower.startsWith('#37') || fillLower.startsWith('#38') ||
          fillLower.startsWith('#39') || fillLower.startsWith('#3a') || fillLower.startsWith('#3b') ||
          fillLower.startsWith('#3c') || fillLower.startsWith('#3d') || fillLower.startsWith('#3e') ||
          fillLower.startsWith('#3f') || fillLower.startsWith('#40') || fillLower.startsWith('#41') ||
          fillLower.startsWith('#42') || fillLower.startsWith('#43') || fillLower.startsWith('#44') ||
          fillLower.startsWith('#45') || fillLower.startsWith('#46') || fillLower.startsWith('#47') ||
          fillLower.startsWith('#48') || fillLower.startsWith('#49') || fillLower.startsWith('#4a') ||
          fillLower.startsWith('#4b') || fillLower.startsWith('#4c') || fillLower.startsWith('#4d') ||
          fillLower.startsWith('#4e') || fillLower.startsWith('#4f')) &&
         p.x > 400 && p.x < 700 &&
         p.y > 400 && p.y < 680;
});

console.log('Total paths:', paths.length);
console.log('Piston paths (top-right):', pistonPaths.length);
console.log('Wheel paths (center):', wheelPaths.length);

console.log('\n=== Piston colors found ===');
const pistonColors = [...new Set(pistonPaths.map(p => p.fill))];
console.log(pistonColors.join(', '));

console.log('\n=== Wheel colors found ===');
const wheelColors = [...new Set(wheelPaths.map(p => p.fill))];
console.log(wheelColors.join(', '));
