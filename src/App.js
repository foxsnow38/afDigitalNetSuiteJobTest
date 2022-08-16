import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { purple, red } from '@mui/material/colors'
import './App.css';
import { useCurrencyContext } from './context/Context';
import DataTable from './component/Table';
import { Stack } from '@mui/system';
import { Divider, TextField } from '@mui/material';
import e from 'cors';
import { type } from '@testing-library/user-event/dist/type';
///Lib

const App = () =>{

  const  {currencyArray,setCurrencyArray} = useCurrencyContext() //parabirimlerinin datasini cekiyoruz
  const [value, setValue] = React.useState('1'); // tabs lari yonetmek icin
  const [kdvArray,setKdvArray] = React.useState([null,null,null]) // 3 sorudaki girdileri almak icin
  const [calcArray,setCalcArray] =React.useState() // 3 sorudaki girdileri isleyip gondermek icin
 
  const [, updateState] = React.useState(); // zorla domu renderlamak icin yoksa inputlar deger degistirmiyor.
  const forceUpdate = React.useCallback(() => updateState({}), []); // ayni sekilde zorla domu renderlamak icin
  const tabChange = (event, newValue) => { // usteki butonlarin degisiimi icin
    setValue(newValue); 
  };
  const inputChange= async (event,index) =>{ // soldaki inputlarin degisimimnde tetiklenen func
  let array = kdvArray // prev datayi aliyorum
  array[index] = event.target.value // prev datanin icindeki istedigim indexi editliyorum
  setKdvArray(array) // hepsini donderiyorum

let filteredArray=kdvArray  // gelen datayi islemek icin bir degisken yaratiyorum

if(typeof(filteredArray[0])== `object`) filteredArray[0]=  await filteredArray[0].join(`,`) // eger arrayse birlestiriyorum garantilemek icin
if(typeof(filteredArray[1])== `object`) filteredArray[1]= await  filteredArray[1].join(`,`)
if(typeof(filteredArray[2])== `object`) filteredArray[2]=  await filteredArray[2].join(`,`)


if(typeof(filteredArray[0]) != `object`) filteredArray[0] = await filteredArray[0].split(`,`) // sonra ayiriyorum
if(typeof(filteredArray[1]) != `object`) filteredArray[1] = await filteredArray[1].split(`,`)
if(typeof(filteredArray[2]) != `object`) filteredArray[2] =  await filteredArray[2].split(`,`)



if(filteredArray[0].length>1  ) // eger array 1 adetten buyuk degilse calismasin diyorum 1 adet urun icin programi calistirmaya degmez :)
{


if(filteredArray[0].length == filteredArray[1].length && filteredArray[0].length == filteredArray[2].length ){ // burada hepsinin esit olduguna bakiyorum yoksa program stabil calismaz

  for (let index = 0; index < filteredArray[0].length; index++) {  // kdv yi forluyorum
  
    for (let index2 = index+1; index2 < filteredArray[2].length; index2++) { // kodu forluyorum
     
    let kdv=false,kod=false // karsilastirmak icin 2 adet bool yaratiyorum
    if(filteredArray[0][index]==filteredArray[0][index2]) kdv=true // kdv esitse burda direk false ise returnliyede bilirsiniz ancak okunabilirligi azaltmamasi acisinda yapmadim

    if(filteredArray[2][index]==filteredArray[2][index2]) kod=true // kod esitse
    if(kdv&&kod){
      filteredArray[1][index] =parseInt( filteredArray[1][index])+ parseInt(filteredArray[1][index2] ) // ilk arrayde degerleri topla

      filteredArray[0].splice(index2,1) // diger arrayi sil
      filteredArray[1].splice(index2,1)
      filteredArray[2].splice(index2,1)
    }}}
  setCalcArray(filteredArray) // bunuda islenmis dataya yaz
}}
forceUpdate() // zorla renderla
}
 React.useEffect(()=>{
let array = [ [0, 1, 8, 18, 18, 1], [10, 15, 12, 23, 30, 43], [`0071`, `0071`, `0073`, `0073`, `0071`, `0071`]] // baslangicta sorudaki girdi
setKdvArray(array)
 },[])

  if ( currencyArray != null) /* currencyArray ilk 10 ms bos geliyor*/return (
    <>
     
    <Box sx={{ width: '100%', typography: 'body1' }}> 
    <TabContext value={value}>  {/*usteki tab tuslarinin contexti */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={tabChange} >  {/*usteki tab tuslarinin wrapi  */}
      {currencyArray.map((item,index)=>( <Tab key={index} label={`${item["Tarih_Date"]['$']["Tarih"]}`} value={`${index}`} />))} {/*o tab butonlari burada mapleniyor */}
        </TabList>
      </Box>
      {currencyArray.map((item,index)=><TabPanel key={index} value={`${index}`}><DataTable array={item}/></TabPanel>)} {/* burada o tab tuslarinin valuesi ile eslenen tablolar mapleniyor */}
    </TabContext>
  </Box>
<Box style={{marginBottom:`20px`}}>
  <Stack>
<Box> <h3>Soru 3</h3></Box>
<Box> <h3>Lutfen ürünlerin arasına virgul koyalım.</h3></Box>
  <Stack direction={`row`} spacing={2}> {/*stack te css flex gibi denilebilir. */} 
  <Stack spacing={2}>
<Box><TextField label="KDV"  defaultValue={kdvArray[0]} onChange={(e)=>inputChange(e,0)} color="primary"  /></Box> {/* kdvarray*/}
<Box><TextField label="Fiyat"  defaultValue={kdvArray[1]}  onChange={(e)=>inputChange(e,1)} color="primary"  /></Box>
<Box><TextField label="KOD"  defaultValue={kdvArray[2]}  onChange={(e)=>inputChange(e,2)} color="primary"  /></Box>

</Stack>

<Stack spacing={2}>
<Box><TextField   value={calcArray!=undefined&&calcArray[0]}  disabled /></Box> {/*calcarray */}
<Box><TextField     value={calcArray!=undefined&&calcArray[1]} disabled /></Box>
<Box><TextField      value={calcArray!=undefined&&calcArray[2]} disabled /></Box>

</Stack>
  </Stack>
  </Stack>
</Box>


  

  </>
  )
}

export default App;
