import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../ProductCard";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import useAuthToken from "../../hooks/useAuthToken.hook";

const fetchProducts = async (token: string | null) => {
  if (!token) {
    throw new Error(`Token iis empty`);
  }

  const response = await fetch("https://api.productly.app/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const AccountArea = () => {
  // create a reusable auth token hook
  const authData = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData?.token) {
      navigate("login");
    }
  }, [authData?.token, navigate]);

  const { data, isError, isLoading, error } = useQuery<{
    products: Array<Product>;
  }>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(authData?.token || null),
  });

  // Use useMemo for calculating progressBarWidth to avoid unnecessary recalculations on every render
  // I think useMemo here will not really matter since this is just a simple calculation
  // But, it's nice to have
  const progressBarWidth = useMemo(() => {
    const maxProducts = 60; // This should probably come from the meta data in the backend, but I don't know if we have that
    return data ? `${(data.products.length / maxProducts) * 100}%` : "0%"; // add percent
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center">
      <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 max-w-[1300px] gap-5 p-4">
        {data?.products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            {/* Added missing description */}
            <p>{product.description}</p>
          </div>
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
