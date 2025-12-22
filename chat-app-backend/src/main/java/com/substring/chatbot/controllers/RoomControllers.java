package com.substring.chatbot.controllers;

import com.substring.chatbot.entities.Message;
import com.substring.chatbot.entities.Room;
import com.substring.chatbot.repo.roomRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("")
public class RoomControllers {

    private roomRepo roomRepo;

    public RoomControllers(roomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    //create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId){
        if(roomRepo.findByRoomId(roomId)!=null)
        {
            //room is already Here
            return ResponseEntity.badRequest().body("Room already Exist");
        }

        Room room =  new Room();
        room.setRoomId(roomId);
         Room savedRoom =  roomRepo.save(room);
         return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    //get room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(
            @PathVariable String roomId
    ){
        Room room = roomRepo.findByRoomId(roomId);
        if(room==null){
            return ResponseEntity.badRequest().body("Room not Found");
        }
        return ResponseEntity.ok(room);

    }

    //get messages of room

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId

    ){
        Room room = roomRepo.findByRoomId(roomId);
        if(room==null){
            return ResponseEntity.badRequest().build();
        }
        List<Message> messages = room.getMessages();
        return ResponseEntity.ok(messages);
    }
}


