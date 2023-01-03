import React, { useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState("");


  // const textarea = document.getElementById('message');

  const inputPrompt = useRef();
  const tldrSuffix = "\n\nTl;dr";

  const processInput = (inputText)=> {

    // setCurrentPrompt(inputText.replace(/[^\w\s]/gi, ''));
    setCurrentPrompt(inputText);
    // const modifiedInput = `${inputText.replace(/[^\w\s]/gi, '')}${tldrSuffix}`;
    const modifiedInput = `${inputText}${tldrSuffix}`;
    // textarea.value = modifiedInput;
    console.log("Modified Text: ", modifiedInput);
    return modifiedInput;
  };
  const fetchExtractedContent = async () => {
    try {
      setIsExtracting(true);
			const res = await axios.get(`/api/extract`, {
				params: {url}
			});
			const {data} = res;
			const {text} = data;
      // console.log(text);
      console.log("Fetch Result ", processInput(text));
      // return String(text);
      // console.log("My Result: ", currentPrompt);
      setIsExtracting(false);
		} 
     
      catch (err) {
			console.log(err);
		}
	};
  const handleSummaryRequest = async () => {
    const apiInput = processInput(currentPrompt);
    setLoading(true);
    // if(isViaLink) {
    //   console.log("Extract API is running right now")
    //   // var textFromLink = await fetchExtractedContent();
    //   // setCurrentPrompt(textFromLink);
    //   // console.log("My Result ", {currentPrompt});
    // }else {
    //   var textFromPara = processInput(inputPrompt.current.value);
    //   // console.log("Input Prompt to API: ", apiInput);
    // }
    // const apiInput = isViaLink ? textFromLink : textFromPara;
    // console.log("Input Prompt to API: ", apiInput);
    console.log("My Result1: ", currentPrompt);
    try{
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: apiInput}),
      });
      const data = await response.json();
    
    console.log("Result: ", data.result.choices[0].text);

    setLoading(false);
    setSummaryResult(data.result.choices[0].text);
    } catch (err) {
			console.log(err);
		}

    
  };

  const renderButton = () => {
    if(isExtracting) {
      return <h2>Extracting the text for you... Please wait..</h2>;
    }
    if (loading) {
      return <h2>Summarizing the text for you... Please wait..</h2>;
    } else {
      return (
        <div>
          <div className={styles.description}>
            <button className={styles.button} onClick={handleSummaryRequest}>
              Summarize!
            </button>
          </div>
          <div>
            {/* <div className={styles.description}>
              Input Prompt: {currentPrompt}
            </div> */}
            <div className={styles.description}>
              Summary (TL;DR):{summaryResult}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Head>
        <title>TLDR Summarizer</title>
        <meta name="description" content="TLDR-Summarizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Enter the text to summarize!</h1>
          <div className={styles.description}>
            It uses AI to summarize long articles into small and detailed points
            for quick overview!
          </div>
          <textarea
            rows="20"
            cols="80"
            id="message"
            className={styles.placeholder}
            placeholder="Your Article Text Goes Here..."
            onChange={e=>{
              // setIsExtracting(false);
              setCurrentPrompt(e.target.value);
            }}
            value = {currentPrompt}
            ref={inputPrompt}
          ></textarea>
          <h6 className={styles.title + " " + styles.or}>or</h6>
          <input
          type="text"
          className={styles.input}
          placeholder="Paste the article link..."
          onChange={e=> {
            //setIsExtracting(true);
            setUrl(e.target.value);
          }}
          // ref={inputPrompt}
          />
          
          <div className={styles.description}>

            <button className={styles.button} onClick={fetchExtractedContent}>
              Extract From URL!
            </button>
          </div>
          {renderButton()}
        </div>
      </div>
      <footer className={styles.footer}>
        Made by Eesh & Smital for NWS2 &#10084;
      </footer>
    </div>
  );
}
