import { CheerioAPI } from "cheerio";
import { Icon } from "../../types/Icon";

const SELECTORS = [
  "link[rel='icon']",
  "link[rel='shortcut icon']",
  "link[rel='apple-touch-icon']",
  "link[rel='apple-touch-icon-precomposed']",
  "link[rel='apple-touch-startup-image']",
  "link[rel='mask-icon']",
  "link[rel='fluid-icon']",
] as const;

export function links($: CheerioAPI): Icon[] {
  const icons: Icon[] = [];

  SELECTORS.forEach((selector) => {
    $(selector).each((_, elem) => {
      const { href, sizes, type } = elem.attribs;
      if (href && href !== "#") {
        const icon = {
          sizes,
          src: href,
          type,
        };
        icons.push(icon);
      }
    });
  });

  return icons;
}
