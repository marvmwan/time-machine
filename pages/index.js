import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState("")
  const [generatingOutput, setGeneratingOutput] = useState(false)
  const [apiOutput, setApiOutput] = useState("")

  const changeUserInput = (event) => {
    setUserInput(event.target.value)
  }

  const callGenerateEndpoint = async () => {
    setGeneratingOutput(true)

    console.log("Generating OpenAI output...")

    try {
      console.log(userInput)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });


      const data = await response.json()
      const { output } = await data

      console.log("OpenAI replied...", output.text)

      let promptBox = document.getElementById('prompt-box-1')
      promptBox.select()
      setApiOutput(output.text.trim())
      setGeneratingOutput(false)
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Hi, I'm Benjamin Franklin</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask me anything!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            id='prompt-box-1'
            value={userInput}
            onChange={changeUserInput}
            onclick="this.select()"
          />
          <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>Generate</p>
              </div>
            </a>
          </div>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Answer</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;