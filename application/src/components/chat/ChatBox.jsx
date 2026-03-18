"use client";

import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Message from "./Message";
import { PulseLoader } from "react-spinners";

export default function ChatBox() {
  const input = useRef(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (history.length && history[0][0] == "human") {
      setLoading(true);
      setMessage("");
      const ordered = [...history]; ordered.reverse();
      axios.post(`/api/chat`, {history: ordered, message})
        .then(({data: {response}}) => setHistory([
         ["ai", response],  ...history, 
        ]))
        .finally(() => setLoading(false));
    }
  }, [history]);

  const send = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!message || loading) return;
    setHistory([
      ["human", message], ...history, 
    ]);
  }

  const upload = () => {
    if (uploading) return;
    setUploading(true);
    const data = new FormData();
    for (let file of files) {
      data.append("files", file);
    }
    return axios.post("/api/upload", data)
        .then((res) => {
          input.current.value = [];
          setFiles([]);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setUploading(false));
  }

  return <>
    <div className="h-full w-full overflow-y-auto flex flex-col-reverse gap-3 rounded-lg">
      {loading && <Message role={"ai"} message={<PulseLoader size={7} color="gray" />} />}
      {
        history.length ?
        history.map(([role, message], i) => <Message
          key={i} role={role} message={message} 
        />) :
        <div className="w-full h-full select-none text-gray-400 flex items-center justify-center text-center text-wrap">Send me a message to start chatting</div>
      }
    </div>
    <hr />
    <div className="flex gap-2 items-center">
      <input ref={input} className="py-[9px]" type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} />
      <button className={`px-6 ${uploading ? 'bg-blue-400 cursor-not-allowed' : ''}`} onClick={upload}>Upload</button>
    </div>
    <form className="flex flex-col gap-3 h-fit" onSubmit={send}>
      <input placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} />
      <button className={`${loading ? 'bg-blue-400 cursor-not-allowed' : ''}`} type="submit">Send Message</button>
    </form>
  </>
}
