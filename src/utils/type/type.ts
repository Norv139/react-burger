import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { TRootState } from "../../services/store";

export type TdataPropTypes = {
    uuid?: string;
    _id: string;
    name:  string;
    type: string;
    proteins:  number;
    fat:  number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export const NulldataPropTypes : TdataPropTypes = {
    "_id":"",
    "name":"",
    "type":"",
    "proteins":0,
    "fat":0,
    "carbohydrates":0,
    "calories":0,
    "price":0,
    "image":"",
    "image_mobile":"",
    "image_large":"",
    "__v":0
  }


export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType, // возвращаемый тип после выхоза thunk
  TRootState, // root state )))
  unknown, // дополнительный аргумент добавляемый в каждый thunk, в проекте мы его не использовали
  AnyAction // Список всех обычных экшенов
  >;