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
    .max(20, 'Полето "username" мора да содржи максимум 20 карактери')
    .required("username е задолжително поле"),
  newPassword: yup
    .string()
    .min(8, 'Полето "newPassword" мора да содржи минимум 8 карактери')
    .max(20, 'Полето "newPassword" мора да содржи максимум 20 карактери')
    .required("newPassword е задолжително поле")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Мора да содржи барем 8 карактери, една голема буква, број и специјален карактер(@$!%*#?&)"
    ),

  email: yup
    .string()
    .email("Внесете валидна електронска адреса")
    .required("Полето е задолжително"),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Внесениот број не е валиден"
    )
    .required("Полето е задолжително"),
});
export const ChangePasswordUserValidator = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'Полето "newPassword" мора да содржи минимум 8 карактери')
    .max(20, 'Полето "newPassword" мора да содржи максимум 20 карактери')
    .required("newPassword е задолжително поле")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Мора да содржи барем 8 карактери, една голема буква, број и специјален карактер(@$!%*#?&)"
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
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
    .max(20, 'Полето "username" мора да содржи максимум 20 карактери')
    .required("username е задолжително поле"),
  email: yup
    .string()
    .email("Внесете валидна електронска адреса")
    .required("Полето е задолжително"),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Внесениот број не е валиден"
    )
    .required("Полето е задолжително"),
});
