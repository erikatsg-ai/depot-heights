import type { APIRoute } from "astro";

const siteUrl = "https://depot-heights.vercel.app";
const feedItems = [
  { title: "Depot Heights in Depot Road Bukit Merah Town", path: "/" },
  { title: "About Depot Heights HDB Estate", path: "/about-depot-heights/" },
  {
    title: "Depot Heights Amenities | Nature Parks & Facilities",
    path: "/amenities/",
  },
  { title: "Best Cafes near Depot Heights", path: "/cafes/" },
  { title: "Healthcare Close to Home", path: "/healthcare/" },
  { title: "History of Depot Heights", path: "/history-of-depot-road/" },
  {
    title: "Living Around Depot Heights",
    path: "/living-around-depot-heights/",
  },
  { title: "Good local food", path: "/local-food/" },
  { title: "Location of Depot Heights", path: "/location/" },
  {
    title: "Five Nature Parks, Two PCNs and a Rail Corridor",
    path: "/parks-pcn/",
  },
  { title: "Restaurants near Depot Heights", path: "/restaurants/" },
  {
    title: "Retail and Shopping near Depot Heights",
    path: "/retail-shopping/",
  },
  { title: "Schools near depot heights", path: "/schools-education/" },
  {
    title: "Sports and Recreation near Depot Heights",
    path: "/sports-recreation/",
  },
  { title: "Public Transport near Depot Heights", path: "/transport/" },
];

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const prerender = true;

export const GET: APIRoute = () => {
  const items = feedItems
    .map(({ title, path }) => {
      const url = new URL(path, siteUrl).href;
      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Depot Heights</title>
    <link>${siteUrl}/</link>
    <description>Pages and neighbourhood guides from Depot Heights, Singapore.</description>
    <language>en-sg</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
};
