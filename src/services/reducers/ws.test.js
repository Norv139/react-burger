import {
    wsStart,
    wsClose,
    wsFeedConnectionClosed,
    wsFeedConnectionError,
    wsFeedConnectionSuccess,
    wsGetData,

    wsInit
} from './ws'

import wsSlice from './ws'

describe('ws',()=>{
    const initialState = {
        wsConnected: false,
        feed:{
                orders: [
                    {
                        ingredients: [''],
                        _id: "",
                        status: "",
                        number: 0,
                        name: '',
                        createdAt: '',
                        updatedAt: ''
                    }
                ],
                total: 0,
                totalToday: 0,
            },
        wsError: false
    }
    it('init state wsStart / wsClose',()=>{
        const action = {type: 'unknown'}

        wsSlice(initialState, wsStart())
        wsSlice(initialState, wsClose())

        expect(wsSlice(initialState, action)).toEqual(wsInit)
    })
    it('wsFeedConnectionSuccess', ()=>{
        const state = {
            ...initialState,
            wsConnected: true
        }
        const action = wsFeedConnectionSuccess()
        expect(wsSlice(initialState, action)).toEqual(state)
    })
    it('wsFeedConnectionError', ()=>{
        const state = {
            ...initialState,
            wsConnected: false,
            wsError: true
        }
        const action = wsFeedConnectionError()
        expect(wsSlice(initialState, action)).toEqual(state)
    })
    it('wsGetData', ()=>{
        const anyData = {
            orders: [
                {
                    ingredients: ['1', '1', '1'],
                    _id: "23",
                    status: "done",
                    number: 23,
                    name: 'any',
                    createdAt: '22',
                    updatedAt: '33'
                }
            ],
            total: 2,
            totalToday: 3,
        }
        const state = {
            ...initialState,
            feed: anyData
        }
        const action = wsGetData(anyData)
        expect(wsSlice(initialState, action)).toEqual(state)
    })
})