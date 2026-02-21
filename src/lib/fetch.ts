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

// export async function fetchProducts({
//   limit,
// }: {
//   limit?: number;
// }): Promise<Product[]> {
//   try {
//     const res = await fetch("https://fakestoreapi.com/products", {
//       next: { revalidate: 30 },
//     });
//     if (!res.ok) throw new Error("Failed to fetch products");
//     console.log(res.status);
//     console.log(res.ok);
//     const data = await res.json();
//     return limit ? data.slice(1, limit) : data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }

export async function fetchProducts({ limit }: { limit?: number }) {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error("Status:", res.status);
      return [];
    }

    const text = await res.text();

    if (!text) {
      console.error("Empty response body");
      return [];
    }

    const data = JSON.parse(text);

    return limit ? data.slice(1, limit) : data;
  } catch (err) {
    console.error("FETCH FAILED:", err);
    return [];
  }
}
