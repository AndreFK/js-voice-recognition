import React, {useState, useEffect}from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var tts = window.speechSynthesis;
var stop = false;

const recognition = new SpeechRecognition();

var utterThis = new SpeechSynthesisUtterance();


recognition.start();

function App() {
  const [count, setCount] = useState(0);

  var response = "Inicio";

  const voiceCommands = () => {
    //on start
    recognition.onstart = () => {
      console.log('Voice is activated');
    }

    //Do something on result
    recognition.onresult = (e) => {
      let current = e.resultIndex;

      let transcript = e.results[current][0].transcript;
      let mobileRepeatBug = (current === 1) && transcript === (e.results[0][0].transcript);
      
      console.log("Transcript: " + transcript);

      if(!mobileRepeatBug){
        if(transcript === 'next' || transcript === " next"){
          setCount(count + 1);
        }

        if(transcript === 'back' || transcript === ' back'){
          setCount(count - 1);
        }

        if(transcript === "Hello computer" || transcript === " Hello computer"){
          response = "No me hables en ingles pinche gringo puto";
          var voices = window.speechSynthesis.getVoices()
          utterThis.voice = voices[7];
          utterThis.text = response;
          console.log("Res: " + response);
          tts.speak(utterThis);
          response = "";
        }
        if(transcript === "hola computadora" || transcript === " hola computadora"){
          response = "Asi es como me gusta perro";
          voices = window.speechSynthesis.getVoices()
          utterThis.voice = voices[7];
          utterThis.text = response;
          console.log("Res: " + response);
          tts.speak(utterThis);
          response = "";
        }

        if(transcript === "stop" || transcript === " stop"){
          recognition.stop();
          stop = true;
        }      
      }

    }

    recognition.onend = function () {
      if(!stop){
        setTimeout(() => {
          recognition.start();
        }, 90);  
      }
      else{
        console.log("Stopped for good");
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
    }
  }

  useEffect(() => {
    voiceCommands();
  })

  return (
    <div className="App">
       
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default App;
