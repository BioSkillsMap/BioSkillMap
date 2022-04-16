import hamburger__style from './hamburger.module.css';
const Hamburger = () => {
  return (
      <div className={hamburger__style.container}>
          <div className ={hamburger__style.line}></div>
          <div className ={hamburger__style.line}></div>
          <div className ={hamburger__style.line}></div>
    </div>
  )
}

export default Hamburger