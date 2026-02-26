import { currentUser } from "@/app/(auth)/lib/auth";
import getFormattedUser from "@/hooks/prisma/get-user";
import { CartClient } from "./_components/cart-client";

const CartPage = async () => {
  const user = await currentUser();
  const dbUser = await getFormattedUser(user?.id ? user.id : "");
  return (
    <div className="flex h-full w-full justify-center">
      <CartClient user={dbUser} />
    </div>
  );
};

export default CartPage;
