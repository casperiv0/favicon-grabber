import { CheerioAPI } from "cheerio";
import { Icon } from "../../types/Icon";

export async function grabManifest($: CheerioAPI, baseURL: string): Promise<Icon[]> {
  try {
    // eslint-disable-next-line quotes
    const href = $('link[rel="manifest"]', "head").attr("href");
    if (!href) return [];

    const url = new URL(href, baseURL).href;

    const res = await fetch(url, DEFAULT_CONFIG);
    const text = await res.text();

    if (res.status !== 200) {
      return [];
    }

    const icons: Icon[] = [];

    const parsed = JSON.parse(text);

    if (Array.isArray(parsed.icons)) {
      parsed.icons.forEach((icon: Icon) => {
        icons.push(icon);
      });
    }

    return icons;
  } catch {
    return [];
  }
}
