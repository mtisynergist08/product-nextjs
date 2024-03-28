import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useDeleteProduct = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation(
    async (id: number) => {
      return await axiosInstance.delete(`/api/products/${id}`);
    },
    { onSuccess },
  );
};
