import componentsSlice, { 
    getItems_SUCCESS, 
    getItems_REQUEST, 
    getItems_FAILED,
    clearList,
    decrease_list_item,
    increase_list_item,
    change_list
} from './components'
import { initComponent } from './components'

import {ingredientBun, ingredientBun2, ingredient} from '../../utils/mocks/index'
import { TdataPropTypes } from "../../utils/type/type"


describe('components test', ()=>{
    const initialState = {
        items: [] as Array<TdataPropTypes>,
        itemsRequest: false,
        itemsFailed: false,
        list: [] as Array<TdataPropTypes>
    }
    
    it('init state', ()=>{
        const action = {type: 'unknown' }
        expect(componentsSlice(initialState, action)).toEqual(initComponent)
    })

    it('getItems_SUCCESS',()=>{
        const anyList = [ingredient, ingredient]
        const state = {
            ...initComponent,
            itemsFailed: false, 
            items: anyList,
            itemsRequest: false
        }
        const action = getItems_SUCCESS({items:anyList})

        expect(componentsSlice(initialState, action)).toEqual(state)
    })

    it('getItems_REQUEST',()=>{
        const state = {
            ...initialState,
            itemsRequest: true
        }
        const action = getItems_REQUEST()

        expect(componentsSlice(initialState, action)).toEqual(state)
    })

    it('getItems_REQUEST',()=>{
        const state = {
            ...initialState,
            itemsFailed: true, 
            itemsRequest: false 
        }
        const action = getItems_FAILED()

        expect(componentsSlice(initialState, action)).toEqual(state)
    })

    it('clearList', ()=>{
        const state = {
            ...initialState,
            list: [ingredient]
        }
        const action = clearList()
        expect(componentsSlice(state, action)).toEqual(initialState)
    })

    it('decrease_list_item',()=>{
        const state = {
            ...initialState,
            list:[ingredientBun, ingredient, ingredient]
        }
        const action = decrease_list_item({id: ingredient._id})

        expect(componentsSlice(state, action)).toEqual({...initComponent, list:[ingredientBun, ingredient]})
    })

    it('increase_list_item adding ingredient',()=>{
        const state = {
            ...initialState,
            list:[ingredientBun]
        }
        const action = increase_list_item({items: ingredient})
        expect(componentsSlice(state, action)).toEqual({...initComponent, list:[ingredientBun, ingredient]})
    })

    it('increase_list_item adding second bun',()=>{
        const state = {
            ...initialState,
            list:[ingredientBun]
        }
        const action = increase_list_item({items: ingredientBun2})
        expect(componentsSlice(state, action)).toEqual({...initComponent, list:[ingredientBun2]})
    })
    
    
    it('change_list',()=>{
        const state = {
            ...initComponent, 
            list:[ingredientBun, ingredient]
        }
        const action = change_list({items:[ingredientBun, ingredient]})

        expect(componentsSlice(initialState, action)).toEqual(state)
    })
    

})