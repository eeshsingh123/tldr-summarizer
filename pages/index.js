import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState("");

  // const textarea = document.getElementById('message');

  const inputPrompt = useRef();
  const tldrSuffix = "\n\nTl;dr";

  const processInput = (inputText) => {
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
        params: { url },
      });
      const { data } = res;
      const { text } = data;
      // console.log(text);
      console.log("Fetch Result ", processInput(text));
      // return String(text);
      // console.log("My Result: ", currentPrompt);
      setIsExtracting(false);
      moveToSummary();
    } catch (err) {
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
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  const renderButton = () => {
    // if(isExtracting) {
    //    return <h2>Extracting the text for you... Please wait..</h2>;
    // }
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
              <span style={{ color: "#45424b" }}> Summary</span> {summaryResult}
            </div>
          </div>
        </div>
      );
    }
  };
  const myDiv = useRef(null);

  const handleClick = () => {
    myDiv.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const summary = useRef(null);

  const moveToSummary = () => {
    summary.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <Head>
        <title>TLDR Summarizer</title>
        <meta name="description" content="TLDR-Summarizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.overlay}></div>
      <div className={styles.big_wrapper}>
        <div className={styles.showcase_area}>
          <div className={styles.left}>
            <div className={styles.big_title}>
              <h1>
                Quick <span style={{ color: "#5761e7" }}> Summaries,</span>
              </h1>
              <h1>Big Time Saving!</h1>
            </div>
            <p className={styles.text}>
              <strong>
                Do you struggle to keep up with long articles, emails, or
                reports?
              </strong>{" "}
              <br></br>Our summarization app makes it easy to quickly get the
              main points of any text or link. Simply input the content and our
              app will generate a condensed summary in just a few moments.
            </p>
            <button className={styles.button} onClick={handleClick}>
              {" "}
              Try it!{" "}
            </button>
          </div>

          <div className={styles.right}>
            <Image
              src="/person.svg"
              className={styles.person}
              width="200"
              height="500"
            ></Image>
          </div>
        </div>
        <hr className={styles.hr}></hr>
        <div className={styles.hero}>
          <h1>
            Key benefits of<span style={{ color: "#5761e7" }}> TL;DR</span>{" "}
          </h1>
          <ul className={styles.cards}>
            <li className={styles.cards_item}>
              <div className={styles.card}>
                <div className={styles.card_image}>
                  {/* <img className={styles.img} src="https://picsum.photos/500/300/?image=10"/>  */}
                  <Image
                    src="/cpu-3.png"
                    className={styles.img}
                    width="230"
                    height="10"
                  ></Image>
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>
                    AI-powered summarization
                  </h2>
                  <p className={styles.card_text}>
                    {" "}
                    Our app uses advanced machine learning and algorithms to
                    identify and extract the most important information from
                    your text.
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.cards_item}>
              <div className={styles.card}>
                <div className={styles.card_image}>
                  <Image
                    src="/click.png"
                    className={styles.img}
                    width="230"
                    height="10"
                  ></Image>
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>Easy to use</h2>
                  <p className={styles.card_text}>
                    The app should have a simple and intuitive interface that
                    makes it easy for users to input texts and links and view
                    summaries.
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.cards_item}>
              <div className={styles.card}>
                <div className={styles.card_image}>
                  <Image
                    src="/deadline.png"
                    className={styles.img}
                    width="230"
                    height="10"
                  ></Image>
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>Fast and Efficient</h2>
                  <p className={styles.card_text}>
                    Our app uses advanced algorithms to quickly and efficiently
                    summarize texts and links, so you can get your summaries in
                    just a few seconds.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <hr className={styles.hr}></hr>
        <div className={styles.form}>
          <div>
            <h1 ref={myDiv} className={styles.title}>
              Enter the text to summarize!
            </h1>
          </div>
          <fieldset className={styles.fieldset}>
            <label className={styles.label} for="name">
              Paste The Article Link Here...
            </label>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => {
                //setIsExtracting(true);
                setUrl(e.target.value);
              }}
            />
            <button
              className={styles.button}
              onClick={() => {
                fetchExtractedContent();
              }}
            >
              Extract From URL!
            </button>
            {isExtracting ? (
              <h2>Extracting the text for you... Please wait..</h2>
            ) : null}

            <h2>OR</h2>
            <br></br>

            <label className={styles.label} for="bio">
              Your Article Text Goes Here...
            </label>
            <textarea
              rows="20"
              cols="80"
              className={styles.input}
              onChange={(e) => {
                // setIsExtracting(false);
                setCurrentPrompt(e.target.value);
              }}
              value={currentPrompt}
              ref={inputPrompt}
            ></textarea>
          </fieldset>
          {renderButton()}
        </div>

        {/* <div className={styles.main}>
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
      </div> */}
        <footer ref={summary} className={styles.footer}>
          Made by Eesh & Smital for NWS2 &#10084;
        </footer>
      </div>
    </div>
  );
}
