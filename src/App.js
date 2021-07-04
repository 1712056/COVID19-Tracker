import CountrySelector from './components/CountrySelector/index';
import Highlight from './components/Highlight/index';
import Summary from './components/Summary/index';
import { useEffect, useState } from 'react';
import {getCountries, getReportByCountry} from './apis/index.js';

function App() {
  const [countries, setContries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report,setReport] = useState([]);
  useEffect(()=>{
    getCountries().then(res=>{
      console.log(res);
      setContries(res.data);
    setSelectedCountryId('vn');

    }
      );
  },[])
  const handleOnChange =(e)=>{
    setSelectedCountryId(e.target.value);
  }
  useEffect(()=>{
    if(selectedCountryId){
      const selectedCountry = countries.find((country)=>country.ISO2.toLowerCase()===selectedCountryId);
      console.log(selectedCountryId);
      getReportByCountry(selectedCountry.Slug).then((res)=>{
        res.data.pop();
        setReport(res.data);
      })
    }
    
  },[countries,selectedCountryId]);
  
  return (
    <>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId} />
      <Highlight report={report}/>
      <Summary report={report}/>
    </>
  );
}

export default App;
