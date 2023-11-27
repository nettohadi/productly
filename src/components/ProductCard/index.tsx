import React, { useState } from "react";

export type Product = {
  id: number;
  name: string;
  description: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      key={product.id}
      className="flex flex-col justify-between items-center bg-neutral-800   rounded-lg text-center"
    >
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full  h-[200px]  rounded object-cover object-center bg-black"
      />
      <div className="pb-4 flex flex-col justify-between items-center w-full flex-grow ">
        <div className="w-full px-2">
          <h3 className="text-lg font-bold my-4">{product.name}</h3>
          <p
            className={`mt-2 px-0 overflow-hidden text-left transition-all  border border-x-0 border-neutral-700  ${
              showDescription ? "min-h-[70px] py-2" : "h-[0px]"
            }`}
          >
            {product.description}
          </p>
          <button
            data-testid="description-toggler"
            onClick={() => setShowDescription(!showDescription)}
            className="text-primary-color transition-colors mt-2"
          >
            {showDescription ? "⬆️ " : "⬇️ "}
            {showDescription ? "Hide" : "Show"} Description{" "}
          </button>
        </div>

        <button className="bg-primary-color text-white py-2 px-4 w-full max-w-[300px] rounded mt-3">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
