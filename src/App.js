import CountrySelector from './components/CountrySelector/index';
import Highlight from './components/Highlight/index';
import Summary from './components/Summary/index';
import { useEffect, useState } from 'react';
import {getCountries, getReportByCountry} from './apis/index.js';
import {sortBy} from 'lodash';
import {Typography, Container} from '@material-ui/core'
import moment from 'moment';
import 'moment/locale/vi';
import '@fontsource/roboto';

moment.locale('vi');

function App() {
  const [countries, setContries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report,setReport] = useState([]);
  useEffect(()=>{
    getCountries().then(res=>{
      console.log(res);
      const countries= sortBy(res.data,'Country');
      setContries(countries);
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
    <Container>
    <Typography variant="h2" component='h2'>
      Số liệu COVID-19
    </Typography>
    <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId} />
      <Highlight report={report}/>
      <Summary report={report} selectedCountryId={selectedCountryId}/>
    </Container>
  );
}

export default App;
