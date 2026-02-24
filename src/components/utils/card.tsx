import Link from "next/link";
import Image from "next/image";

type CardGridProps<T> = {
  products: T[];
};

export default function CardGrid<T>({ products }: CardGridProps<T>) {
  function isUnknownHost(url: string) {
    const knownHosts = ["api.escuelajs.co", "i.imgur.com", "picsum.photos"];
    return !knownHosts.some((host) => url.includes(host));
  }
  return (
    <>
      <div className="product-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => {
          return (
            <Link
              href={""}
              className="product-card max-w-full sm:max-w-70 flex flex-col"
              key={product.id}
            >
              <div className="product-image bg-gray-100 px-3 py-6 w-full flex items-center justify-center mb-4">
                <div className="relative image h-80 w-60">
                  <Image
                    src={product.image || product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain"
                    unoptimized={isUnknownHost(
                      product.image || product.images[0],
                    )}
                  />
                </div>
              </div>
              <div className="product-details">
                <div className="title-price flex justify-between">
                  <h3 className="text-[0.8rem] font-normal leading-[1.8]">
                    {product.title}
                  </h3>
                  <p className="text-[0.77rem] text-gray-700">
                    ${product.price}
                  </p>
                </div>
                <p className="text-[8px] text-gray-600 uppercase tracking-[1.5px] mt-2">
                  {product.category?.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
