import { useState } from 'react';
import Form from './containers/Form';
import Dictaphone from './components/Dictaphone';
import './App.css';

function App() {
  const options = [
    { label: "English", value: "en-US", voice: 33 },
    { label: "Catalan", value: "ca", voice: 29 },
    { label: "Castellano", value: "es-ES", voice: 29 },
    { label: "Português", value: "pt-PT", voice: 13 }
  ];

  const [speech, setSpeech] = useState(true);
  const [read, setRead] = useState(true);
  const [language, setLanguage] = useState(options[0]);

  const speechLabel = speech ? "Disable Speech Recognition" : "Enable Speech Recognition";
  const readLabel = read ? "Disable Answer Reading" : "Enable Answer Reading";

  const onOptionChange = (event) => {
    setLanguage(options.find((option) => option.label === event.target.value));
  }

  return (
    <div className="App">
      <div className="Options">
        <button onClick={() => setSpeech(!speech)}>{speechLabel}</button>
        <button onClick={() => setRead(!read)}>{readLabel}</button>
        <select onChange={onOptionChange}>
            {options.map((option, index) => {
                return <option key={index} selected={option.value === language.value ? true : false}>
                    {option.label}
                </option>
            })}
        </select>
      </div>

      <Form read={read} language={language}/>

      {speech && <Dictaphone language={language.value}/>}
    </div>
  );
}

export default App;
