import { FC, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { navigateTo } from '../../../utils'

export const SearchUiComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  const onClick = () => {
    if (searchTerm.trim().length > 0) {
      navigateTo(router, dispatch, `/search/${searchTerm}`)
    }
  }

  return (
    <div className='li_sidebar border-b mb-5'>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        type='text'
        onKeyUp={e => e.key === 'Enter' && onClick()}
        className='w-full focus:outline-none font-light'
        placeholder='Buscar...'
      />
      <button onClick={onClick}>
        <BiSearchAlt2 className='text-2xl pointer-events-none' />
      </button>
    </div>
  )
}
