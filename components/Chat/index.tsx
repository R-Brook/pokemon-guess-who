"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/Button"
import { io, Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io"

export interface IMsgDataTypes {
  roomId: string | number
  user: string
  msg: string
  time: string
}

const ChatPage = () => {
  const [showChat, setShowChat] = useState<boolean>(false)
  const [currentMsg, setCurrentMsg] = useState("")
  const [chat, setChat] = useState<IMsgDataTypes[]>([])

  const [userName, setUserName] = useState<string>("")
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [roomId, setroomId] = useState<string>("")

  const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
    "http://localhost:3001"
  )

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId")
      socket.emit("join_room", roomId)
      setShowSpinner(true)
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true)
        setShowSpinner(false)
      }, 4000)
    } else {
      alert("Please fill in Username and Room Id")
    }
  }

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId,
        user: userName,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }
      await socket.emit("send_msg", msgData)
      setCurrentMsg("")
    }
  }

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data])
    })
  }, [socket])

  return (
    <section className=" w-full h-auto flex justify-center align-middle flex-col">
      {/* Log in section */}
      {!showChat && (
        <section className="border-2 border-blue-400 flex justify-center align-middle flex-col gap-4">
          <input
            className="h-8 w-60 p-2"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            disabled={showSpinner}
          />
          <input
            className="h-8 w-60 p-2"
            type="text"
            placeholder="room id"
            onChange={(e) => setroomId(e.target.value)}
            disabled={showSpinner}
          />
          <Button onClick={() => handleJoin()}>
            {!showSpinner ? (
              "Join"
            ) : (
              <div className="border-2 border-gray border-t-2 border-top-blue w-5 h-5 animate-spin"></div>
            )}
          </Button>
        </section>
      )}
      {/* Chat section */}
      {showChat && (
        <div className="border-2 border-red-500 p-2">
          <div style={{ marginBottom: "1rem" }}>
            <p>
              Name: <b>{userName}</b> and Room Id: <b>{roomId}</b>
            </p>
          </div>
          <div>
            {chat.map(({ /*roomId,*/ user, msg /*, time*/ }, key) => (
              <div
                key={key}
                className={
                  user == userName
                    ? "flex align-middle gap-1 flex-row-reverse mb-1"
                    : "flex align-middle gap-1 mb-1"
                }
              >
                <span
                  className=" bg-slate-300 h-8 w-8 border-2 border-white flex  justify-center align-middle text-black"
                  style={{ textAlign: user == userName ? "right" : "left" }}
                >
                  {user.charAt(0)}
                </span>
                <h3 style={{ textAlign: user == userName ? "right" : "left" }}>
                  {msg}
                </h3>
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={(e) => sendData(e)}>
              <input
                className="w-60 h-8 p-3"
                type="text"
                value={currentMsg}
                placeholder="Type your message.."
                onChange={(e) => setCurrentMsg(e.target.value)}
              />
              <Button>Send</Button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ChatPage
