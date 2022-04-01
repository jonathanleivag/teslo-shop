import { FC, useEffect, useState } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share'
import { TValidSize } from '../../interfaces'

const href = typeof window !== 'undefined' ? window.location.origin : ''

export interface IShareButtonProductProps {
  size?: TValidSize
  quantity?: number
  slug: string
}

export const ShareButtonProduct: FC<IShareButtonProductProps> = ({
  quantity,
  size,
  slug
}) => {
  const [url, setUrl] = useState<string>(`${href}/product/`)

  useEffect(() => {
    setUrl(
      `${href}/product/${slug}${quantity || size ? '?' : ''}${
        quantity ? `quantity=${quantity}` : ''
      }${quantity && size ? '&' : ''}${size ? `size=${size}` : ''}`
    )
    return () => {}
  }, [quantity, size, slug])

  return (
    <div className='w-full flex flex-row justify-end gap-1 my-2'>
      <FacebookShareButton url={url}>
        <FacebookIcon size={25} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={25} round={true} />
      </TwitterShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon size={25} round={true} />
      </TelegramShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={25} round={true} />
      </WhatsappShareButton>
    </div>
  )
}
