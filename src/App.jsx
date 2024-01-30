import { useEffect, useState } from 'react'
//import translate from 'google-translate-api';
import './App.css';
import jsonObj from './assets/common.json'
import axios from 'axios';

const translateJson = async (obj) => {
  if (typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = await translateJson(obj[key]);
    }
    return newObj;
  } else if (typeof obj === 'string') {
    // Translate the string using the Google Translate API
    const { text } = await translateV1(obj);
    return text;
  } else {
    return obj;
  }
};

const translateV1 = async(text) => {
  const result = await axios.post(`https://api-free.deepl.com/v2/translate`,{"text":`${text}`,"target_lang":"DE"} ,{
    headers: {
      Authorization: "DeepL-Auth-Key 242af964-147b-4169-a8fb-97b4bff0f59b:fx",
      "Content-Type": "application/json"
    }
  });
  return result;
}

function App() {
  const [translatedJson, setTranslatedJson] = useState(null);
  const objJson = jsonObj;
  // useEffect(() => {
  //   const translateData = async () => {
  //     // Translate the JSON object when the component mounts
  //     const translatedObject = await translateJson(objJson);
  //     setTranslatedJson(translatedObject);
  //   };

  //   translateData();
  // }, []);
  console.log(translateV1("text"));

  return (
    <div>
      {translatedJson && (
        <pre>{JSON.stringify(translatedJson, null, 2)}</pre>
      )}
    </div>
  );
}

export default App
