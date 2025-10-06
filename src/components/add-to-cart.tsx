'use client'
import { useEffect, useState } from "react";
import { Product } from "../../sanity.types";
import { useBasketStore } from "@/store/store";
import { FaPlus, FaMinus } from "react-icons/fa";


const AddToCartButton = ({ product, disabled }:
    {
        product: Product;
        disabled?: boolean;
    }) => {
    const { addItem, removeItem } = useBasketStore();
    const itemCount = useBasketStore((state) => state.getItemCount(product._id));

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) { return null; }

    return (
        <div className="w-[100px] justify-between flex items-center">
            <button
                onClick={() => removeItem(product._id)}
                className={`w-8 flex p-2 rounded-full items-center justify-center transition-colors duration-300 ${itemCount === 0
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-400'}`}
                disabled={itemCount === 0 || disabled}
            >
                <span
                    className={`text-xl ${disabled ? 'text-gray-400' : 'text-black'}`}
                >
                    <FaMinus color="#101010" size={10} />
                </span>
            </button>

            <span
                className="w-8 text-center space-x-2"
            >{itemCount}
            </span>

            <button
                onClick={() => addItem(product)}
                className={`w-8 flex p-2 rounded-full items-center justify-center transition-colors duration-300 ${disabled
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-primary hover:bg-green-300'}`}

                disabled={disabled}
            >
                <span
                    className={`text-xl ${disabled ? 'text-gray-400' : 'text-black'}`}
                >
                    <FaPlus color="#101010" size={10} />
                </span>
            </button>
        </div>
    );
}

export default AddToCartButton;