import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import Peer from "peerjs";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatIcon from "@material-ui/icons/Chat";
import VideocamIcon from "@material-ui/icons/Videocam";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

const socket = io("http://localhost:8000");


const Meeting = () => {
  const [chatOrParticipants, setChatOrParticipants] = useState("Chat");
  const { roomId } = useParams();
  let peer = null;

  const history = useHistory();
  // let socket = null;
  const [isMute, setIsMute] = useState(false);
  const [isVideo, setIsVideo] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  
  const [myVideoStream, setMyVideoStream] = useState(null);


  let isFullScreen = false;
  let peers = {};

  const mainVideo = document.createElement("video");
  mainVideo.muted = true;

  mainVideo.addEventListener("dblclick", () => {
    openAndCloseFullscreen(mainVideo);
  });

  const muteUnmute = () => {
    let en = myVideoStream.getAudioTracks()[0].enabled;
    if (en) {
      setIsMute(true);
      myVideoStream.getAudioTracks()[0].enabled = false;
    } else {
      setIsMute(false);
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  };

  const playStop = () => {
    let en = myVideoStream.getVideoTracks()[0].enabled;
    if (en) {
      setIsVideo(false);
      myVideoStream.getVideoTracks()[0].enabled = false;
    } else {
      myVideoStream.getVideoTracks()[0].enabled = true;
      setIsVideo(true);
    }
  };

  const [msgInput, setMsgInput] = useState("");

  const sendMsg = () => {
    socket.emit("message", msgInput);
    setMsgInput("");
  };

  const chatMsgInputHandler = () => {
    if (msgInput.length !== 0) {
      sendMsg();
    }
  };

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

  const connectToNewUser = (userId, stream) => {
    console.log("connect");
    const call = peer.call(userId, stream);
    const video = document.createElement("video");

    video.addEventListener("dblclick", () => {
      openAndCloseFullscreen(video);
    });

    let div = null;
    call.on("stream", (userVideoStream) => {
      // appending video
      video.srcObject = userVideoStream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      div = document.createElement("div");
      div.className = "col-md-2 single-video";
      div.append(video);
      document.getElementById("secondory-all-videos").append(div);
    });
    call.on("close", () => {
      div.remove();
    });

    peers[userId] = call;
  };

  
  const handleCallEnd = () => {
    socket.emit("user-self-call-end");
    // stop all track
    myVideoStream.getTracks().forEach(function (track) {
      track.stop();
    });
    history.replace("/");
  };

  const [finishStatus, setfinishStatus] = useState(false);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to leave ?")) {
        socket.emit("user-self-call-end");
        setfinishStatus(true);
        history.push("/");
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
      }
    }
  };


  const [id, setId] = useState("");

  useEffect(() => {
    // peer = new Peer(undefined, {
    //   path: '/',
    //   host: '/',
    //   port: '8000'}
    // );

    peer = new Peer();
    // when we successfully get our peer id
    peer.on("open", (id) => {
      setId(id);
      // getting our own video
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          // this code is for my own video
          setMyVideoStream(stream);
          setMainVideo(stream);
          
          peer.on("call", (call) => {
            call.answer(stream);

            const video = document.createElement("video");
            let div = null;

            call.on("stream", (userVideoStream) => {
              video.srcObject = userVideoStream;

              video.addEventListener("loadedmetadata", () => {
                video.play();
              });
            });

            video.addEventListener("dblclick", () => {
              openAndCloseFullscreen(video);
            });

            div = document.createElement("div");
            div.className = "col-md-2 single-video";
            div.append(video);
            document.getElementById("secondory-all-videos").append(div);
            // test
            call.on("close", () => {
              div.remove();
            });
          });

          socket.on("new-user-connected", (userId) => {
            console.log("new user", userId);
            // we neet their video and i have to provide my video to them
            connectToNewUser(userId, stream);
          });

        });

      socket.emit("user-join-room", roomId, id); // id is UserId
      socket.on("createMessage", (message, userId) => {
        const chatContainer = document.getElementById("chat-msg-container");

        const chatMsgDiv = document.createElement("div");
        chatMsgDiv.className = "chat-msg";

        const chatSenderDiv = document.createElement("div");
        chatSenderDiv.className = "chat-sender";

        const date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        const currentTime = hours + ":" + minutes + " " + ampm;

        chatSenderDiv.innerHTML = `USER : <span class="msg-send-time"> ${currentTime}</span>`;

        const chatMsgInstanceDiv = document.createElement("div");
        chatMsgInstanceDiv.className = "chat-msg-instance";
        chatMsgInstanceDiv.innerText = message;

        chatMsgDiv.append(chatSenderDiv);
        chatMsgDiv.append(chatMsgInstanceDiv);

        chatContainer.append(chatMsgDiv);
      });
      socket.on("user-disconnected", (userId) => {
        if (peers[userId]) peers[userId].close();
      });

      socket.on("user-disconnected-manually", (userId) => {
        console.log("END");
        if (peers[userId]) peers[userId].close();
      });
    });

    // on back button event
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
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
                {/* test */}
                <div id="test"></div>
                {/* test */}
                <div className="main-video" id="main-video">
                  {/* <video src="/file.mp4" autoPlay loop></video> */}
                </div>
                <div className="secondory-video">
                  <div
                    className="row mt-2 secondory-all-videos"
                    id="secondory-all-videos"
                  ></div>
                </div>
              </div>
              <div className="meeting-bar">
                <div className="meeting-buttons-container">
                  <Button
                    onClick={muteUnmute}
                    className={isMute === true ? "red" : ""}
                  >
                    {isMute === false ? <MicIcon /> : <MicOffIcon />}
                  </Button>
                  <Button
                    onClick={playStop}
                    className={isVideo === false ? "red" : ""}
                  >
                    {isVideo === true ? <VideocamIcon /> : <VideocamOffIcon />}
                  </Button>
                  <Button
                    className={isChatActive === true ? "blue" : ""}
                    onClick={() => {
                      setIsChatActive(isChatActive === true ? false : true);
                      document
                        .getElementById("sidebar-right")
                        .classList.toggle("active");
                    }}
                  >
                    <ChatIcon />
                  </Button>
                  <Button className="red" onClick={handleCallEnd}>
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

            {chatOrParticipants === "Chat" && (
              <>
                <div id="chat-msg-container" className="p-2"></div>
                <div className="chat-msg-util-container p-2">
                  <div className="d-inline close-btn">
                    <CloseIcon
                      onClick={() => {
                        setIsChatActive(false);
                        document
                          .getElementById("sidebar-right")
                          .classList.toggle("active");
                      }}
                    />
                  </div>
                  <div className="d-inline">
                    <input
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          chatMsgInputHandler();
                        }
                      }}
                      type="text"
                      id="chat-msg-input"
                      placeholder="Message"
                      value={msgInput}
                      onChange={(e) => setMsgInput(e.target.value)}
                    />
                  </div>
                  <div className="d-inline send-btn">
                    <Button onClick={chatMsgInputHandler}>
                      <SendIcon />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Meeting;
