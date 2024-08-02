import { useState, useEffect, useRef } from "react";
import { userAxiosInstance } from "../../utils/api/privateAxios";
import {
  clientdataApi,
  getmessagesApi,
  addmessageApi,
} from "../../utils/api/api";
import Avatar from "react-avatar";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

export default function ChatBox({
  chat,
  user,
  setSendMessage,
  receivedMessage,
}) {
  const [clientData, setClientData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newmessages, setnewMessages] = useState("");
  const scroll = useRef();

  const handleChange = (newMessage) => {
    setnewMessages(newMessage);
  };

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const userId = chat.members.find((id) => id !== user);
        const res = await userAxiosInstance.get(
          `${clientdataApi}?id=${userId}`
        );

        setClientData(res.data);
      } catch (error) {
        console.error("Error fetching client info in Chatbox:", error);
      }
    };
    if (chat !== null) fetchClientData();
  }, [chat, user]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await userAxiosInstance.get(
          `${getmessagesApi}?id=${chat._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching client info in Chatbox:", error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user,
      message: newmessages,
      chatId: chat._id,
    };

    const receiverId = chat.members.find((id) => id !== user);

    setSendMessage({ ...message, receiverId });
    try {
      const res = await userAxiosInstance.post(addmessageApi, message);
      setMessages([...messages, res.data]);
      setnewMessages("");
    } catch (error) {
      console.error(error, "error in chatbox");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <>
      <div className="bg-white rounded-lg grid grid-rows-[14vh_60vh_13vh]">
        {chat ? (
          <>
            <div className="p-4 flex flex-col">
              <div className="flex items-center space-x-4">
                <Avatar
                  name={clientData?.name || "User"}
                  src={clientData?.profileImage}
                  size="50"
                  round={true}
                />
                <div className="text-sm">
                  <span>{clientData?.name}</span>
                </div>
              </div>
              <hr className="w-[95%] border-t-[0.1px] border-gray-300 mt-5" />
            </div>
            <div className="flex flex-col gap-2 p-6 overflow-y-scroll">
              {messages.map((message) => (
                <div
                  key={message._id}
                  ref={scroll}
                  className={`flex flex-col gap-2  px-5  py-1 rounded-xl max-w-lg w-fit ${
                    message?.senderId === user
                      ? "self-end bg-gradient-to-r from-[#24e4f0] to-[#7f8a97] rounded-br-none"
                      : "bg-blue-500 rounded-bl-none text-white"
                  }`}
                >
                  <span>{message?.message}</span>
                  <span
                    className={`${
                      message.senderId === user
                        ? "text-xs text-gray-500 self-end"
                        : "text-xs text-white"
                    }`}
                  >
                    {format(message?.createdAt)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between h-14 p-3 bg-white rounded-lg">
              <div
                className="flex items-center justify-center bg-gray-200 rounded-md w-8 h-8 cursor-pointer"
                // onClick={() => imageRef.current.click()}
              >
                +
              </div>
              <InputEmoji
                value={newmessages}
                onChange={handleChange}
                className="flex-1"
              />
              <div
                className="flex items-center justify-center bg-blue-500 text-white rounded-md h-8 px-4 cursor-pointer"
                onClick={handleSend}
              >
                Send
              </div>
              {/* <input
                type="file"
                name=""
                id=""
                className="hidden"
                ref={imageRef}
              /> */}
            </div>
          </>
        ) : (
          <span className="text-center text-gray-500 mt-5">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
}
