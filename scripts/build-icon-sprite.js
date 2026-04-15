/**
 * Собирает SVG-спрайт из всех icon-<name>.svg в public/icons.
 * Результат: public/icons/sprite.svg
 * Запуск: node scripts/build-icon-sprite.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = path.resolve(__dirname, '..', 'public', 'icons');
const SPRITE_FILE = path.join(ICONS_DIR, 'sprite.svg');

const ICON_FILE_REGEX = /^icon-(.+)\.svg$/;

function getViewBox(svgContent) {
    const match = svgContent.match(/viewBox\s*=\s*["']([^"']+)["']/i);
    if (match) return match[1].trim();
    const w = svgContent.match(/\bwidth\s*=\s*["']([^"']+)["']/i)?.[1];
    const h = svgContent.match(/\bheight\s*=\s*["']([^"']+)["']/i)?.[1];
    if (w != null && h != null) return `0 0 ${w} ${h}`;
    return '0 0 24 24';
}

function getInnerContent(svgContent) {
    const openTag = svgContent.match(/<svg[\s>]/i);
    if (!openTag) return svgContent;
    const openEnd = svgContent.indexOf('>', svgContent.indexOf('<svg'));
    const lastClose = svgContent.lastIndexOf('</svg>');
    if (openEnd === -1 || lastClose === -1) return svgContent;
    return svgContent.slice(openEnd + 1, lastClose).trim();
}

function uniquifyIds(inner, symbolId) {
    const prefix = `${symbolId}__`;
    let out = inner;
    // id="..." -> id="prefix..."
    out = out.replace(/\bid\s*=\s*["']([^"']+)["']/gi, (_, id) => `id="${prefix}${id}"`);
    // url(#...) -> url(#prefix...)
    out = out.replace(/\burl\s*\(\s*#([^)]+)\s*\)/g, (_, ref) => `url(#${prefix}${ref})`);
    return out;
}

function buildSymbol(filename, name, content) {
    const viewBox = getViewBox(content);
    let inner = getInnerContent(content);
    inner = uniquifyIds(inner, name);
    return `  <symbol id="${name}" viewBox="${viewBox}">\n${inner}\n  </symbol>`;
}

function main() {
    const files = fs.readdirSync(ICONS_DIR);
    const iconFiles = files.filter(f => ICON_FILE_REGEX.test(f)).sort((a, b) => a.localeCompare(b));

    if (iconFiles.length === 0) {
        console.warn('scripts/build-icon-sprite.js: в public/icons нет файлов icon-*.svg');
        return;
    }

    const symbols = [];
    for (const file of iconFiles) {
        const name = file.replace(ICON_FILE_REGEX, '$1');
        const filePath = path.join(ICONS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        symbols.push(buildSymbol(file, name, content));
    }

    const sprite = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none" aria-hidden="true">
${symbols.join('\n')}
</svg>
`;

    fs.writeFileSync(SPRITE_FILE, sprite, 'utf8');
    console.log(
        `Sprite: ${SPRITE_FILE} (${iconFiles.length} icons: ${iconFiles.map(f => f.replace(ICON_FILE_REGEX, '$1')).join(', ')})`
    );
}

main();
