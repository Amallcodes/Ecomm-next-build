import ProductView from "@/components/product-view";
import SalesBanner from "@/components/sales-banner";
import { getAllCategories } from "@/sanity/lib/products/get-all-categories";
import { getAllProducts } from "@/sanity/lib/products/get-all-products";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="">
      <section>
        <SalesBanner />
      </section>
      
      <section className="">
        <ProductView 
        products={products} 
        categories={categories} 
        />
      </section>
    </div>
  );
}
