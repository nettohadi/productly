import React, { useState } from "react";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="border border-gray-200 p-4 m-4 rounded-lg text-center">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full max-w-200px h-auto max-h-[200px] rounded object-contain"
      />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      {showDescription && (
        <p className="text-gray-600 mt-2">{product.description}</p>
      )}
      <button
        onClick={() => setShowDescription(!showDescription)}
        className="text-blue-500 hover:text-blue-700 transition-colors mt-2"
      >
        {showDescription ? "Hide" : "Show"} Description
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-3 hover:bg-blue-700 transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
