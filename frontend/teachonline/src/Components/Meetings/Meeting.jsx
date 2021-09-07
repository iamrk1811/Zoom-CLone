import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Peer from "peerjs";
import { Button } from "@material-ui/core";

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
  let peer = null;
  const [myVideoStream, setMyVideoStream] = useState(null);
  let isFullScreen = false;
  let peers = {}

  const mainVideo = document.createElement("video");
  mainVideo.muted = true;

  mainVideo.addEventListener("dblclick", () => {
    openAndCloseFullscreen(mainVideo);
  });

  // video full screen
  // exit fullscreen not working in firefox and that is a bug
  function openAndCloseFullscreen(myVideo) {
    var elem = myVideo;
    console.log(isFullScreen);
    if (!isFullScreen) {
      console.log("FULL");
      isFullScreen = true;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    } else {
      console.log("exit");
      isFullScreen = false;
      if (elem.exitFullscreen) {
        elem.exitFullscreen();
      } else if (elem.msExitFullscreen) {
        elem.msExitFullscreen();
      } else if (elem.mozCancelFullScreen) {
        console.log("right");
        elem.mozCancelFullScreen();
      } else if (elem.webkitExitFullscreen) {
        elem.webkitExitFullscreen();
      } else {
      }
    }
  }

  const setMainVideo = (stream) => {
    mainVideo.srcObject = stream;
    mainVideo.addEventListener("loadedmetadata", () => {
      mainVideo.play();
    });
    document.getElementById("main-video").innerHTML = "";
    document.getElementById("main-video").append(mainVideo);
  };

  const appendSecondoryVideo = (video, userVideoStream) => {
    console.log("calling");
    video.srcObject = userVideoStream; 
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    const div = document.createElement('div');
    div.className = "col-md-2 single-video";
    div.append(video);
    document.getElementById('secondory-all-videos').append(div);
  }
  const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    let div = null;
    call.on('stream', (userVideoStream) => {
      // appending video
      video.srcObject = userVideoStream; 
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      div = document.createElement('div');
      div.className = "col-md-2 single-video";
      div.append(video);
      document.getElementById('secondory-all-videos').append(div);
    })
    call.on('close', () => {
      div.remove();
    })
  
    peers[userId] = call
  }

  useEffect(() => {
    peer = new Peer();
    const socket = io("http://localhost:8000");

    // when we successfully get our peer id
    peer.on("open", (id) => {
      console.log("peer ID", id);
      // getting our own video
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          setMyVideoStream(stream);
          setMainVideo(stream);


          peer.on('call', (call) => {
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', (userVideoStream) => {
              appendSecondoryVideo(video, userVideoStream)
            })
          })
      

          socket.on("new-user-connected", (userId) => {
            console.log("new user", userId)
            // we neet their video and i have to provide my video to them
            connectToNewUser(userId, stream);
          });
        });
      socket.emit("user-join-room", roomId, id); // id is UserId
      socket.on('user-disconnected', (userId) => {
        if (peers[userId]) peers[userId].close()
      });
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
              <div className="video-container p-2">
                <div className="main-video" id="main-video">
                  {/* <video src="/file.mp4" autoPlay loop></video> */}
                </div>
                <div className="secondory-video">
                  <div className="row mt-2 secondory-all-videos" id="secondory-all-videos">
                    <div className="col-md-2 single-video">
                      <video controls src="/file.mp4" autoPlay loop></video>
                    </div>
                    <div className="col-md-2 single-video">
                      <video controls src="/file.mp4" autoPlay loop></video>
                    </div>
                  </div>
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
