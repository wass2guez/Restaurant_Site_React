import React, { Fragment } from 'react'
import classes from './Header.module.css'
import mealsimg from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'


const Header = (props) => {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>Paprika</h1>
            <HeaderCartButton  onShowCart={props.onShowCart}/>
        </header>
        
        <div className={classes['main-image']}>
            <img src={mealsimg} alt='delicious food'/>
        </div>

    </Fragment>
  )
}

export default Header