import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { myAxios } from "../api/myAxios";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [recipientId, setRecipientId] = useState();
  useEffect(() => {
    async function getData() {
      const res = await myAxios.get("/api/user/get_user_data");
      if (res) {
        setUser(res.data.user);
      }
    }
    getData();
  }, []);

  const [isUserSelected, setIsUserSelected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [isSendMessage, setIsSendMessage] = useState();
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState();

  useEffect(() => {
    if (socket !== null) return;

    if (user) {
      const newSocket = io("http://localhost:3001");
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket && socket.emit("addNewUser", user.id);
  }, [socket]);

  //send message
  useEffect(() => {
    if (socket === null) return;

    const currentDate = new Date(); // Get the current date

    socket.emit("sendMessage", {
      message: message,
      senderId: user.id,
      recipientId,
      fileData: fileData,
      created_at: currentDate,
    });
    setMessage("");
    setMessages((prev) => [
      ...prev,
      {
        message: message,
        recipientId,
        senderId: user.id,
        fileData,
        created_at: currentDate,
      },
    ]);
  }, [isSendMessage]);

  //recieve messages

  useEffect(() => {
    if (socket === null) return;
    // Listen for "getMessage" event
    socket.on("getMessage", (res) => {
      const isInChat = recipientId === res.senderId;
      isInChat && setMessages((prev) => [...prev, res]);
    });

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("getMessage");
    };
  }, [socket, recipientId]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("contact_id", recipientId);

    fetch("https://www.dashboard.aqartik.com/api/chat/getContactMessages", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setMessages(data.messages))
      .catch((error) => console.error("Error:", error));
  }, [recipientId]);

  const [userKlickedData, setUserKlickedData] = useState(null);

  useEffect(() => {
    if (userKlickedData === null) {
      const getData = async () => {
        const res = await myAxios.get(`/api/chat/getContacts`);
        const contacts = res?.data?.contacts;
        const foundUser = contacts?.find((user) => user?.id === recipientId);

        if (foundUser) {
          // The user with the target user ID was found
          // console.log("User found:", foundUser);
          setUserKlickedData(foundUser);
        } else {
          // // The user with the target user ID was not found
          // console.log("User not found");
        }
      };
      getData();
    } else {
      // console.log("no");
    }
  }, [isUserSelected]);

  return (
    <ChatContext.Provider
      value={{
        isUserSelected,
        setIsUserSelected,
        socket,
        messages,
        message,
        setMessage,
        recipientId,
        setRecipientId,
        setIsSendMessage,
        user,
        file,
        setFile,
        userKlickedData,
        setUserKlickedData,
        fileData,
        setFileData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
