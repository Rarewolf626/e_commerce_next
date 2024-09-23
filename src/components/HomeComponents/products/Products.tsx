/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import ProductCard from "./ProductCard";

export default function Component({ products }: { products: any }) {
  const [visibleProducts, setVisibleProducts] = useState(4);

  const handleLoadMore = () => {
    setVisibleProducts(visibleProducts + 4);
  };

  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleProducts).map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {visibleProducts < products.length && (
          <div className="mt-8 text-center">
            <Button onClick={handleLoadMore}>Load More</Button>
          </div>
        )}
      </div>
    </section>
  );
}
