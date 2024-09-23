/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addItemToCart } from "@/redux/slices/addToCart.slice";
import useLoginStore from "@/components/hooks/useLoginStore";
import { toast } from "sonner";

export default function SingleProduct({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { onOpen } = useLoginStore();
  const user = false; // delete it

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Simulate a short delay to show the loading spinner after the refresh or navigation
    setTimeout(() => {
      setLoading(false);
    }, 100); // Adjust this time as needed
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace this with a spinner or custom loading component
  }
  if (!product) {
    return <div>loading.....</div>;
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + amount, product.stock)));
  };

  const handleAddToCart = (product: any) => {
    if (!user) {
      toast.warning("You have to login first");
      onOpen();
      return;
    }
    dispatch(addItemToCart({ ...product, quantity: quantity }));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-start justify-center py-8 px-">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 p-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.photo}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg w-full h-full"
                />
                <Badge className="absolute top-4 left-4 bg-black/75 text-white">
                  New Arrival
                </Badge>
              </div>
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                  Category: {product.category}
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    (121 reviews)
                  </span>
                </div>
                <p className="text-gray-700 mb-6">{product.description}</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span
                    className={`text-sm ${
                      product.stock > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock} available)`
                      : "Out of Stock"}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity === 1}
                  >
                    -
                  </Button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity === product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-5 w-5" /> Wishlist
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-5 w-5" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
