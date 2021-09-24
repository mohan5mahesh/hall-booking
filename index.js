import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
const room = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
room.use(cors());
room.use(express.json());
export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  return client;
}

room.get("/", (request, response) => {
  response.send("Welcome Hotel Booking ");
});
room.get("/listallrooms", async (request, response) => {
  const client = await createConnection();
  const listallrooms = await client
    .db("hallbooking")
    .collection("room_booked")
    .find({})
    .toArray();
  response.send(listallrooms);
});
room.get("/listallcustomers", async (request, response) => {
  const client = await createConnection();
  const listallcustomers = await client
    .db("hallbooking")
    .collection("customer_list")
    .find({})
    .toArray();
  response.send(listallcustomers);
});
room.get("/creatingaroom", async (request, response) => {
  const client = await createConnection();
  const creatingaroom = await client
    .db("hallbooking")
    .collection("book_room")
    .find({})
    .toArray();
  response.send(creatingaroom);
});
room.post("/bookingroom", async (request, response) => {
  const { Customer_Name, Date, Start_Time, End_Time, Room_id } = request.body;
  const client = await createConnection();
  const bookingroom = await client
    .db("hallbooking")
    .collection("booking_room")
    .insertOne({
      Customer_Name: Customer_Name,
      Date: Date,
      Start_Time: Start_Time,
      End_Time: End_Time,
      Room_id: Room_id,
    });
  response.send(bookingroom);
});
room.listen(PORT, () => console.log("The server is started!", PORT));
