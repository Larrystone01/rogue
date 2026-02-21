type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

type Rating = {
  rate: number;
  count: number;
};

export async function fetchProducts({
  limit,
}: {
  limit?: number;
}): Promise<Product[]> {
  console.log("Fetching products...");
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return limit ? data.slice(1, limit) : data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
