import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import TakeFromCurrecyData from "../utils/TakeFromCurrency";
import fs from "fs"
import { Data } from "./Data";





const currencyContext = createContext()

export const  useCurrencyContext = () => useContext(currencyContext)

export const CurrencyContextProvider  =  ({children}) =>{
    const [currencyArray,setCurrencyArray] = useState(null) // 10 senelik cekicegimiz icin array lazim
   
    


useEffect(()=>{
  (async ()=>{
  await  setCurrencyArray(Data) // apiden cekince CORS  hatasi veriyor cozmem uzun suruyor. Bu datayi bizzat kendim yaptim
    // Data =   https://github.com/foxsnow38/InflationRateToCentralBankOfTurkeyBetween2012_2022
    // Bu react projesinden once 1. soru icin ben yaptim datayi

    /*
Türkiye Cumhuriyet Merkez Bankası her sene aynı tarihte sonuç olmaya biliyor çünkü bazı yıllar o tarih hafta sonuna gelebiliyor.
Bu yüzden data gelmezse 1 gün sonrasını çekmek mantıklı buluyorum.

*/ 

// console.log(Data)

})()
},[])

const values = {
    currencyArray,
    setCurrencyArray,

}

return <currencyContext.Provider value={values}>{children}</currencyContext.Provider>

}
