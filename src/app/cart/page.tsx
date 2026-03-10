import Navwrapper from "@/components/Navwrapper/NavFooter";
import ProtectedRoute from "@/components/protectedRoute";
import Cart from "@/components/cartcomponent/cart";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <Navwrapper>
        <Cart />
      </Navwrapper>
    </ProtectedRoute>
  );
}
