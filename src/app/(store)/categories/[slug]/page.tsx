import ProductView from "@/components/product-view";
import SalesBanner from "@/components/sales-banner";
import { getAllCategories } from "@/sanity/lib/products/get-all-categories";
import { getProductsByCategory } from "@/sanity/lib/products/get-product-by-category";

const CategoryPage = async ({params}: 
    {params: Promise<{
        slug: string
    }>}
) => {
    const {slug} =  await params;
    const products = await getProductsByCategory(slug);
    const categories = await getAllCategories();

    return ( 
        <section className="">
            <SalesBanner />

            <ProductView products={products} categories={categories}/>
        </section>
     );
}
 
export default CategoryPage;