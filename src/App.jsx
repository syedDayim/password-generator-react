import { useState, useCallback, useEffect } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(15);
  const [password, setPassword] = useState("");
  const [addNumbers, setAddNumbers] = useState(false);
  const [addSymbols, setAddSymbols] = useState(false);


  const handleSliderChange = (event) => {
    setLength(parseInt(event.target.value)); // Update the length state when slider value changes
  };

  const handleNumberChange = (event) => {
    setAddNumbers(!addNumbers);
  }
  const handleSymbolChange = (event) => {
    setAddSymbols(!addSymbols);
  }

 const generatePassword = useCallback(() =>{
  let password = "";
  let newPass = "";
  const numbers = "1234567890";
  const symbols = "<>?:{}[]!@#$%^&*()_+-=";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyx";


  password += characters

  if(addNumbers){
    password += numbers
  }
  if(addSymbols){
    password += symbols
  }

  for(let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * password.length);

    newPass += password.charAt(randomNumber)

  }

  setPassword(newPass)
  



 },[length, addNumbers, addSymbols])
  


 useEffect(() => {
    generatePassword();
  }, [length, addNumbers, addSymbols]); 




  const handleCopyClick = () => {
    navigator.clipboard.writeText(password);
    // Optionally, you can provide user feedback that the text has been copied
    alert("Password copied to clipboard!");
  };
  return (
    <>
      <div className="container">
        
        <div className="row-1">
          <input
            className='input-feild'
            type="text"
            value={password}
          />
          <button className='copy-btn'
          onClick={handleCopyClick}
          >
            Copy
          </button>
        </div>

        <div className="row-2">
          <div className="range-length">
          <label htmlFor="length">Length ({length})</label>
          <input 
          type="range"
          name="length" 
          id="length" 
          value={length}
          min={1}
          max={15}
          onChange={handleSliderChange}

          />
          </div>

          <div className="range-length">
          <input type="checkbox" name="length" id="add-numbers"
            onChange={handleNumberChange}
          />
          <label htmlFor="add-numbers">Include Numbers</label>
          </div>

          <div className="range-length">
          <input type="checkbox" name="length" id="add-symbols"
            onChange={handleSymbolChange}
          />
          <label htmlFor="add-symbols">Include Symbols</label>
          </div>
        </div>


      </div>
    </>
  )
}

export default App
