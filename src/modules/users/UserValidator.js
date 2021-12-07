import * as yup from "yup";

export const CreateUserValidator = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Полето име мора да содржи минимум 2 карактери")
    .max(20, "Полето име може да содржи максимум 20 карактери")
    .test(
      "is-first-upper",
      "Првата буква на името мора да биде голема буква",
      (value) => {
        if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) return true;
        else return false;
      }
    )
    .required("Име е задолжително поле"),
  lastName: yup
    .string()
    .min(2, "Полето презиме мора да содржи минимум 2 карактери")
    .max(20, "Полето презиме може да содржи максимум 20 карактери")
    .test(
      "is-first-upper",
      "Првата буква на презимето мора да биде голема буква",
      (value) => {
        if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) return true;
        else return false;
      }
    )
    .required("Презиме е задолжително поле"),
  username: yup
    .string()
    .min(2, 'Полето "username" мора да содржи минимум 2 карактери')
    .max(10, 'Полето "username" мора да содржи максимум 10 карактери')
    .required("username е задолжително поле"),
  password: yup
    .string()
    .min(8, 'Полето "password" мора да содржи минимум 8 карактери')
    .max(20, 'Полето "password" мора да содржи максимум 20 карактери')
    .required("password е задолжително поле")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Мора да содржи барем 8 карактери, една голема буква, број и специјален карактер(@$!%*#?&)"
    ),
});

export const UpdateUserValidator = yup.object().shape({
  firstName: yup
    .string()

    .min(2, "Полето име мора да содржи минимум 2 карактери")
    .max(20, "Полето име може да содржи максимум 20 карактери")
    .test(
      "is-first-upper",
      "Првата буква на името мора да биде голема буква",
      //check if first letter is uppercase
      (value) => {
        if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) return true;
        else return false;
      }
    )
    .required("Име е задолжително поле"),
  lastName: yup
    .string()

    .min(2, "Полето презиме мора да содржи минимум 2 карактери")
    .max(20, "Полето презиме може да содржи максимум 20 карактери")
    .test(
      "is-first-upper",
      "Првата буква на презимето мора да биде голема буква",
      (value) => {
        if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) return true;
        else return false;
      }
    )
    .required("Презиме е задолжително поле"),
  username: yup
    .string()
    .min(2, 'Полето "username" мора да содржи минимум 2 карактери')
    .max(10, 'Полето "username" мора да содржи максимум 10 карактери')
    .required("username е задолжително поле"),
});
