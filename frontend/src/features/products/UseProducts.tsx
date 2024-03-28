import { axiosInstance } from "@/lib/axios";
import { ProductModel } from "@/models/Product.Models";
import { useQuery } from "@tanstack/react-query";

export const useProductsQueries = () => {
  // const [products, setProducts] = useState<ProductModel[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  //
  // const fetchProducts = async () => {
  //   setIsLoading(true);
  //   try {
  //     setTimeout(async () => {
  //       const response = await axiosInstance.get("/api/products");
  //       setProducts(response.data);
  //       setIsLoading(false);
  //     }, 1500);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //
  //   // return response.data;
  // };
  //
  // useEffect(() => {
  //     fetchProducts();
  // }, []);

  // const { data, isLoading } = useQuery<ProductModel[]>({
  //   queryFn: async () => {
  //     const response = await axiosInstance.get("/api/products");
  //     return response.data;
  //   },
  // });
  // return {
  //   data,
  //   isLoading,
  // };

  return useQuery<ProductModel[]>({
    queryFn: async () => {
      const response = await axiosInstance.get("/api/products");
      return response.data;
    },
    queryKey: ["fetch.products"],
  });
};
