import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  calculateTotal,
  removeItemFromCart,
  decreaseQuantityReducer,
  increaseQuantityReducer,
} from "@/redux/slices/addToCart.slice";
import { useEffect } from "react";

const CartSheetContent = () => {
  const CartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.cart.total);

  const removeFromCart = (productId: string) => {
    dispatch(removeItemFromCart({ id: productId }));
  };

  const increaseQuantity = (productId: string) => {
    dispatch(increaseQuantityReducer({ id: productId }));
  };
  const decreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantityReducer({ id: productId }));
  };

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, CartItems]);

  return (
    <SheetContent className="flex flex-col w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>My Cart</SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto py-6">
        {CartItems.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Your cart is empty
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {CartItems.map((item) => (
              <li key={item._id} className="flex py-6 items-center">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover "
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col ">
                  <div className=" flex flex-col gap-3">
                    <div className="flex justify-between text-base font-medium text-gray-900 items-center">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${item?.price.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 min-w-[150px] ">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decreaseQuantity(item._id)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center justify-center border rounded-md w-12 h-8">
                          {item.quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => increaseQuantity(item._id)}
                          className="h-8 w-8"
                          disabled={item.quantity === item.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item._id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SheetFooter className="border-t border-gray-200">
        <div className="space-y-4 py-6 w-full">
          <div className="flex items-center justify-between text-base font-medium">
            <p>Subtotal</p>
            <p>{total}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Button className="w-full" size="lg">
              Checkout
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <button
              type="button"
              className="font-medium text-primary hover:text-primary/80"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>
      </SheetFooter>
    </SheetContent>
  );
};
export default CartSheetContent;
