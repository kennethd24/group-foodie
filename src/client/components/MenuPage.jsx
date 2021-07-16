import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import MenuItemContainer from './MenuItemContainer.jsx';
import {OrangeButton} from '../styles/shared.tsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const MainConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckoutButton = styled(OrangeButton)`
  border-radius: 7px;
  width: 50%;
`;

export default function MenuPage () {
  const currentItem = useAppSelector((state)=>state.currentMenuItem)
  const totalOrdersPrice = useAppSelector((state)=>state.allOrderItems.ordersTotal)
  const restaurantName = useAppSelector((state)=>state.currentRestaurant.name)
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [ menuList, setMenuList ] = React.useState([]);
  //axios call function for intial array of menu items and local storage
  async function getMenuList (restaurantid) {
    let localMenuData = localStorage.getItem(`MenuListData_${restaurantid}`);
    if (!localMenuData) {
      const rawData = await axios.get(`/restaurants/${restaurantid}/menu`)
      localMenuData = rawData.data;
      localStorage.setItem(`MenuListData_${restaurantid}`, JSON.stringify(localMenuData))
    } else {
      localMenuData = JSON.parse(localMenuData);
    }
    setMenuList(localMenuData);
  }

  function clickHandler (entry) {
    console.log(entry.menu_item_name)
    console.log(entry.menu_item_pricing)
    dispatch(allActions.UpdateItemName(entry.menu_item_name));
    dispatch(allActions.UpdateItemPrice(entry.menu_item_pricing.toFixed(2)));
    dispatch(allActions.UpdateItemDescription(entry.menu_item_description));
    dispatch(allActions.UpdateItemId(entry.menu_item_id));
    history.push("/MenuItem");

  }

  //Resets Current Selected Item
  React.useEffect(()=>{
    //Menu Item
    dispatch(allActions.UpdateItemPrice(0));
    dispatch(allActions.resetItemQuantity());
    dispatch(allActions.UpdateItemDescription(''));
    //Order Item
    dispatch(allActions.UpdateItemId(0));
    dispatch(allActions.UpdateItemName(''));
    dispatch(allActions.UpdateItemQuantity(0));
    dispatch(allActions.UpdateTotalPrice(0));
    //Get Menu List
    getMenuList(currentItem.restaurantId)
  },[])

  return(
    <MainConatiner>
      <img src={'Dannys_bg.png'}/>
      <h2>{restaurantName}</h2>
      {menuList.map(entry=>{
        return(
      <div onClick={() => clickHandler(entry)} key={entry.menu_item_id}>
        <MenuItemContainer  name={entry.menu_item_name} price={entry.menu_item_pricing} category={entry.menu_category}/>
      </div>
        )
      })}
      <CheckoutButton>Checkout ${totalOrdersPrice.toFixed(2)}</CheckoutButton>
    </MainConatiner>
  )
}