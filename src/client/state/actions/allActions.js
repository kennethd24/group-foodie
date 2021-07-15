import { setCurrentUser } from '../reducers/currentUserReducer';
import { addName, setNumber } from '../reducers/namesReducer';
import { logIn, logOut } from '../reducers/loginReducer.js'
import { addItem, subtractItem, UpdateItemPrice, UpdateItemDescription, resetItemQuantity } from '../reducers/menuItemReducer';
import { UpdateItemName, UpdateItemId, UpdateItemQuantity, UpdateTotalPrice, UpdateRestaurantId } from '../reducers/orderItemReducer';
import { addItemToOrders, addToPriceTotal } from '../reducers/allOrderItemsReducer';

const allActions = {
  addName,
  // addEmail,
  setCurrentUser,
  logIn,
  logOut,
  addItem,
  addToPriceTotal,
  addItemToOrders,
  UpdateItemPrice,
  UpdateItemDescription,
  resetItemQuantity,
  subtractItem,
  UpdateItemName,
  UpdateItemId,
  UpdateItemQuantity,
  UpdateTotalPrice,
  UpdateRestaurantId,
}

export default allActions;