import userSlice from './user'
import { initUser } from './user'
import {
    req_FAILED,
    req_REQUEST,
    req_SUCCESS,
    setPreviousPath,
    setLogin,
    //setRefreshSuccess
    setUserData
} from './user'

describe('user', ()=>{
    const initialState = {
        previousPath: [null, null],
        isLogin: false,
        data:{
            email: "",
            name: ""
        },
        itemsFailed: false,
        itemsRequest: false,
        //refreshSuccess: false
    }
    it('init state', ()=>{
        const action = {type: 'unknown'}
        expect(userSlice(initialState, action)).toEqual(initUser)
    })
    it('setPreviousPath', ()=>{
        const store = {
            ...initialState,
            previousPath: [null, 'any']
        }
        const action = setPreviousPath('any')
        expect(userSlice(initialState, action)).toEqual(store)
    })
    it('setLogin true', ()=>{
        const store = {
            ...initialState,
            isLogin: true
        }
        const action = setLogin(true)
        expect(userSlice(initialState, action)).toEqual(store)
    })
    it('setLogin false', ()=>{
        const store = {
            ...initialState,
            isLogin: false
        }
        const action = setLogin(false)
        expect(userSlice(initialState, action)).toEqual(store)
    })
    it('setUserData', ()=>{
        const store = {
            ...initialState,
            itemsFailed: false, 
            data: {
                email: "any@gmail.com",
                name: "12345"
            }, 
            itemsRequest: false 
        }
        const action = setUserData(
            {
                email: "any@gmail.com",
                name: "12345"
            })
        expect(userSlice(initialState, action)).toEqual(store)
    })
    it('req_SUCCESS', ()=>{
        const store = {
            ...initialState,
            itemsFailed: false, 
            data: {
                email: "any@gmail.com",
                name: "12345"
            }, 
            itemsRequest: false 
        }
        const action = req_SUCCESS(
            {
                email: "any@gmail.com",
                name: "12345"
            })
        expect(userSlice(initialState, action)).toEqual(store)
    })
    it('req_REQUEST', ()=>{
        const store = {
            ...initialState,
            itemsRequest: true 
        }
        const action = req_REQUEST()
        expect(userSlice(initialState, action)).toEqual(store)
    })
    it('req_FAILED', ()=>{
        const store = {
            ...initialState,
            itemsFailed: true, 
            itemsRequest: false 
        }
        const action = req_FAILED()
        expect(userSlice(initialState, action)).toEqual(store)
    })
})