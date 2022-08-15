import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import TakeFromCurrecyData from "../utils/TakeFromCurrency";





const currencyContext = createContext()

export const  useCurrencyContext = () => useContext(currencyContext)

export const CurrencyContextProvider  =  ({children}) =>{
    const [currencyArray,setCurrencyArray] = useState(`null`) // 10 senelik cekicegimiz icin array lazim
    const [beforeCurrency,setBeforeCurrency] = useState(null) // birbirlerinden yuzdelik alcagimiz icin gecmis zaman
    const [afterCurrency,setAfterCurrency] = useState(null) // gelecek zaman 

useEffect(()=>{

(
    async ()=>{
      let a = await  TakeFromCurrecyData()
         console.log(a)

    }
)()
    

},[]) // sadece basta currentarrayi tetiklesin diye yarattim
useEffect(()=> {
(async ()=>{

    if (currencyArray == null || currencyArray == undefined) 
    {
          
        console.log(`test`)
        
    } 
        
 

})()
},[currencyArray])
  

/*
Türkiye Cumhuriyet Merkez Bankası her sene aynı tarihte sonuç olmaya biliyor çünkü bazı yıllar o tarih hafta sonuna gelebiliyor.
Bu yüzden data gelmezse 1 gün sonrasını çekmek mantıklı buluyorum.

*/ 


const values = {
    currencyArray,
    setCurrencyArray,
    beforeCurrency,
    setBeforeCurrency,
    afterCurrency,
    setAfterCurrency
}




return <currencyContext.Provider value={values}>{children}</currencyContext.Provider>

}
