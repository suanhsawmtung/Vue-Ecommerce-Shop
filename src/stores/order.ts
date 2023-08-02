import { defineStore } from "pinia";
import axios from "axios";
import type { 
    OrderData, 
    CartItem, 
    CartData, 
    OrderElement, 
    Item, 
    OrderFormDataType,
    BuyNowFormDataType
 } from "@/types/order";

export const useOrderStore = defineStore('order', {
    state:(): OrderData => ({
        cartItems: <CartItem[]>[],
        orders: <OrderElement[]>[],
        items: <Item[]>[],
        orderFinished: false,
    }),
    getters: {
        FinalCartPrice: (state) => {
            let total: number = 0;
            state.cartItems.forEach(item => {
                total += (item.quantity * item.product.price);
            });
            return total;
        },
        FinalOrderPrice: (state) => {
            let total: number = 0;
            state.items.forEach(item => {
                total += item.total;
            })
            return total;
        }
    },
    actions: {
        addItemsToCart(cartData: CartData){
            return new Promise(async(resolve, reject) => {
                const { data } = await axios.post('/shop/addItemsToCart', cartData);
                if(data.status === 'created') {
                    this.cartItems.push(data.item); 
                    resolve(data.status);
                }else if(data.status === 'updated') resolve(data.status)
                else reject(data);
            })
        },
        async getAllCartItems(){
            try{
                const { data } = await axios.get('/shop/getAllCartItems');
                this.cartItems = data.cartItems;
            }catch(error){
                console.log(error);
            }
        },
        async updateCartItemQuantity(item: CartItem){
            try{
                await axios.put('/shop/updateCartItemQuantity', item);
            }catch(error){
                console.log(error);
            }
        },
        async deleteCartItem(id: number){
            try{
                const { data } = await axios.delete(`/shop/deleteCartItem/${id}`);
                if(data.message === 'success'){
                    this.cartItems = this.cartItems.filter(item => {
                        return item.id !== id;
                    })
                }
            }catch(error){
                console.log(error);
            }
        },
        async orderCheckout(formData: OrderFormDataType){
            try{
                const { data } = await axios.post('/shop/orderCheckout', formData);
                if(data.status === 'success') this.orderFinished = true;
            }catch(error){
                console.log(error);
            }
        },
        async getAllOrders(){
            try{
                const { data } = await axios.get('/shop/getAllOrders');
                this.orders = data.orders;
            }catch(error){
                console.log(error);
            }
        },
        async getOrderDetail(orderCode: string | string[] ){
            try{
                const { data } = await axios.get(`/shop/getOrderDetail/${orderCode}`);
                this.items = data.items;
            }catch(error){
                console.log(error);
            }
        },
        buyNow(formData: BuyNowFormDataType){
            return new Promise(async(resolve, reject) => {
                const { data } = await axios.post('/shop/buyNow', formData);
                if(data.status === 'success') resolve(data.status);
                else reject(data.status);
            })
        }
    }
})