import { getSingleProduct } from "@/actions/product.action";
import SingleProduct from "@/components/HomeComponents/products/SingleProduct";

// Use the correct Next.js function `generateMetadata`
export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await getSingleProduct(params.id);

  if (res.data) {
    return {
      title: res.data.name || "Product Page",
      description: res.data.description || "Detailed product description",
    };
  } else {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const res = await getSingleProduct(params.id);

  if (!res.data) {
    return <div className="text-red-500">Error: {res.message || res}</div>;
  }

  return <SingleProduct product={res.data} />;
};

export default ProductPage;
