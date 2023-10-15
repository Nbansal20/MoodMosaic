import './App.css';
import React, { useState } from 'react';
import ImageGenerator from './ImageGenerator.js';
import Header from './Header';
import Speech from './Speech';

function App() {
  const [message, setMessage] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [generatingImage, setGeneratingImage] = useState(false);
  const API_KEY = 'key';

  const [prompt, setPrompt] = useState("");
  const APIBODY = {
    'model': "text-davinci-003",
    'prompt': prompt + message,
    'max_tokens': 60,
    'top_p': 1.0,
    'frequency_penalty': 0.0,
    'presence_penalty': 0.0,
  };

  const handleClick = async () => {
    setGeneratingImage(true);
    await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(APIBODY)
    }).then(response => {
      return response.json();
    }).then((data) => {
      console.log(data);
      setSentiment(data.choices[0].text.trim());
      setShowForm(false);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setGeneratingImage(false);
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="head-image">
        <img src={require('./preview16.jpeg')} alt="Freedom Blog" />
      </div>
      <header className="App-header">
        <div className="input">
          {showForm && (
            <input
              className="prompt"
              type="text"
              placeholder="Enter prompt..."
              onChange={(e) => setPrompt(e.target.value)}
            />
          )}
        </div>
        <div className="Response">
          {showForm && (
            <button onClick={handleClick}>Get Message sentiment</button>
          )}
          {!showForm && !generatingImage && (
            <>
              <ImageGenerator sentiment={sentiment} />
            </>
          )}
          {!showForm && generatingImage && (
            <p>Generating Your Mood Mosaic...</p>
          )}
          <Speech />
        </div>
      </header>
    </div>
  );
}

export default App;
