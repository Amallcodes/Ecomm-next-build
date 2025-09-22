'use client'
import { Product } from "../../sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./product-thumb";

const ProductGrid = ({ products } : {products: Product[]}) => {
  return (
    <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 mt-5 lg:gap-6">
      {products?.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div
          layout
          initial={{opacity: 0.2}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="flex justify-center"
          >
            <ProductThumb product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ProductGrid;
