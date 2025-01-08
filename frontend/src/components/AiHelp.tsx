import React, { useState, useRef, useEffect } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Person, Send } from '@mui/icons-material';
import axios from 'axios';
import Loader from './Loader/Loader.js';

const AiHelp = () => {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const keyHandler = async (e) => {
    if (e.key === "Enter" && !loader) {
      clickHandler();
    }
  };

  const clickHandler = async () => {
    if (value !== "") {
      try {
        setLoader(true);
        const newMessage = {
            role: "user",
            parts: [{ text: value }]
          };
          setHistory(prev => [...prev, newMessage]);
        const response = await axios.post("http://localhost:3001/api/chat", {
          history: history,
          message: value
        });
        setLoader(false);
        
        setHistory(prev => [
          ...prev,
          { role: "model", parts: [{ text: response.data.text }] }
        ]);
        setValue("");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      {loader && (<Loader />)}
      
      <div className='sticky top-0 h-full overflow-y-scroll'>
        <div className='sticky left-0 top-0 z-10 w-full bg-gray-400 text-[#4e64f7] text-ellipsis text-xl font-bold text-center mb-2 lg:text-3xl lg:h-auto lg:pb-1'>AiHelp</div>
        <div className='w-full h-[90vh] border-2 border-gray-100 pb-1'>
        (
          <div className="flex justify-center items-center h-full overflow-hidden">
            <div>
              <p className="text-lg font-semibold mb-2 text-center">Ask the AI Tutor</p>
              <img  src="https://th.bing.com/th?id=OIP.SDKj_sVAdMs-ek212EOoPQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="AI Tutor" className="w-20 h-20 rounded-full self-center " />
            </div>
          </div>
        )
          {history && (
            <>
              {history.map((chat, index) => (
                <div key={index}>
                  {chat.role === "model" && (
                    <div className='border-zinc-500 border-2 rounded-tr-xl rounded-br-xl mr-5'>
                      <div className='flex bg-gray-50'>
                        <SmartToyIcon className='m-1' />
                        <p className='font-bold text-lg text-teal-600 align-middle py-1'>Ai</p>
                      </div>
                      <div className='bg-gray-200 rounded-lg font-serif text-md border-1 border-gray-300 p-2 overflow-auto'>
                        <pre>
                        {chat.parts[0].text}
                        </pre>
                      </div>
                    </div>
                  )}
                  {chat.role === "user" && (
                    <div className='border-zinc-500 border-2 rounded-tl-lg rounded-bl-lg ml-5 mt-2'>
                      <div className='flex bg-gray-50 justify-end'>
                        <Person className='m-1' />
                        <p className='font-bold text-lg text-teal-600 align-middle py-1 mr-2'>user</p>
                      </div>
                      <div className='bg-gray-200 rounded-lg font-serif text-md border-1 border-gray-300 p-2'>
                        {chat.parts[0].text}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div ref={chatEndRef}></div>
            </>
          )}
          

          
          <div className="h-11"></div>
          <div className='fixed bottom-0 flex bg-gray-200 w-full px-2 h-10 rounded-full z-10 mt-3 focus:border-green-200 focus:border-2 hover:border-2 hover:border-green-400'>
            <input className='bg-transparent w-full outline-none focus:outline-none ' placeholder="ask your doubt with vidyaverse ai tutor" value={value} onKeyDown={keyHandler} type='text' onChange={changeHandler} />
            <Send sx={{ fontSize: 30 }} className='mt-1 pt-1' onClick={clickHandler} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AiHelp;
