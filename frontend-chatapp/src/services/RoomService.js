// import { httpClient } from "../config/AxiosHelper"

// export const createRoomApi = async (roomDetails)=>
// {
//    const respone = await httpClient.post(`/api/v1/rooms`,roomDetails,{
//         headers:{
//             "Content-Type":"text/plain",
            
//         },
    
// });
//     return respone.data;
// };

import { httpClient } from "../config/AxiosHelper";

export const createRoomApi = async (roomId) => {
  const response = await httpClient.post("/api/v1/rooms", {
    roomId: roomId,
  });
  return response.data;
};

export const joinChatApi= async (roomId)=>{
   const response =  await httpClient.get(`/api/v1/rooms/${roomId}`)
   return response.data;
}