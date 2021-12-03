import * as yup from "yup";

export const CreateGroupValidator = yup.object().shape({
  name: yup.string().required("Име е задолжително поле"),
});

export const UpdateGroupValidator = yup.object().shape({
  name: yup.string().required("Име е задолжително поле"),
});
