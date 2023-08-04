
// Generated by https://quicktype.io

export interface OrderData {
    cartItems: CartItem[];
    orders: OrderElement[];
    items: Item[];
    orderFinished: boolean;
}

export interface CartItem {
    id:         number;
    user_id:    number;
    product_id: number;
    quantity:   number;
    created_at: string;
    updated_at: string;
    product:    Product;
}

export interface Product {
    id:          number;
    title:       string;
    category_id: number;
    price:       number;
    count:       number;
    description: string;
    image:       string;
    created_at:  string;
    updated_at:  string;
}

export interface CartData {
    id: number | string | string[];
    quantity: number;
}

export type CartItemActionTerm = 'minus' | 'plus'

enum OrderStatus {
    Pending,
    Accepted,
    Paid,
    Done
}

export interface OrderElement {
    id:          number;
    user_id:     number;
    order_code:  string;
    phone:       string;
    address:     string;
    total_price: number;
    status:      OrderStatus;
    created_at:  string;
    updated_at:  string;
    order_list:  OrderList[];
}

export interface OrderFormDataType {
    phone:   string;
    address: string;
}

export interface BuyNowFormDataType{
    phone: string,
    address: string,
    product_id: number,
    quantity: number,
    total: number,
}

export interface OrderList {
    order_code: string;
    quantity:   number;
}

export interface Item {
    id:         number;
    user_id:    number;
    product_id: number;
    quantity:   number;
    total:      number;
    order_code: string;
    created_at: string;
    updated_at: string;
    product:    ProductForDetail;
}

export interface ProductForDetail {
    id:    number;
    title: string;
    price: number;
}
