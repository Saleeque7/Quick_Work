import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { userAxiosInstance } from "../../utils/api/privateAxios";
import { userChatsApi } from "../../utils/api/api";
import Conversation from "../../components/user/Conversation";
import ChatBox from "../../components/user/ChatBox";
import { config } from "../../config/config";
import { io } from "socket.io-client";

export default function Message() {
  const user = useSelector((state) => state.persisted.user.user);
  const [chats, setChats] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendmessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const res = await userAxiosInstance.get(userChatsApi);
        setChats(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserChats();
  }, [user._id]);

  useEffect(() => {
    socket.current = io(config.API);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendmessage !== null) {
      socket.current.emit("send-message", sendmessage);
    }
  }, [sendmessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  useEffect(() => {
    const handleDisconnect = () => {
      setOnlineUsers([]);
    };
  
    socket.current.on('disconnect', handleDisconnect);
    return () => {
      socket.current.off('disconnect', handleDisconnect);
    };
  }, []);
  
  return (
    <div className="py-10 px-2 bg-gray-100">
      <div className="relative grid grid-cols-[22%,auto] gap-4">
        <div className="flex flex-col p-5 bg-white gap-4 rounded-xl shadow-md ">
          <div className="flex items-center bg-white border border-gray-300 rounded-xl  overflow-hidden w-full">
            <input
              aria-label="Search"
              placeholder="Search"
              type="search"
              className="px-4 py-2 outline-none w-full rounded-l-xl"
            />
            <FaSearch className="text-gray-500 mx-2" />
          </div>
          <h2 className="text-xl">Chats</h2>
          <div className="flex flex-col gap-2  overflow: scroll">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <div key={chat._id} onClick={() => setcurrentChat(chat)}>
                  <Conversation
                    data={chat}
                    user={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-5">
                You don't have any conversations.
              </div>
            )}
          </div>
        </div>
        {/* overflow-scroll */}
        <div className="flex flex-col gap-4 bg-white rounded-xl p-4 h-auto min-h-[80vh] shadow-xl ">
          <div className="flex flex-col gap-4">
            <ChatBox
              chat={currentChat}
              user={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
