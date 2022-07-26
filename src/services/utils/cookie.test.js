import { createCookie, getCookie, deleteCookie, setCookie } from "./cookie";

describe('Получение параметров из куки', ()=>{
    it('Первый тест', ()=>{
        const a = 1;
        const b = 2;
        const result = 3;
        expect(a+b).toBe(result)
    });

    it('Получение токенов в куки',
    ()=>{
        setCookie({ accessToken: 'accessToken', refreshToken: 'refreshToken' })

        expect( getCookie('accessToken') ).toBe('accessToken');
        expect( getCookie('refreshToken') ).toBe('refreshToken');
    });

    it('Получение значения куки',
    ()=>{
        createCookie('42', '42');

        expect( getCookie('42') ).toBe('42');

        expect( getCookie('null') ).toBe(undefined);
    });

    it('Удаление куки',
    ()=>{

        deleteCookie('42');
        
        expect( getCookie('null') ).toBe(undefined);
    });
} )