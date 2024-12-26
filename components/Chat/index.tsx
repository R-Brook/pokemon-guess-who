"use client"
import React, { useEffect, useState } from "react"
import { DefaultEventsMap } from "socket.io"
import { Socket } from "socket.io-client"
import { Button } from "@/components/Button"

interface IMsgDataTypes {
  roomId: string | number
  user: string
  msg: string
  time: string
}

interface SocketProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
  username: string
  roomId: string
}

const ChatPage = ({ socket, username, roomId }: SocketProps) => {
  const [currentMsg, setCurrentMsg] = useState("")
  const [chat, setChat] = useState<IMsgDataTypes[]>([])

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId,
        user: username,
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
    <div className=" w-full h-auto flex justify-center align-middle flex-col">
      <div className="border-2 border-red-500 p-2">
        <div style={{ marginBottom: "1rem" }}>
          <p>
            Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
          </p>
        </div>
        <div>
          {chat.map(({ /*roomId,*/ user, msg /*, time*/ }, key) => (
            <div
              key={key}
              className={
                user == username
                  ? "flex align-middle gap-1 flex-row-reverse mb-1"
                  : "flex align-middle gap-1 mb-1"
              }
            >
              <span
                className=" bg-slate-300 h-8 w-8 border-2 border-white flex  justify-center align-middle text-black"
                style={{ textAlign: user == username ? "right" : "left" }}
              >
                {user.charAt(0)}
              </span>
              <h3 style={{ textAlign: user == username ? "right" : "left" }}>
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
    </div>
  )
}

export default ChatPage
