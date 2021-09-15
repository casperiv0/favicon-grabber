import { Icon } from "../../types/Icon";

export async function grabFavicon(baseURL: string): Promise<Icon[]> {
  try {
    const url = new URL("/favicon.ico", baseURL).href;
    const reqOptions = {
      method: "HEAD",
      ...DEFAULT_CONFIG,
    };

    const res = await fetch(url, reqOptions);

    if (res.status !== 200) {
      return [];
    }

    const CTHeader = res.headers.get("content-length") ?? "";
    if (parseInt(CTHeader, 10) > 0) {
      return [];
    }

    return [
      {
        src: url,
        type: "image/x-icon",
        sizes: "",
      },
    ];
  } catch {
    return [];
  }
}
