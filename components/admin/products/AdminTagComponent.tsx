import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import ReactTagInput from '@pathofdev/react-tag-input'
import { FieldError, UseFormSetValue } from 'react-hook-form'
import { IProduct } from '../../../interfaces'

export interface IAdminTagComponent {
  setValue: UseFormSetValue<IProduct>
  selectTags: string[]
  setErrorTag: Dispatch<SetStateAction<FieldError | undefined>>
}

export const AdminTagComponent: FC<IAdminTagComponent> = ({
  setValue,
  selectTags,
  setErrorTag
}) => {
  const [tags, setTags] = useState<string[]>(selectTags)

  useEffect(() => {
    setValue('tags', tags, { shouldValidate: true })
    if (tags.length === 0) {
      setErrorTag({
        message: 'Debe seleccionar al menos una etiqueta',
        type: 'required'
      })
    } else {
      setErrorTag(undefined)
    }
    return () => {}
  }, [setErrorTag, setValue, tags])

  const validator = (tag: string) => {
    let resp: boolean = true
    if (tag.length < 3) {
      resp = false
      setErrorTag({
        message: 'Al menos tiene que tener 3 caracteres',
        type: 'required'
      })
    } else {
      setErrorTag(undefined)
      if (tags.includes(tag)) {
        setErrorTag({
          message: `La etiqueta "${tag}" ya fue seleccionada`,
          type: 'required'
        })
        resp = false
      } else {
        setErrorTag(undefined)
        resp = true
      }
    }

    return resp
  }

  return (
    <ReactTagInput
      validator={validator}
      tags={tags}
      onChange={newTags => {
        setTags(newTags)
      }}
      placeholder='Etiquetas'
    />
  )
}
