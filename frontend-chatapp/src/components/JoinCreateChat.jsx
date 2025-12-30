import React, { useState } from "react";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";


const JoinCreateChat = () => {
  const [details, setDetails] = useState({
    roomId: "",
    userName: "",
  });

  const {roomId,currentUser,setRoomId,setCurrentUser,setConnected,connected}=useChatContext()
  const navigate = useNavigate()

  function handleFormInputChange(event) {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (details.roomId === "" || details.userName === "") {
      toast.error("Invalid Input");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      //Join chat
      try {
       const room =  await joinChatApi(details.roomId)
       toast.success("Joined..")
       setCurrentUser(details.userName)
        setRoomId(room.roomId)
        setConnected(true)
         navigate("/chat")
      } catch (error) {
        if(error.status==400){
          toast.error(error.response.data)
        }
        else{
          toast.error("Error in joining room")
        }
        console.log(error);
        
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      //create room
      console.log(details);
      // Call API to Create Room on backend
      try {
        const response = await createRoomApi(details.roomId);
        console.log(response);
        toast.success("Room Created Sucessfully");
        // Join the Room 
        setCurrentUser(details.userName)
        setRoomId(response.roomId)
        setConnected(true)
        navigate("/chat")
        //Forward To ChatPage
      } catch (error) {
        console.log(error);
        if (error.status == 400) {
          toast.error("Room Already exist.");
        } else {
          toast("Error In Creating Room");
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border dark:border-gray-700 p-10 w-full flex flex-col gap-5 max-w-md rounded-2xl dark:bg-gray-900">
        <div>
          <img src={chatIcon} alt="chat_image" className="w-20 mx-auto" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-center">
            Join room / Create Room
          </h1>
          <div className="">
            <label htmlFor="" className="block font-medium mb-1 mt-3">
              Your name
            </label>
            <input
              type="text"
              placeholder="Enter The Name"
              name="userName"
              id="name"
              onChange={handleFormInputChange}
              value={details.userName}
              className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="">
            <label htmlFor="" className="block font-medium mb-2 mt-2">
              Room ID/New Room ID
            </label>
            <input
              type="text"
              id="room"
              name="roomId"
              onChange={handleFormInputChange}
              value={details.roomId}
              placeholder="Enter room Id Here"
              className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={joinChat}
              className="px-3 py-2 mt-3 me-3 dark:bg-blue-500 hover:bg-blue-800 rounded"
            >
              Join Room
            </button>
            <button
              onClick={createRoom}
              className="px-3 py-2 mt-3 me-3 dark:bg-orange-500 hover:bg-orange-800 rounded"
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
