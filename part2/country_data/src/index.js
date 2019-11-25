import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Countries from './components/countries';

const App = () => {
  const [input, setInput] = useState('')

  function handleInput(event) {
    event.preventDefault()
    
    setInput('')
  }

  function handleInputChange(event) {
    setInput(event.target.value)
    console.log(event.target.value);
  }
  
  function getCountries() {
    return (
      <ul>
        <Countries input={input}></Countries>
      </ul>
    )
  }

  return (
    <div>
      <div>
        <h2>Search countries</h2>
        <form onSubmit={handleInput}>
          Country name: <input value={input} onChange={handleInputChange}></input>
        </form>
      </div>
      <div>
        <h2>Results</h2>
        {getCountries()}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

