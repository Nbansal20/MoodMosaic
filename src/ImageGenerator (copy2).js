import './App.css';
import { useState } from "react";
import OpenAI from "openai";

function ImageGenerator({ sentiment }) {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const API_KEY = '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'
  
    const openai = new OpenAI({
      //apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true,
    });
  
    const generateImage = async () => {
      setLoading(true);
    
      try {
        const res = await openai.images.generate({
          prompt: `${sentiment}`,
          n: 1,
          size: "256x256",
        });
    
        setLoading(false);
    
        if (res.data && res.data[0].url) {
          setResult(res.data[0].url);
        } else {
          console.error('Error: Unexpected response structure:', res);
          console.log(res.data);
          console.log(res.data[0]);
          console.log(res.data[0].url);
        }
      } catch (error) {
        setLoading(false);
        
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
          console.error(`Error generating image: ${error.response.data.error.message}`);
        } else {
          console.error('Error generating image:', error.message);
        }
      }
    };

    return (
        <div className="container">
          {loading ? (
            <>
              <h3>Generating image... Please Wait...</h3>
            </>
          ) : (
            <>
              <h2>Generate an Image using Open AI API</h2>
    
              <textarea
                className="app-input"
                placeholder='Search'
                onChange={(e) => setPrompt(e.target.value)}
                rows="10"
                cols="100"
              />
    
              <button onClick={generateImage}>Generate an Image</button>
    
              {result.length > 0 ? (
                <img className="result-image" src={result} alt="result" />
              ) : (
                <>
                </>
              )}
            </>
          )}
        </div>
    );
}

export default ImageGenerator;
