import { getAllFacilities } from "@/lib/db-operations";
import { PageHero } from "@/components/ui";
import { LocationsClient } from "./locations-client";

export const metadata = {
  title: "Our Locations | De'Hydra Foods",
  description: "Visit our manufacturing and distribution facilities",
};

async function getFacilities() {
  try {
    return await getAllFacilities();
  } catch (error) {
    console.error("Failed to fetch facilities:", error);
    return [];
  }
}

export default async function LocationsPage() {
  const facilities = await getFacilities();

  return (
    <>
      <PageHero
        compact
        eyebrow="Visit us"
        title="Our Facilities"
        text="De'Hydra Foods operates state-of-the-art manufacturing and distribution facilities across multiple locations."
        image="/images/about-1.jpg"
      />

      <section className="section container">
        <LocationsClient facilities={facilities} />
      </section>
    </>
  );
}
