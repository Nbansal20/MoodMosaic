import './App.css';
import { useState, useEffect } from "react";
import OpenAI from "openai";

function ImageGenerator({ sentiment }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = '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';

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
        {<p>Loading your mood board.....</p>}
        </>
      ) : (
        <>

          {result.length > 0 ? (
            <div>
            <img className="result-image" src={result} alt="result" />
            <p className="prompt-text">{prompt}</p>
          </div>
          ) : (
            <>
            {<p>I can't find an image at the moment, I need to learn more, sorry about that!</p>}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ImageGenerator;