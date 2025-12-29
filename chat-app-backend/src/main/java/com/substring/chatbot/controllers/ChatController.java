
package com.substring.chatbot.controllers;


import com.substring.chatbot.entities.Message;
import com.substring.chatbot.entities.Room;
import com.substring.chatbot.payload.MessageRequest;
import com.substring.chatbot.repo.roomRepo;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;


@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    private roomRepo roomRepo;

    public ChatController(roomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            @RequestBody MessageRequest request
    ){
            Room room = roomRepo.findByRoomId(request.getRoomId());
            Message message = new Message();
            message.setContent(request.getContent());
            message.setSender(request.getSender());
            message.setTimeStamp(LocalDateTime.now());

            if(room!=null){
                room.getMessages().add(message);
                roomRepo.save(room);
            }else{
                throw new RuntimeException("room Not Found");
            }

            return message;
    }
}


//package com.substring.chatbot.controllers;
//
//import com.substring.chatbot.entities.Message;
//import com.substring.chatbot.entities.Room;
//import com.substring.chatbot.payload.MessageRequest;
//import com.substring.chatbot.repo.roomRepo;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.handler.annotation.DestinationVariable;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//
//import java.time.LocalDateTime;
//
//@Configuration
//@Controller
//public class ChatController {
//
//    private final roomRepo roomRepo;
//    private final SimpMessagingTemplate messagingTemplate;
//
//    public ChatController(roomRepo roomRepo, SimpMessagingTemplate messagingTemplate) {
//        this.roomRepo = roomRepo;
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    @MessageMapping("/sendMessage/{roomId}")
//    public void sendMessage(
//            @DestinationVariable String roomId,
//            @Payload MessageRequest request
//    ) {
//        Room room = roomRepo.findByRoomId(roomId);
//
//        if (room == null) {
//            throw new RuntimeException("Room not found");
//        }
//
//        Message message = new Message();
//        message.setSender(request.getSender());
//        message.setContent(request.getContent());
//        message.setTimeStamp(LocalDateTime.now());
//
//        room.getMessages().add(message);
//        roomRepo.save(room);
//
//        // ✅ SEND TO CORRECT DYNAMIC TOPIC
//        messagingTemplate.convertAndSend(
//                "/topic/room/" + roomId,
//                message
//        );
//    }
//}
