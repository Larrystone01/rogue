export type BaseProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
};

export type ShopProducts = {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: {
    id: number;
    name: string;
    image: string;
  };
  categoryId?: number;
  images?: string[];
  slug?: string;
  creationAt?: string;
  updatedAt?: string;
  categoryString?: string;
};

export async function fetchShop(): Promise<ShopProducts[]> {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!res.ok) throw new Error("Fail to fetch products");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch", error);
    return [];
  }
}
