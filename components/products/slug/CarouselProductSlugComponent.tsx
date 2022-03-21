import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Dot,
  DotGroup,
  Slide,
  Slider
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { FC } from 'react'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { ButtonProductSlugComponent } from '../..'
import { IProduct } from '../../../interfaces'
import { ImageUiComponent } from '../../ui'

export interface ICarouselProductSlugProps {
  product: IProduct
}

export const CarouselProductSlugComponent: FC<ICarouselProductSlugProps> = ({
  product
}) => {
  return (
    <CarouselProvider
      className='group'
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={product.images.length}
      infinite
      interval={5000}
      isPlaying
    >
      <ButtonBack className='buttonCarousel left-2'>
        <ButtonProductSlugComponent Icon={FaChevronCircleLeft} />
      </ButtonBack>

      <ButtonNext className='buttonCarousel right-2'>
        <ButtonProductSlugComponent Icon={FaChevronCircleRight} />
      </ButtonNext>

      <Slider>
        {product.images.map((image, index) => (
          <Slide key={index} index={index}>
            <ImageUiComponent image={image} description={product.description} />
          </Slide>
        ))}
      </Slider>
      <DotGroup className='hidden w-full md:flex flex-row gap-4 my-5'>
        {product.images.map((image, index) => (
          <Dot
            className='relative w-[106px] h-[106px]'
            key={index}
            slide={index}
          >
            <ImageUiComponent image={image} description={product.description} />
          </Dot>
        ))}
      </DotGroup>
    </CarouselProvider>
  )
}
