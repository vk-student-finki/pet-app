import * as yup from "yup";

export const CreateProducerValidator = yup.object().shape({
  name: yup.string().required("Name of producer is required"),
});
