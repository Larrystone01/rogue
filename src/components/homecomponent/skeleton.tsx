export default function Skeleton() {
  return (
    <>
      {/* Product grid skeleton */}
      <div className="product-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            className="product-card flex flex-col w-full max-w-full sm:min-w-70"
            key={idx}
          >
            {/* Image skeleton */}
            <div className="product-image py-6 px-3 w-full flex items-center justify-center mb-4 animate-pulse">
              <div className="relative h-80 w-60 bg-gray-300 animate-pulse"></div>
            </div>

            {/* Details skeleton */}
            <div className="product-details">
              <div className="title-price flex justify-between">
                <div className="h-4 w-32 bg-gray-300 animate-pulse"></div>
                <div className="h-4 w-10 bg-gray-300 animate-pulse"></div>
              </div>
              <div className="h-3 w-16 bg-gray-300 animate-pulse mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
