import BannerSection from "@/components/HomeComponents/BannerSection";
import Products from "@/components/HomeComponents/products/Products";
import OurFeatures from "@/components/HomeComponents/OurFeatures";
import { getAllProduct } from "@/actions/product.action";

export default async function HomePage() {
  const product = await getAllProduct();

  return (
    <main>
      <BannerSection />
      <OurFeatures />
      {product.data ? (
        <Products products={product.data || []} />
      ) : (
        <>message:{product.message || product}</>
      )}
    </main>
  );
}
