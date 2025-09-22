import Link from "next/link";
import { Product } from "../../sanity.types";
import Image from "next/image";
import ImageUrl from "@/lib/image-url";

const ProductThumb = ({ product }: { product: Product }) => {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border-gray-200 shadow-sm hover:shadow-md transiton-all duration-200 overflow-hidden 
        w-full
        ${isOutOfStock ? "opacity-50" : "opacity-100"}`}
    >
      <div className="relative aspect-square rounded-sm w-full h-[200px] md:h-[225px] lg:h-[250px] overflow-hidden">
        {product.image && (
          <Image
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            src={ImageUrl(product.image).url()}
            alt={product.name || `${product.slug?.current} image`}
            fill
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <span className="text-white font-bold text-lg">Out of stock</span>
          </div>
        )}
      </div>

      <div className="">
        <h2 className="text-gray-700 text-lg font-semibold truncate">
          {product.name}
        </h2>

        <p>
          {product.description?.map((block) =>
            block._type === "block"
              ?
              block.children?.map((child) => child.text).join("")
              : ""
          ).join(" ") || "no description available"}
        </p>
      </div>


    </Link>
  );
};

export default ProductThumb;
