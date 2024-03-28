import { useMutation } from "@tanstack/react-query";
import { FormikProps } from "@/models/FormikModels";
import { axiosInstance } from "@/lib/axios";

export const useEditProduct = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation(
    async (body: FormikProps) => {
      return await axiosInstance.patch(`/api/products/${body.id}`, body);
    },
    {
      onSuccess,
    },
  );
};
