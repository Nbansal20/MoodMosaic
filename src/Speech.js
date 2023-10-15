import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {BsFillMicFill } from 'react-icons/bs';
import {BiReset} from 'react-icons/bi';
import {BsFillStopCircleFill} from 'react-icons/bs';
import ImageGenerator from './ImageGenerator.js';

const Speech = ({ setMessageInApp }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [message, setMessage] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [prompt, setPrompt] = useState("");
  const API_KEY = 'key';
  useEffect(() => {
    setMessage(transcript);
    // console.log("Use effect is being called!");
    // Call the setMessageInApp function to pass the message to App.js
    setMessageInApp(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


 


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
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}><BsFillMicFill className="microphone-icon"/></button>
      <button onClick={SpeechRecognition.stopListening}><BsFillStopCircleFill onClick={SpeechRecognition.stopListening}/></button>
      <button>
          <BiReset onClick={resetTranscript}/></button>
      <p>{transcript}</p>
      <div className="Response">
          {showForm && (
            <button onClick={handleClick}>Get Message sentiment</button>
          )}
          {!showForm && !generatingImage && (
            <>
              <ImageGenerator sentiment={sentiment} prompt={transcript}/>
            </>
          )}
          {!showForm && generatingImage && (
            <p>Generating Your Mood Mosaic...</p>
          )}
        </div>
    </div>
  );
};
export default Speech;