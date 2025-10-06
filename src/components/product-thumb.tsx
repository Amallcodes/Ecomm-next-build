import Link from "next/link";
import { Product } from "../../sanity.types";
import Image from "next/image";
import ImageUrl from "@/lib/image-url";

const ProductThumb = ({ product }: { product: Product }) => {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group relative pb-14 flex flex-col bg-[#eeeeee17] rounded-lg border-gray-200 shadow-md hover:shadow-lg transiton-all duration-200 overflow-hidden
        w-full
        ${isOutOfStock ? "opacity-50" : "opacity-100"}`} // remove bottom padding if no button
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

      <div className="p-2">
        <h2 className="text-gray-700 text-lg font-semibold truncate">
          {product.name}
        </h2>

        <p className="text-sm mb-2">
          {product.description?.map((block) =>
            block._type === "block"
              ?
              block.children?.map((child) => child.text).join("")
              : ""
          ).join(" ") || "no description available"}
        </p>

        <div className="absolute left-2 bottom-1 w-[90%] pb-1">
          <p className="font-semibold text-md  text-primary mb-1">
            ₦{product.price}
          </p>

          <button className="text-white m-auto bg-primary w-full py-1 rounded-lg">View</button>
        </div>


      </div>

    </Link>
  );
};

export default ProductThumb;
