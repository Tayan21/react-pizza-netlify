import { TCartItem } from "../Redux/slices/cartSlice";

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
}