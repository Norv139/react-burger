import React, {FC, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllItems } from "../services/actions"
import { TRootState } from "../services/store"

export const Orders: FC = () => {
    const dispatch = useDispatch()
    const dataIngredients = useSelector((state:TRootState)=>state.components.items)


    function filterAllingredients(allIngridients, serch:Array<string>){

        return allIngridients.length > 0 ? (
                allIngridients.filter(item => serch.includes(item._id))
            ):(
                []
            )
    }

    useEffect(() => {
        if (dataIngredients.length === 0){
            dispatch(getAllItems()  as any)
        }
    }, []);

    console.log(dataIngredients)

    const dataTest = {
        "success": true,
        "orders": [
          {
            "ingredients": [
              "60d3463f7034a000269f45e7",
              "60d3463f7034a000269f45e9",
              "60d3463f7034a000269f45e8",
              "60d3463f7034a000269f45ea"
            ],
            "_id": "",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
          }
        ],
        "total": 1,
        "totalToday": 1
      } 
    const ordersTest = [
        {
          "ingredients": [
            "60d3463f7034a000269f45e7",
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
            "60d3463f7034a000269f45ea"
          ],
          "_id": "",
          "status": "done",
          "number": 0,
          "createdAt": "2021-06-23T14:43:22.587Z",
          "updatedAt": "2021-06-23T14:43:22.603Z"
        }
      ]

    return (
    <>
        <CardOrder ordersList={ordersTest} allIngridients={dataIngredients} />
    </>
    )
}

function CardOrder({ordersList, allIngridients}){

    return(
        <>
        </>
    )
}