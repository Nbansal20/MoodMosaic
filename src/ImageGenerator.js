import './App.css';
import { useState, useEffect } from "react";
import OpenAI from "openai";

function ImageGenerator({ sentiment }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = 'sk-hehe';

  const openai = new OpenAI({
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
      }
    } catch (error) {
      setLoading(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        console.error(`Error generating image: ${error.response.data.error.message}`);
      } else {
        console.error('Error generating image:', error.message);
      }
    }
  };

  useEffect(() => {
    // Automatically generate image when sentiment changes
    if (sentiment) {
      generateImage();
    }
  }, [sentiment]);

  return (
    <div className="container">
      {loading ? (
        <>
        </>
      ) : (
        <>

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