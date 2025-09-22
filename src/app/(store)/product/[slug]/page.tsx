import { notFound } from "next/navigation";
import { getProductBySlug } from "@/sanity/lib/products/get-product-by-slug";
import Image from "next/image";
import ImageUrl from "@/lib/image-url";
import { PortableText } from "next-sanity";
import AddToCartButton from "@/components/add-to-cart";
const ProductPage = async ({ params }:
    {
        params: Promise<{
            slug: string
        }>
    }) => {
    const { slug } = await params;
    let product;

    try {
        product = await getProductBySlug(slug);
    } catch (error) {
        console.error(error)
        return (
            <div className="rounded-lg shadow-lg border-[1px] mt-6 mx-4 flex flex-col justify-center items-center p-4 py-6 lg:w-[80%] lg:mx-auto text-red-500">
                <p className="font-semibold text-[1.3rem]">An error occurred while getting product</p>
                <p>Please check your network connection and try again.</p>
            </div>
        )
    }

    if (!product) {
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

    return (
        <div>
            <div className="">
                {product.image && (
                    <div className={`relative aspect-square overflow-hidden h-[300px] w-full rounded-sm shadow-lg ${isOutOfStock && "opacity-50"}`}>
                        <Image
                            src={ImageUrl(product.image).url()}
                            alt={product.name ?? "product image"}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                )}

                {/* {isOutOfStock && (
                    <div className="">
                        <p>Out of stock</p>
                    </div>
                )} */}

                <div className="">
                    <h1>{product.name}</h1>
                    <p>${product.price?.toFixed(2)}</p>

                    {/* <div className="prose">  */}
                    <div> 
                        {Array.isArray(product.description) && (
                            <PortableText value={product.description} />
                        )}
                    </div>
                </div>
            </div>

            <AddToCartButton product={product} disabled={isOutOfStock} />
        </div>
    );
}

export default ProductPage;