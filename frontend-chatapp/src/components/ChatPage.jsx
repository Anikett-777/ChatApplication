// import React, { useEffect, useRef, useState } from "react";
// import { MdAttachFile, MdSend } from "react-icons/md";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import SockJS from "sockjs-client";
// import { baseURL } from "../config/AxiosHelper";
// import toast from "react-hot-toast";
// import { Stomp } from "@stomp/stompjs";
// import { getMessages } from "../services/RoomService";

// const ChatPage = () => {
//   const { roomId, currentUser, connected } = useChatContext();
//   // console.log(roomId);
//   // console.log(currentUser);
//   // console.log(connected);

//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!connected) {
//       navigate("/");
//     }
//   }, [connected, roomId, currentUser]);

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef(null);
//   const chatBox = useRef(null);
//   const [stompClient, setStompClient] = useState(null);
  

//   //Page Init;
//   //Message Load Here

//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const messages = await getMessages(roomId);

//         setMessages(messages);
//       } catch (error) {}
//     }
//     loadMessages();
//   }, []);

//   //To Init Stomp Client
//   //Subscribe
//   useEffect(() => {
//     const connectWebSocket = () => {
//       // Make Sock Js Object
//       const sock = new SockJS(`${baseURL}/chat`);

//       const client = Stomp.over(sock);
//       client.connect({}, () => {
//         setStompClient(client);
//         toast.success("Connected..");

//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           console.log(message);
//           const newMessage = JSON.parse(message.body);
//           setMessages((prev) => [...prev, newMessage]);
//         });
//       });
//     };
//     connectWebSocket();
//   }, [roomId]);

//   //Send Message handle
//   const sendMessage = async () => {
//     if (stompClient && connected && input.trim()) {
//       console.log(input);

//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId,
//       };

//       stompClient.send(
//         `/app/sendMessage/${roomId}`,
//         {},
//         JSON.stringify(message)
//       );
//       setInput("");
//     }
//   };

//   return (
//     // Header Section
//     <div className="">
//       {/* This is a Header Portion  */}
//       <header className="dark:border-gray-700 dark:bg-gray-900 border py-5 shadow flex justify-around h-20 items-center fixed w-full rounded">
//         {/* Rooom Name Container */}
//         <div>
//           <h1 className="text-xl font-semibold">
//             Room : <span>Family</span>
//           </h1>
//         </div>

//         {/* Username  container*/}
//         <div>
//           <h1 className="text-xl font-semibold">
//             User: <span>Aniket Kadam</span>
//           </h1>
//         </div>

//         {/* Button : Leave Room*/}
//         <div>
//           <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">
//             Leave Room
//           </button>
//         </div>
//       </header>

//       {/* Moving Screen  */}
   
//       <main
//         // ref={chatBoxRef}
//         className="py-20 px-10   w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto "
//       >
//         {messages.map((message, index) => (

          
//           <div
//             key={index}
//             className={`flex ${
//               message.sender === currentUser ? "justify-end" : "justify-start"
//             } `}
//           >
//             <div
//               className={`my-2 ${
//                 message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
//               } p-2 max-w-xs rounded`}
//             >
//               <div className="flex flex-row gap-2">
//                 <img
//                   className="h-10 w-10"
//                   src={"https://avatar.iran.liara.run/public/43"}
//                   alt=""
//                 />
//                 <div className="flex flex-col gap-1">
//                   <p className="text-sm font-bold">{message.sender}</p>
//                   <p>{message.content}</p>
//                   <p className="text-xs text-gray-400">
//                     {/* {timeAgo(message.timeStamp)} */}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>
      

//       {/* Input Message container */}
//       <div className="fixed bottom-2 w-full h-16 ">
//         <div className="h-12 w-1/2 rounded-full flex items-center justify-between mx-auto gap-2 dark:bg-gray-900 pr-10 py-2 focus:right-0 ">
//           <input
//             value={input}
//             onChange={(e) => {
//               setInput(e.target.value);
//             }}
//             type="text"
//             placeholder="Type Your Message Here..."
//             className="px-5 dark:border-gray-600  focus:outline-none dark:bg-gray-800 rounded-4xl w-full h-12"
//           />
//           <div className="flex justify-between gap-2">
//             <button className="dark:bg-purple-600 w-14 h-12 flex justify-center items-center rounded-full   ">
//               <MdAttachFile size={20} />
//             </button>
//             <button
//               onClick={sendMessage}
//               className="dark:bg-green-600 w-14 h-12 flex justify-center items-center rounded-full   "
//             >
//               <MdSend size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";
const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();
  // console.log(roomId);
  // console.log(currentUser);
  // console.log(connected);

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  //page init:
  //messages ko load karne honge

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        // console.log(messages);
        setMessages(messages);
      } catch (error) {}
    }
    if (connected) {
      loadMessages();
    }
  }, []);

  //scroll down

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  //stompClient ko init karne honge
  //subscribe

  useEffect(() => {
    const connectWebSocket = () => {
      ///SockJS
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);

        toast.success("connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);

          const newMessage = JSON.parse(message.body);

          setMessages((prev) => [...prev, newMessage]);

          //rest of the work after success receiving the message
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }

    //stomp client
  }, [roomId]);

  //send message handle

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);

      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput();
    }

    //
  };

  function handleLogout() {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div className="">
      {/* this is a header */}
      <header className="dark:border-gray-700  fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
        {/* room name container */}
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>{roomId}</span>
          </h1>
        </div>
        {/* username container */}

        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        {/* button: leave room */}
        <div>
          <button
            onClick={handleLogout}
            className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full"
          >
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="py-20 px-10   w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto "
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            } `}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
              } p-2 max-w-xs rounded`}
            >
              <div className="flex flex-row gap-2">
                <img
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/43"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* input message container */}
      <div className=" fixed bottom-4 w-full h-16 ">
        <div className="h-full  pr-10 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here..."
            className=" w-full  dark:border-gray-600 b dark:bg-gray-800  px-5 py-2 rounded-full h-full focus:outline-none  "
          />

          <div className="flex gap-1">
            <button className="dark:bg-purple-600 h-10 w-10  flex   justify-center items-center rounded-full">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="dark:bg-green-600 h-10 w-10  flex   justify-center items-center rounded-full"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
