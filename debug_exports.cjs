const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach((name) => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

console.log('Checking files for default exports...');

walkSync(srcDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        const content = fs.readFileSync(filePath, 'utf8');

        // Quick regex check for any array default exports which would break React
        if (content.match(/export\s+default\s+\[/)) {
            console.log(`[WARNING] Array default export found in ${filePath}`);
        }

        // Checking if we corrupted ContactUs.jsx or Hero.jsx
        if (content.includes('export default [')) {
            console.log(`[ERROR] Array default export found in ${filePath}`);
        }
    }
});
console.log('Check complete.');
