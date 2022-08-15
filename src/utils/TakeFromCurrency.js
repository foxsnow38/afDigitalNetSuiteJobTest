import axios from "axios"
import  {parseString} from 'xml2js'




let axiosDataCheck = async (year,month,day) =>{
 let result,jsonData, dayIndex = day // bir degisken olarak alıyorum dayı zamanında bir hata le karsılattıgımı hatırlayım garantilemek için
 
try{
   result  = await axios(`https://www.tcmb.gov.tr/kurlar/${year}${month}/${day}${month}${year}.xml`,{
	headers: {
	  'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}	
    }
) // Cors hatasi verdigi icin baska domainde cekiyorum  https://github.com/Freeboard/thingproxy
}
catch{
result  =   await axiosDataCheck(dayIndex+1,month,year) // eger 404 hatasi verirse fonksiyon icinde kendi fonk cagirarak donguye sokuyorum.
}
let  { data } = result 

await parseString(data, function (err, result) {jsonData =result}); // xml i json a ceviriyorum

 return jsonData //artık gelen datayı dönüyorum.
}



const TakeFromCurrecyData = async () =>{
    let currencyDatas = []
    let year= 2011 ,month= 8, day= 15
for (let index = 0; index <10; index++) { // klasik for en iyisi

 let a =  await    axiosDataCheck(`${year}`,`${String(month).length==1?`0`+`${month}`:`${month}` /*basına 0 koyamıyorum o yuzden 1 adetse dıye kontrol edıyorum */ }`,`${day}`)
console.log(a)

   currencyDatas.push(a) // index gonderince strict mode hatasi veriyor.
    year++
}


return currencyDatas

}
export default TakeFromCurrecyData



