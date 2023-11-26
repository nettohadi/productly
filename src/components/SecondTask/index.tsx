import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard, { Product } from "../ProductCard";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import useValidJwt from "../../hooks/useValidJwt.hook";

const fetchProducts = async (token?: string | null) => {
  if (!token) {
    throw new Error(`Token invalid`);
  }

  const response = await fetch("https://dummyjson.com/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const AccountArea = () => {
  // create a reusable jwt hook
  const jwt = useValidJwt();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt?.token) {
      navigate("login");
    }
  }, [jwt?.token, navigate]);

  const { data, isError, isLoading, error } = useQuery<{
    products: Array<Product>;
  }>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(jwt?.token),
  });

  // Use useMemo for calculating progressBarWidth to avoid unnecessary recalculations on every render
  const progressBarWidth = useMemo(() => {
    const maxProducts = 60; // Consider making this a configurable prop
    // added percent
    return data ? `${(data.products.length / maxProducts) * 100}%` : "0%";
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center">
      <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 max-w-[1300px] gap-5 p-4">
        {data?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="w-full max-w-[1300px] px-4">
        <div className="w-full  bg-white">
          <div
            className="bg-purple-300 text-right px-1"
            style={{ width: progressBarWidth }}
          >
            Progress Bar
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountArea;
