import React, { useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState("");

  const inputPrompt = useRef();
  const tldrSuffix = "\n\nTl;dr";

  const processInput = (inputText) => {
    setCurrentPrompt(inputText);
    const modifiedInput = `${inputText}${tldrSuffix}`;
    return modifiedInput;
  };

  const handleSummaryRequest = async () => {
    const apiInput = processInput(inputPrompt.current.value);

    console.log("Input Prompt to API: ", apiInput);
    setLoading(true);

    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: apiInput }),
    });

    const data = await response.json();
    console.log("Result: ", data.result.choices[0].text);

    setLoading(false);
    setSummaryResult(data.result.choices[0].text);
  };

  const renderButton = () => {
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
            className={styles.placeholder}
            placeholder="Your Article Text Goes Here..."
            ref={inputPrompt}
          ></textarea>
          {renderButton()}
        </div>
      </div>
      <footer className={styles.footer}>
        Made by Eesh & Smital for NWS2 &#10084;
      </footer>
    </div>
  );
}
