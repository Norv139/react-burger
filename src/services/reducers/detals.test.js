import detalsSlice, {
    setInfo, 
    
    openInfo, closeInfo, 
    openOrder, closeOrder,

    postOrder_SUCCESS,
    postOrder_REQUEST,
    postOrder_FAILED
} from './detals'
import { initComponent } from './detals'

import {ingredient, ingredientBun} from '../../utils/mocks/index'


describe( 'detals', ()=>{
    const initialState = {
        order: {
            order:{
                number: 0
            }
        },
        orderRequest: false,
        orderFailed: false,
        isOpenOrder: false,
        info: {},
        isOpenInfo: false
    }

    it('init state',()=>{
        const action = {type: 'unknown' }
        expect(detalsSlice(initialState, action)).toEqual(initComponent)
    })

    it('setInfo', ()=>{
        const state = {
            ...initialState,
            info: {...ingredient}
        }
        const action = setInfo({item: ingredient})
        expect(detalsSlice(initialState, action)).toEqual(state)
    })
    it('openInfo', ()=>{
        const state = {
            ...initialState,
            isOpenInfo: true
        }
        const action = openInfo()
        expect(detalsSlice(initialState, action)).toEqual(state)
    })
    it('closeInfo', ()=>{
        const state = {
            ...initialState,
            isOpenInfo: false
        }
        const action = closeInfo()
        expect(detalsSlice(initialState, action)).toEqual(state)
    })
    it('postOrder_SUCCESS', ()=>{
        const anyList = [ingredientBun, ingredient]
        const state = {
            ...initialState,
            orderFailed: false, 
            order: { ...anyList}, 
            orderRequest: false,
            isOpenOrder: true
        }
        const action = postOrder_SUCCESS({items: anyList})
        expect(detalsSlice(initialState, action)).toEqual(state)
    })
    it('postOrder_REQUEST', ()=>{
        const state = {
            ...initialState,
            orderRequest: true
        }
        const action = postOrder_REQUEST()
        expect(detalsSlice(initialState, action)).toEqual(state)
    })
    it('postOrder_FAILED', ()=>{
        const state = {
            ...initialState,
            orderRequest: false,
            orderFailed: true
        }
        const action = postOrder_FAILED()
        expect(detalsSlice(initialState, action)).toEqual(state)
    })
    it('openOrder', ()=>{
        const state = {
            ...initialState,
            isOpenOrder: true
        }
        const action = openOrder()
        expect(detalsSlice(initialState, action)).toEqual(state)
    })
    it('closeOrder', ()=>{
        const state = {
            ...initialState,
            isOpenOrder: false
        }
        const action = closeOrder()
        expect(detalsSlice(initialState, action)).toEqual(state)
    })
    }
)