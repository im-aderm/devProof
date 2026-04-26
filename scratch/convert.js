const fs = require('fs');

let html = fs.readFileSync('html-starter/analyzed.html', 'utf8');

// Basic HTML to JSX conversions
html = html.replace(/class=/g, 'className=');
html = html.replace(/viewbox=/gi, 'viewBox=');
html = html.replace(/stroke-width=/g, 'strokeWidth=');
html = html.replace(/stroke-dasharray=/g, 'strokeDasharray=');
html = html.replace(/stroke-dashoffset=/g, 'strokeDashoffset=');
html = html.replace(/<!--/g, '{/*');
html = html.replace(/-->/g, '*/}');
html = html.replace(/<img([^>]+)>/g, '<img$1 />');
html = html.replace(/<input([^>]+)>/g, '<input$1 />');

// Remove head, script, and style tags
const bodyStart = html.indexOf('<body');
const bodyEnd = html.indexOf('</body>');
html = html.substring(bodyStart, bodyEnd + 7);

fs.writeFileSync('scratch/jsx_template.tsx', html);
console.log("Converted!");
