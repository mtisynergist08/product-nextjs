import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { ProductResponse } from "@/models/Product.Models";
import { FormikProps } from "@/models/FormikModels";

type OnSuccessCallback = (data: ProductResponse) => void;

export const useCreateProduct = ({
  onSuccess,
}: {
  onSuccess: OnSuccessCallback;
}) => {
  return useMutation<ProductResponse, Error, FormikProps>(
    async (body) => {
      try {
        console.log(body);
        const productResponse = await axiosInstance.post<ProductResponse>(
          "/api/products",
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        return productResponse.data;
      } catch (error) {
        // Handle any errors
        throw error;
      }
    },
    { onSuccess },
  );
};
