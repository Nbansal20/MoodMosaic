import './App.css';
import React, {useState} from 'react';
import ImageGenerator from './ImageGenerator.js';
import Header from './Header';
import Speech from './Speech';

function App() {
    const [message, setMessage] = useState("");
    const [sentiment, setSentiment] = useState("");
    //const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;
    const API_KEY = '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'

    const [prompt, setPrompt] = useState("");
    const APIBODY ={
      'model': "text-davinci-003",
      'prompt': "What is the sentiment of this message?" + message,
      'max_tokens': 60,
      'top_p': 1.0,
      'frequency_penalty': 0.0,
      'presence_penalty': 0.0,
      // ...
      'prompt': prompt + message,
      // ...
    }
  
    async function handleClick() {
      await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(APIBODY)
      }).then(response => {
        return response.json()
      }).then((data) => {
        console.log(data);
        setSentiment(data.choices[0].text.trim());
      }).catch((error) => {
        console.error(error);
      });
    };
    return (
        <div className="App">
            <Header/>
            <div className = "head-image">
          <img src = {require ('./preview16.jpeg')} alt = "Freedom Blog" />
        </div>
          <header className="App-header">
            {/* <h2 style={{color: "black"}}> Sentiment Analysis Application</h2> */}
            <div className="input">
            <input 
      className="prompt"
       type="text" 
       placeholder="Enter prompt..."
       onChange={(e) => setPrompt(e.target.value)}
  />
            </div>
    
            <div className="Response">
              <button onClick={handleClick}> Get Message sentiment</button>
              <ImageGenerator sentiment={sentiment} />
              <Speech/>
            </div>
          </header>
        </div>
      );
    }
    
    export default App;