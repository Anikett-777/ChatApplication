package com.substring.chatbot.controllers;


import com.substring.chatbot.entities.Message;
import com.substring.chatbot.entities.Room;
import com.substring.chatbot.payload.MessageRequest;
import com.substring.chatbot.repo.roomRepo;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Configuration
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
