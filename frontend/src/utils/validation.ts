import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().required("Image URL is required"),
});
