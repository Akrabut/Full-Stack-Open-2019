import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = (props) => {
  return (
    props.country.name
  )
}

const Countries = (props) => {
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log(response);
        setCountries(response.data)
      })
  }, [])
  
  function handleSingleCountry(cntrs) {
    return (
      <div>
        <h2>{cntrs[0].name}</h2>
        <p>{cntrs[0].capital}</p>
        <p>{cntrs[0].population}</p>
        Languages: 
        <ol>
          {cntrs[0].languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
        </ol>
        <img src={cntrs[0].flag} alt={`flag of ${cntrs[0].name}`}></img>
      </div>
    )
  }

  function filterCountries() {
    return countries.filter((country) => country.name.toLowerCase().includes(props.input.toLowerCase()))
  }

  const cntrs = filterCountries()
  if (cntrs.length === 1) return handleSingleCountry(cntrs)
  return (
    cntrs.length < 11 || !props.input ?
      filterCountries().map((country) => <li key={country.name}><Country country={country}></Country></li>)
    :
    'Too many matches, specify another filter'
  )
}

export default Countries