import option__style from './options.module.css';
import MapCard from './MapCard/mapcard';
import { Modal } from '@mui/material';
const Options = () => {
  return (
      <div className={option__style.container}>
          {/* <div className={option__style.wrapper}>  */}
            <button className={option__style.option}>
              Find Out More 
            </button>
            <button className={option__style.option}>
                Favorite Maps <div className={option__style.arrow}>➤</div>
            </button>
            <button className={option__style.option}>
                Your Maps <div className={option__style.arrow}>➤</div>
            </button>
            <MapCard name="America" creator="Marian" link="#"/>
          {/* </div> */}
    </div>
  )
}

export default Options