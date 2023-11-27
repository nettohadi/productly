import { useQuery } from "@tanstack/react-query";
import ProductCard, { Product } from "../ProductCard"; // Adjust the import path as needed
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const fetchProducts = async (): Promise<{
  products: Array<Product>;
}> => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const FirstTask = () => {
  const { isLoading, isError, data, error } = useQuery<{
    products: Array<Product>;
  }>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 max-w-[1300px] gap-5 p-4">
          {data?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FirstTask;
