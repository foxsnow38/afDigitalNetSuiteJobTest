
import  React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useCurrencyContext } from '../context/Context';

function DataTable({array}) { // arrayi aliyorum
const [tableArray,setTableArray] = useState(null) //arrayi tablelamak icin
const [tableStatus,setTableStatus] =  useState(false) // useeffecti tetiklemek icin yarattim
const[rows,setRows] = useState(null) // table daki siralar

useEffect(()=>setTableStatus(false),[]) // ilk basta tableStatus effectini tetiklemesi icin
useEffect(()=>{
    (async()=>{ 
        if(tableArray!= null){  
        const tableArrayLength = tableArray["Tarih_Date"]["Currency"].length 
        for (let index = 0; index <tableArrayLength; index++) {

             let items = [... tableArray["Tarih_Date"]["Currency"]]; // arrayi aliyorum
             
              let itemx = items[index]; // icinden istedigimi seciyorum
           
              itemx.id = index // onun icine id gibi eklemeleri yapiyorum meterial ui libi id siz almiyor
              itemx.Kod= itemx["$"].Kod // kodunun dolarin icinden cikariyorum
             
             items[index] = itemx; // sonra geri icine atiyorum
              
             let dataTableFormat=  {...tableArray} // buradada aynisin yapiyorum arrayi cekip
                dataTableFormat["Tarih_Date"]["Currency"]=items // icinden istedigim yeri degistirip
          
               await setTableArray(dataTableFormat) // sonra arrayi setliyorum
            await setRows(tableArray["Tarih_Date"]["Currency"]) // rowuda burda setliyorum

            }
        }
        else{

            setTableArray(array) // tabllearrye deger gelene kadar
            setTableStatus(!tableStatus) // ac kapa yapip effekti tetikliyorum
        }
        
        
        
        })()
},[tableStatus])



const columns = [ // sutunlarin basliklari 
    
    { field: 'id', headerName: 'İD', width: 10 }, //field gelen datadi objedeki adi 
    { field: 'Isim', headerName: 'ISIM', width: 70 }, // headername tablodaki adi
    { field: 'Kod', headerName: 'KOD', width: 130 }, // css width
    { field: 'ForexBuying', headerName: 'ALIS', width: 150 },
    {field: 'ForexSelling', headerName: 'Satis', type: 'number', width:150,},
    {field: 'Inflation', headerName: 'Enflasyon', type: 'number', width: 90,},
  ]
  if(tableArray!=null && rows!=null)  return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />

          
        </div>
      );
}

export default DataTable