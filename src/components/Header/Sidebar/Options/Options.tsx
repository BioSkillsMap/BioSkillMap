import option__style from './options.module.css';

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
          {/* </div> */}
    </div>
  )
}

export default Options