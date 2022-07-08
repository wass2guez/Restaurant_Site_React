import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import cartContext from "./../../store/cart-context";

const HeaderCartButton = (props) => {
 const [btnIsHilighted , setButtonIsHilighted] = useState(false)

 const cartCtx = useContext(cartContext);
 const {items} = cartCtx

 //here we wanna animate the button on every add item
  useEffect(()=> {
    if ( items.length ===0) {
      return ;
    }
    setButtonIsHilighted(true)
    //settimeout to remove class button every 300ms to make sure animation work on every add button
    const timer = setTimeout(()=> {
      setButtonIsHilighted(false)
    }, 300)
    //we should always use cleanup function after every settimer
    return ()=> {
      clearTimeout(timer)
    }
  } , [items])
  //calculate number of items choosen
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${ btnIsHilighted ? classes.bump : ''}`
  return (
    <button onClick={props.onShowCart} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
