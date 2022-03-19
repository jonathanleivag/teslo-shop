import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuUiComponent } from '../../'
import { RootState } from '../../../store'
import { changeMenu } from '../../../store/features'

export const SidebarUiComponent: FC = () => {
  const open = useSelector((state: RootState) => state.menu.open)
  const dispatch = useDispatch()

  const handleClose = () => {
    if (open) dispatch(changeMenu(false))
  }

  return (
    <section className={`base ${open ? 'base_is_open' : 'base_is_not_open'}`}>
      <button className='button_sidebar' onClick={handleClose} />
      <div className='menu_sidebar'>
        <div
          className={`menu_content ${
            open ? 'menu_content_is_open' : 'menu_content_is_not_open'
          }`}
        >
          <MenuUiComponent />
        </div>
      </div>
    </section>
  )
}
