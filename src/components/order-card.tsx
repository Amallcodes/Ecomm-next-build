import formatCurrency from "@/lib/format-currency";
import ImageUrl from "@/lib/image-url";
import Image from "next/image";

const OrderCard = ({ order }) => {
    console.log(order)
    return (
        <div className="bg-gray-50 my-4 rounded-md p-4">
            <div className="">
                <p className="text-sm text-grey-600 mb-1 font-bold">
                    Order Number
                </p>
                <p className="font-mono text-sm text-primary reak-all">
                    {order.orderNumber}
                </p>
            </div>
            <div className="sm:text-right">
                <p className="text-sm text-grey-600 mb-1">Order date</p>
                <p className="font-medium">
                    {order.orderDate ?
                        new Date(order.orderDate).toLocaleDateString()
                        : "N/A"
                    }
                </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                        }`}>
                        {order.status}
                    </span>
                </div>

                <div className="sm:text-right">
                    <p className="text-sm text-gray-600 mb-1">Total amount</p>
                    <p className="font-bold text-lg">
                        {formatCurrency(order.totalprice ?? 0, order.currency)}
                    </p>
                </div>
            </div>

            {order.amountDiscounted ? (
                <div className="">
                    <div className="mt-4 sm:p-4 bg-red-50">
                        <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">
                            Discount applied: {" "} {formatCurrency(order.amountDiscounted, order.currency)}
                        </p>
                        <p className="text-sm text-gray-600">
                            Original subtotal: {" "} {formatCurrency(order.totalprice ?? 0 - order.amountDiscounted, order.currency)}
                        </p>
                    </div>

                    <div className="px-4 py-3 sm:px-6 sm:py-4"></div>
                </div>
            ) : null}

            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">
                    Order Items
                </p>

                <div className="space-y-3 sm:space-y-4">
                    {order.products?.map((product) => (
                        <div key={product.product?._id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-4"
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                {product.product?.image && (
                                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                                        <Image
                                            src={ImageUrl(product.product.image).url()}
                                            alt={product.product.name ?? ""}
                                            className="object-center"
                                            fill
                                        />
                                    </div>
                                )}

                                <div className="">
                                    <p className="font-semibold text-sm sm:text-base">
                                        {product.product.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Quantity: {product.quantity ?? "N/A"}
                                    </p>
                                </div>
                            </div>

                            <p className="font-medium text-right">
                                {product.product.price && product.quantity ? formatCurrency(product.product.price * product.quantity, order.currency) : "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderCard;