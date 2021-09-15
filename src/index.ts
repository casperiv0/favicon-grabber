import { fetchIcons } from "./lib/grabber";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

globalThis.DEFAULT_CONFIG = {
  redirect: "follow",
  headers: {
    Accept: "*/*",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36",
  },
};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const requestURL = new URL(request.url);

  const queryURL = requestURL.searchParams.get("url");

  if (!queryURL) {
    const error = { status: "error", error: "`url` is a required field." };

    return new Response(JSON.stringify(error), {
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      status: 400,
    });
  }

  const data = await fetchIcons(queryURL);
  const icons = data.flat(Infinity);

  return new Response(JSON.stringify(icons), {
    headers: {
      "Content-Type": "application/json",
      // cache results for 1 hour
      "Cache-Control": "public, max-age=3600",
      ...CORS_HEADERS,
    },
  });
}
