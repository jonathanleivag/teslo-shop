import * as yup from 'yup'
import { IChangePassword } from '../components'
import { TRegisterInputs } from '../pages/auth/register'

export const registerValidation: yup.SchemaOf<TRegisterInputs> = yup
  .object()
  .shape({
    name: yup.string().required('El nombre es requerido'),
    email: yup
      .string()
      .email('El email no es válido')
      .required('El email es requerido'),
    password: yup
      .string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password0: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('La contraseña es requerida')
  })
  .required()

export const updateUserValidation: yup.SchemaOf<{
  name: string
  email: string
}> = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  email: yup
    .string()
    .email('El email no es válido')
    .required('El email es requerido')
})

export const updatePasswordValidation: yup.SchemaOf<IChangePassword> = yup
  .object()
  .shape({
    password: yup.string().required('La contraseña actual es requerida'),
    password0: yup
      .string()
      .required('La nueva contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password1: yup
      .string()
      .oneOf([yup.ref('password0'), null], 'Las contraseñas no coinciden')
      .required('La repetición de contraseña es requerida')
  })
