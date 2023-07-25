import { defineStore } from "pinia";
import axios from "axios";
import type { PaginatedItemsData, Datum, Items, Category } from "@/types/shop";

export const useItemStore = defineStore('item', {
    state: (): PaginatedItemsData => ({
        PaginatedItems: <Items>{},
        latestItems: <Datum[]>[],
        popularItems: <Datum[]>[],
        bestRatingItems: <Datum>[],
        categories: <Category[]>[],
        categoryStatus: 'All',
    }),
    getters: {
        items: (state) => state.PaginatedItems?.data,
    },
    actions: {
        async getAllItems(){
            try{
                const { data } = await axios.get('/item/getAllItems');
                this.PaginatedItems = data.items;
                this.categoryStatus = 'All';
            }catch(error){
                console.log(error);
            }
        },
        async getSearchItems(searchKey: string){
            try{
                const { data } = await axios.get(`/item/getSearchItems/${searchKey}`);
                this.PaginatedItems = data.items;
                this.categoryStatus = 'Search';
            }catch(error){
                console.log(error);
            }
        },
        async getAllCategories(){
            try{
                const { data } = await axios.get('/item/getAllCategories');
                this.categories = data.categories;
            }catch(error){
                console.log(error);
            }
        },
        async filterItemsByCategory(categoryId: number){
            try{
                const { data } = await axios.get(`/item/filterItemsByCategory/${categoryId}`);
                this.PaginatedItems = data.items;
                this.categoryStatus = data.items.data[0].category.title;
            }catch(error){
                console.log(error);
            }
        }, 
        async getItems(url: string){
            try{
                const { data } = await axios.get(url);
                this.PaginatedItems = data.items;
            }catch(error){
                console.log(error);
            }
        },
        async getLatestItems() {
            try{
                const { data } = await axios.get('/item/getLatestItems');
                this.latestItems = data.items;
            }catch(error){
                console.log(error);
            }
        },
        async getPopularItems() {
            try{
                const { data } = await axios.get('/item/getPopularItems');
                this.popularItems = data.items;
            }catch(error){
                console.log(error);
            }
        }

    }
})