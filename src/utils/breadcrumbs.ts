const labels: Record<string, string> = {
  "about-depot-heights": "About Depot Heights",
  amenities: "Amenities",
  cafes: "Cafés",
  healthcare: "Healthcare",
  "history-of-depot-road": "History of Depot Road",
  "living-around-depot-heights": "Living Around Depot Heights",
  "local-food": "Local Food",
  location: "Location",
  "parks-pcn": "Parks & PCN",
  restaurants: "Restaurants",
  "retail-shopping": "Retail & Shopping",
  "schools-education": "Schools & Education",
  search: "Search",
  sitemap: "Sitemap",
  "sports-recreation": "Sports & Recreation",
  transport: "Transport",
};

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbs(
  pathname: string,
  siteUrl: URL,
  currentPageUrl = new URL(pathname, siteUrl).href,
): BreadcrumbItem[] {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/") {
    return [];
  }

  const slug = normalizedPath.split("/").filter(Boolean).at(-1) ?? "";
  const name =
    labels[slug] ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return [
    { name: "Home", url: new URL("/", siteUrl).href },
    { name, url: currentPageUrl },
  ];
}
