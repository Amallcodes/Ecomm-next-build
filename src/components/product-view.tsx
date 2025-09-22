import { Category, Product } from "../../sanity.types";
import CategorySelector from "./category-selector";
import ProductGrid from "./product-grid";

const ProductView = ({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) => {
  return (
    <div className="flex flex-col">
      {/* categories */}
      <div className="w-full sm:w-[200px]">
        <CategorySelector categories={categories} />
      </div>

      {/* products */}
      <div className="flex-1">
        <div className="">
          <ProductGrid products={products} />

          {/* <hr className="w-1/2 sm:2-3/4" /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
