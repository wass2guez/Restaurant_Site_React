import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defautCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //here we're looking if the added food is added as new (food * 1) or (recent food + 1)
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = { ...action.items };
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  //below : when we click on '-' we wanna decrease the amount of the item by 1
  if(action.type==='REMOVE') {
    
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )
    const existingItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount-existingItem.price
    let updatedItems
    if (existingItem.amount ===1) {
      //here if we return new array with items id different from the clicked one '-'
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {...existingItem , amount : existingItem.amount -1}
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex]= updatedItem
    }
    return {
      items : updatedItems,
      totalAmount : updatedTotalAmount
    }
  }
  return defautCartState;
};
//this component is to manage cart-context data
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defautCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
