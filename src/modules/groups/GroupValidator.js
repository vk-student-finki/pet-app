import * as yup from "yup";

export const CreateGroupValidator = yup.object().shape({
  name: yup.string().required("Име на групата е задолжително поле"),
  code: yup
    .string()
    .required("Код за групата е задолжително поле")
    .max(5, "Кодот мора да содржи најмногу 5 карактери")
    .matches(/[A-Z]/, "Сите карактери мора да се запишани со голема буква"),
});

export const UpdateGroupValidator = yup.object().shape({
  name: yup.string().required("Име на групата е задолжително поле"),
  code: yup
    .string()
    .required("Код за групата е задолжително поле")
    .matches(/[A-Z]/, "Сите карактери мора да се запишани со голема буква"),
});
