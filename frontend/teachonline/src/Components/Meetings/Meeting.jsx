import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Peer from "peerjs";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@material-ui/core";

import MicIcon from "@material-ui/icons/Mic";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatIcon from "@material-ui/icons/Chat";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import VideocamIcon from "@material-ui/icons/Videocam";
import MeetingChat from "./MeetingChat";
import MeetingParticipants from "./MeetingParticipants";
import GroupIcon from "@material-ui/icons/Group";

const Meeting = () => {
  const [chatOrParticipants, setChatOrParticipants] = useState("Chat");
  const { roomId } = useParams();
  const [peerId, setPeerId] = useState(null);
  const [myVideoStream, setMyVideoStream] = useState(null);

  useEffect(() => {
    const peer = new Peer();
    const socket = io("http://localhost:8000");

    // when we successfully get our peer id
    peer.on("open", (id) => {
      setPeerId(id);
      console.log("peer ID", id);
      // getting our own video
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          setMyVideoStream(stream);
          // addNewVideoStream(myVideo, stream);
        });
      socket.emit("user-join-room", roomId, id); // id is UserId
    });

    socket.on("new-user-connected", (userId) => {
      console.log("new user", userId);
    });
  }, []);
  return (
    <>
      <div
        className="meeting-container container-fluid"
        style={{ background: "#202124" }}
      >
        <div className="wrapper">
          <div id="content">
            <div className="main-content" id="main-content">
              <div className="video-container">
                <div className="main-video">
                  {/* <video src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/cW5lDBG/4k-newspaper-with-breaking-news-titles_nkdoqjjsg__c2eb96bcb8d49557e209f98c6ef43cb6__P360.mp4" autoPlay loop></video> */}
                  <video src="https://www.youtube.com/watch?v=hoNb6HuNmU0" autoPlay loop></video>
                </div>
              </div>
              <div className="meeting-bar">
                <div className="meeting-buttons-container">
                  <Button>
                    <MicIcon />
                  </Button>
                  <Button>
                    <VideocamIcon />
                  </Button>
                  <Button>
                    <PresentToAllIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      document
                        .getElementById("sidebar-right")
                        .classList.toggle("active");
                    }}
                  >
                    <ChatIcon />
                  </Button>
                  <Button>
                    <GroupIcon />
                  </Button>
                  <Button>
                    <CallEndIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <nav id="sidebar-right">
            <div className="sidebar-header">
              <h4>{chatOrParticipants}</h4>
            </div>

            {chatOrParticipants === "Chat" && <MeetingChat />}
            {chatOrParticipants === "Participants" && <MeetingParticipants />}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Meeting;
