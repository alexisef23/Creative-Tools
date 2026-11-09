import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PRESET_DESIGNS } from '@/utils/catalogData';
import { PresetDesign, SeriesCategory } from '@/types';

export const dynamic = 'force-dynamic';

const FOLDER_TO_CATEGORY: Record<string, Exclude<SeriesCategory, 'Todos'>> = {
  'racing series': 'Racing',
  racing: 'Racing',
  'heroes series': 'Heroes',
  heroes: 'Heroes',
  'anime series': 'Anime',
  anime: 'Anime',
  'idol series': 'Idols',
  'idols series': 'Idols',
  idols: 'Idols',
  'sport series': 'Sport',
  sport: 'Sport',
  'sci-fi series': 'Sci-Fi',
  'sci-fi': 'Sci-Fi',
  'dental humor series': 'Dental Humor',
  'dental humor': 'Dental Humor',
  'architecture & landmarks series': 'Architecture',
  'architecture series': 'Architecture',
  architecture: 'Architecture',
  'vintage & retro gaming series': 'Retro Gaming',
  'retro gaming series': 'Retro Gaming',
  'retro gaming': 'Retro Gaming',
  'animals & spirit series': 'Animals',
  'animals series': 'Animals',
  animals: 'Animals',
};

const SERIES_PREFIX: Record<Exclude<SeriesCategory, 'Todos'>, string> = {
  Racing: 'RAC',
  Heroes: 'HER',
  Anime: 'ANI',
  Idols: 'IDL',
  Sport: 'SPT',
  'Sci-Fi': 'SCI',
  'Dental Humor': 'DEN',
  Architecture: 'ARC',
  'Retro Gaming': 'RET',
  Animals: 'ANM',
};

const SERIES_DEFAULT_COLOR: Record<Exclude<SeriesCategory, 'Todos'>, string> = {
  Racing: 'ruby-red',
  Heroes: 'royal-blue',
  Anime: 'emerald-green',
  Idols: 'cyber-purple',
  Sport: 'matte-black',
  'Sci-Fi': 'matte-black',
  'Dental Humor': 'emerald-green',
  Architecture: 'anodized-gold',
  'Retro Gaming': 'cyber-purple',
  Animals: 'anodized-gold',
};

export async function GET() {
  try {
    const rootDir = process.cwd();
    const sourceCatalogDir = path.join(rootDir, 'Catalogo');
    const publicCatalogDir = path.join(rootDir, 'public', 'Catalogo');

    const discoveredExtras: PresetDesign[] = [];

    if (fs.existsSync(sourceCatalogDir)) {
      if (!fs.existsSync(publicCatalogDir)) {
        fs.mkdirSync(publicCatalogDir, { recursive: true });
      }

      const knownUrls = new Set(
        PRESET_DESIGNS.map((p) =>
          p.imageUrl ? decodeURIComponent(p.imageUrl).toLowerCase() : ''
        ).filter(Boolean)
      );

      const entries = fs.readdirSync(sourceCatalogDir, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const folderName = entry.name;
        const srcFolder = path.join(sourceCatalogDir, folderName);
        const destFolder = path.join(publicCatalogDir, folderName);

        if (!fs.existsSync(destFolder)) {
          fs.mkdirSync(destFolder, { recursive: true });
        }

        const normFolder = folderName.trim().toLowerCase();
        const matchedCategory: Exclude<SeriesCategory, 'Todos'> =
          FOLDER_TO_CATEGORY[normFolder] || 'Anime';

        const files = fs.readdirSync(srcFolder);
        let extraIndex =
          PRESET_DESIGNS.filter((d) => d.category === matchedCategory).length +
          1;

        for (const fileName of files) {
          if (!/\.(png|jpe?g|webp|svg)$/i.test(fileName)) continue;

          const srcFile = path.join(srcFolder, fileName);
          const destFile = path.join(destFolder, fileName);

          // Sync new or updated file into public/Catalogo so Next.js serves it immediately
          if (
            !fs.existsSync(destFile) ||
            fs.statSync(srcFile).mtimeMs > fs.statSync(destFile).mtimeMs
          ) {
            fs.copyFileSync(srcFile, destFile);
          }

          const rawUrl = `/Catalogo/${folderName}/${fileName}`.toLowerCase();
          if (!knownUrls.has(rawUrl)) {
            const encodedUrl = `/Catalogo/${encodeURIComponent(
              folderName
            )}/${encodeURIComponent(fileName)}`;
            const cleanBaseName = fileName
              .replace(/\.(png|jpe?g|webp|svg)$/i, '')
              .replace(
                /Neutral Beige Grid Photo Collage Jewelry Product Instagram Post/i,
                `Diseño ${matchedCategory}`
              )
              .replace(/[_-]+/g, ' ')
              .trim();

            const prefix = SERIES_PREFIX[matchedCategory] || 'CAT';
            const code = `${prefix}-${String(extraIndex).padStart(2, '0')}`;
            extraIndex++;

            discoveredExtras.push({
              id: `auto-${matchedCategory.toLowerCase()}-${code.toLowerCase()}-${fileName
                .replace(/[^a-z0-9]/gi, '')
                .slice(0, 10)}`,
              code,
              title: cleanBaseName || `Diseño ${code}`,
              category: matchedCategory,
              description: `Lámina oficial sincronizada desde carpeta ${folderName}.`,
              imageUrl: encodedUrl,
              recommendedColorId: SERIES_DEFAULT_COLOR[matchedCategory],
            });
          }
        }
      }
    }

    return NextResponse.json({
      totalCurated: PRESET_DESIGNS.length,
      discoveredCount: discoveredExtras.length,
      discoveredExtras,
    });
  } catch (err) {
    return NextResponse.json(
      {
        totalCurated: PRESET_DESIGNS.length,
        discoveredCount: 0,
        discoveredExtras: [],
        error: String(err),
      },
      { status: 200 }
    );
  }
}

