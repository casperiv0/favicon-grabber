import cheerio from "cheerio";
import { grabFavicon } from "./grabbers/favicon";
import { links } from "./grabbers/links";
import { grabManifest } from "./grabbers/manifest";

export async function fetchIcons(url: string) {
  const fullURL = new URL(url);
  const baseURL = `${fullURL.protocol}//${fullURL.hostname}`;

  const res = await fetch(baseURL, DEFAULT_CONFIG);
  const text = await res.text();

  const $ = cheerio.load(text, {
    lowerCaseTags: true,
    lowerCaseAttributeNames: true,
  });

  const icons = links($);

  const data = await Promise.all([grabFavicon(baseURL), grabManifest($, baseURL)]);

  return [...icons, ...data];
}
