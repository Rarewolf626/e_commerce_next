/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckIcon, CrossIcon, EyeIcon, Heart } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItemToCart } from "@/redux/slices/addToCart.slice";
import useLoginStore from "@/components/hooks/useLoginStore";
import { toast } from "sonner";
import Link from "next/link";

type TProduct = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  photo: any;
};

type TProductCard = {
  product: TProduct;
};

const ProductCard = ({ product }: TProductCard) => {
  const dispatch = useAppDispatch();
  const lovedProducts = useAppSelector((state) => state.cart.lovedProducts);
  const user = true; // delete it
  const { onOpen } = useLoginStore();
  const handleAddToCart = (product: TProduct) => {
    // if user not  logged in open login modal with toast message
    if (!user) {
      toast.warning("Your have login first");
      onOpen();
      return;
    }
    //  logged user can add product to the cart
    dispatch(addItemToCart({ ...product, quantity: 1 }));
  };

  return (
    <div
      key={product._id}
      className="relative overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl group"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={product.photo}
          alt={product.name}
          width={500}
          height={500}
          className="object-cover w-full h-full object-center"
          loading="lazy"
        />
        <button
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-50 rounded-full transition-colors duration-300 z-10"
          onClick={() => handleAddToCart(product)}
        >
          <Heart
            className={`w-6 h-6 ${
              lovedProducts.includes(product._id)
                ? "text-green-700 fill-green-700"
                : null
            } `}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          {product.stock > 0 ? (
            <p className="text-sm text-green-600 flex items-center">
              <CheckIcon className="w-4 h-4 mr-1" /> In Stock
            </p>
          ) : (
            <p className="text-sm text-red-600 flex items-center">
              <CrossIcon className="w-4 h-4 mr-1" /> Out of Stock
            </p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 h-[45%]">
        <p className="text-sm leading-relaxed line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-end mt-2">
          <EyeIcon className="w-5 h-5 text-white" />
          <Link
            href={`/product/${product._id}`}
            className="ml-1 text-sm cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
