import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard, { Product } from "./ProductCard"; // Adjust the import path as needed
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const FirstTest = () => {
  const { isLoading, isError, data, error } = useQuery<{
    products: Array<Product>;
  }>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {" "}
      <Link to={`/`}>Home</Link>
      <div className="grid grid-cols-3">
        {data?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default FirstTest;
