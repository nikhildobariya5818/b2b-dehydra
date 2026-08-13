import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { CTA, PageHero, SectionTitle } from "@/components/ui";
import { getAllProducts } from "@/lib/db-operations";

export const metadata = {
  title: "Industrial Dehydrated Food Ingredients",
  description: "Browse De'Hydra Foods' premium dehydrated potato and food ingredients for global manufacturing, private label, and export supply.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Industrial Dehydrated Food Ingredients", description: "Premium ingredients for global food manufacturing." },
};

async function getProducts() {
  try {
    return await getAllProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        compact
        eyebrow="B2B ingredient catalog"
        title="Our Product Range"
        text="Industrial ingredients developed for repeatable performance across food manufacturing, HoReCa and export distribution."
        image="/images/products-1.jpg"
      />
      <section className="section container">
        <div className="catalog-grid">
          {products.length === 0 ? (
            <p>No products available at this time.</p>
          ) : (
            products.map((p) => (
              <article className="catalog-card" key={p.id}>
                <div className="catalog-image">
                  <Image
                    src={p.imageUrl || "/images/products-2.jpg"}
                    alt={p.name}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    className="cover-image"
                  />
                  <span>{p.category}</span>
                </div>
                <div className="catalog-copy">
                  <h2>{p.name}</h2>
                  <p>{p.description}</p>
                  {p.specifications ? (
                    <ul>
                      {Object.entries(p.specifications as Record<string, any>).map(([key, value]) => (
                        <li key={key}>
                          <Icon name="check" size={17} />
                          <span>{String(key)}: {String(value)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link className="text-link" href={`/products/${p.slug}`}>
                    Technical details <Icon name="arrow" size={18} />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
      <section className="section applications">
        <div className="container">
          <SectionTitle
            center
            eyebrow="Designed for your line"
            title="Industries and applications"
          />
          <div className="application-row">
            <span>Snack manufacturing</span>
            <span>Bakery & convenience foods</span>
            <span>Seasoning blends</span>
            <span>Foodservice distribution</span>
            <span>Private label retail</span>
          </div>
        </div>
      </section>
      <CTA
        title="Need a custom bulk specification?"
        text="Share your target application, annual demand and quality parameters. Our team can develop a supply program around them."
      />
    </>
  );
}
