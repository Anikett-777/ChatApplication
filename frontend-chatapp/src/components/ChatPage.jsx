import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import toast from "react-hot-toast";
import { Stomp } from "@stomp/stompjs";

const ChatPage = () => {
  const { roomId, currentUser, connected } = useChatContext();
  // console.log(roomId);
  // console.log(currentUser);
  // console.log(connected);

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [message, setMessages] = useState([
    {
      content: "hii",
      sender: "Aniket",
    },
    {
      content: "hii",
      sender: "Aniket",
    },
    {
      content: "hii",
      sender: "Vaishnavi",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBox = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  // const [roomId, setRoomId] = useState("");
  // const [currentUser]=useState("Aniket")

  //Page Init;
  //Message Load Here

  //To Init Stomp Client
  //Subscribe
  useEffect(() => {
    const connectWebSocket = () => {
      // Make Sock Js Object 
      const sock = new SockJS(`${baseURL}/chat`);

      const client = Stomp.over(sock)
      client.connect({},()=>{

        setStompClient(client);
        toast.success("Connected..");

        client.subscribe(`/topic/room/${roomId}`,(message)=>{
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessages((prev)=>[...prev,newMessage])
          
        })
      })

    };
    connectWebSocket();
  }, [roomId]);

  //Send Message handle
    const sendMessage = async ()=>{
      if(stompClient && connected && input.trim() ){
        console.log(input);

        const message={
          sender:currentUser,
          content:input,
          roomId:roomId
        }

        stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
        setInput("");
        
      }
  }

  return (
    // Header Section
    <div className="">
      {/* This is a Header Portion  */}
      <header className="dark:border-gray-700 dark:bg-gray-900 border py-5 shadow flex justify-around h-20 items-center fixed w-full rounded">
        {/* Rooom Name Container */}
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>Family</span>
          </h1>
        </div>

        {/* Username  container*/}
        <div>
          <h1 className="text-xl font-semibold">
            User: <span>Aniket Kadam</span>
          </h1>
        </div>

        {/* Button : Leave Room*/}
        <div>
          <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">
            Leave Room
          </button>
        </div>
      </header>

      {/* Moving Screen  */}

      <main className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto">
        {/* Message Container */}

        {message.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender == currentUser ? "justify-end" : "justify-start"
            } `}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
              } p-2 max-w-xs rounded `}
            >
              <div className="flex flex-row gap-2">
                <img
                  className="h-10 w-10"
                  src={
                    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                  }
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input Message container */}
      <div className="fixed bottom-2 w-full h-16 ">
        <div className="h-12 w-1/2 rounded-full flex items-center justify-between mx-auto gap-2 dark:bg-gray-900 pr-10 py-2 focus:right-0 ">
          <input
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
            type="text"
            placeholder="Type Your Message Here..."
            className="px-5 dark:border-gray-600  focus:outline-none dark:bg-gray-800 rounded-4xl w-full h-12"
          />
          <div className="flex justify-between gap-2">
            <button className="dark:bg-purple-600 w-14 h-12 flex justify-center items-center rounded-full   ">
              <MdAttachFile size={20} />
            </button>
            <button onClick={sendMessage} className="dark:bg-green-600 w-14 h-12 flex justify-center items-center rounded-full   ">
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
