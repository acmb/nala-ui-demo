import { useState, useEffect, createRef } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import './index.css';

function Form(props) {
  const { read } = props;
  const [conversation, setConversation] = useState('');
  const [question, setQuestion] = useState('');
  const [ask, setAsk] = useState(false);
  const conversationBox = createRef();

  const { transcript, listening } = useSpeechRecognition();

  const onChangeText = (e) => {
    setQuestion(e.target.value);
  };

  const onSubmit = () => {
    setConversation(conversation + `You: ${question}\n`)
    setAsk(true);
  }

  const msg = new SpeechSynthesisUtterance()

  const synth = window.speechSynthesis;
  
  const voices = synth.getVoices();

  msg.voice = voices[props.language.voice];

  const speechHandler = (text) => {
    if (read) {
      msg.text = text;
      synth.speak(msg);
    }
  }

  const getAnswer = async () => {
    let data = await fetch(`http://ai1.npaw.com:8000/nala?query=${question}&module=sql`);
    data = await data.json();
    const updatedConversation = conversation + `NaLa: ${data.extra.text}\n`
    setConversation(updatedConversation);
    setQuestion('');
    speechHandler(data.extra.text);
  }

  useEffect(() => {
    if (ask) {
      getAnswer();
      setAsk(false);
      conversationBox.current.scrollTop = conversationBox.current.scrollHeight;
    }
  }, [ask]);

  useEffect(() => {
    setQuestion(transcript);
  }, [listening]);

  return (
    <form>
      <label>
        <h3>Conversation:</h3>
        <textarea
          ref={conversationBox}
          readOnly={true}
          style={{background: 'lightgrey'}}
          value={conversation}
        />
      </label>
      <label>
        <h3>Question:</h3>
        <textarea
          onChange={onChangeText}
          value={question}
        />
      </label>

      <div className="FormButtons">
        <input type="button" value="Submit" onClick={onSubmit} />
      </div>
    </form>
  );
}

export default Form;
