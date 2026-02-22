import { fetchShop } from "@/lib/fetchShop";

export default async function Shop() {
  const shopProduct = await fetchShop();
  console.log(shopProduct);

  return (
    <section>
      {shopProduct.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </section>
  );
}
