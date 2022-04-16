import option__style from './options.module.css';
import MapCard from './MapCard/mapcard';
import { Modal } from '@mui/material';
const Options = () => {
  return (
      <div className={option__style.container}>
          {/* <div className={option__style.wrapper}>  */}
            <button className={option__style.option}>
              Exploreaza în continuare 
            </button>
            <button className={option__style.option}>
                Hărțile favorite <div className={option__style.arrow}>➤</div>
            </button>
            <button className={option__style.option}>
                Hărțile tale <div className={option__style.arrow}>➤</div>
            </button>
            <MapCard name="America" creator="Marian" link="#"/>
          {/* </div> */}
    </div>
  )
}

export default Options