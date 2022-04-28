import * as yup from 'yup'
import { TGender, TValidSize, TValidType } from '../interfaces'
import { IProductForm } from '../pages/admin/products/[slug]'

export const productValidation: yup.SchemaOf<IProductForm> = yup
  .object()
  .shape({
    images: yup.array<string[]>().required(),
    description: yup.string().required('La descripción es requerida'),
    inStock: yup
      .number()
      .min(0, 'Tiene que tener un stock positivo o 0')
      .required('La cantidad en stock es requerida'),
    price: yup
      .number()
      .required('El precio es requerido')
      .min(1, 'El precio debe ser mayor a 0')
      .positive('El precio debe ser positivo'),
    sizes: yup
      .array<TValidSize[]>()
      .required('Debe seleccionar al menos un tamaño'),
    slug: yup.string().required('El slug es requerido'),
    tags: yup.array<string[]>().required('Debe seleccionar al menos un tag'),
    title: yup.string().required('El título es requerido'),
    type: yup
      .mixed<TValidType>()
      .oneOf(['shirts', 'pants', 'hoodies', 'hats'])
      .required('El tipo es requerido'),
    gender: yup
      .mixed<TGender>()
      .oneOf(['men', 'woman', 'kid', 'unisex'])
      .required('El genero es requerido')
  })
