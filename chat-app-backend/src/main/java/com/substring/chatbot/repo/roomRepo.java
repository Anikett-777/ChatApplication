package com.substring.chatbot.repo;

import com.substring.chatbot.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface roomRepo extends MongoRepository<Room,String> {

    //get room using room id
    Room findByRoomId(String roomId);
}
