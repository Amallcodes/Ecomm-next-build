import ProductGrid from "@/components/product-grid";
import { searchProductByName } from "@/sanity/lib/products/search-products-by-name";
import React from "react";

async function SearchPage({ searchParams }
  : {
    searchParams:
    { query: string }
  }) {
  const { query } = await searchParams;
  let products;

  try {
    products = await searchProductByName(query);
  } catch (error) {
    console.error(error)

    return (
      <div className="rounded-lg shadow-lg border-[1px] mt-6 mx-4 flex flex-col justify-center items-center p-4 py-6 lg:w-[80%] lg:mx-auto text-red-500">
        <p className="font-semibold text-[1.3rem]">An error occurred while getting products</p>
        <p>Please check your network connection and try again.</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-lg shadow-lg border-[1px] flex flex-col justify-center items-center p-4 py-6 text-gray-800
      mt-6 mx-4 lg:w-[80%] lg:mx-auto
      ">
        <p className="font-semibold text-[1.3rem]">No products found for &apos;{query}&apos; </p>
        <p>Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <div>
      <section className="shadow-md rounded-lg py-4">
        <h1 className="text-blue text-[1.1rem]">Search results for {query}</h1>
      </section>

      <section className="">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}

export default SearchPage;
