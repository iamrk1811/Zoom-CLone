import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";


const MeetingChat = () => {
  return (
    <>
      <div id="chat-msg-container" className="p-2">
        <div className="chat-msg">
          <div className="chat-sender">
            Rakib : <span className="msg-send-time">5:30pm</span>
          </div>
          <div className="chat-msg-instance">Hi, how are you Mr. Hossain</div>
        </div>
        <div className="chat-msg">
          <div className="chat-sender">
            Hossain : <span className="msg-send-time">5:30pm</span>
          </div>
          <div className="chat-msg-instance">I am fine ! Thank you</div>
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, veritatis
        eveniet! Consectetur nobis sunt ea ipsum dolore doloremque recusandae,
        dolor nam fugiat quod! Aperiam ullam dolorum doloribus voluptatem.
        Architecto, ipsam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, veritatis
        eveniet! Consectetur nobis sunt ea ipsum dolore doloremque recusandae,
        dolor nam fugiat quod! Aperiam ullam dolorum doloribus voluptatem.
        Architecto, ipsam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, veritatis
        eveniet! Consectetur nobis sunt ea ipsum dolore doloremque recusandae,
        dolor nam fugiat quod! Aperiam ullam dolorum doloribus voluptatem.
        Architecto, ipsam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, veritatis
        eveniet! Consectetur nobis sunt ea ipsum dolore doloremque recusandae,
        dolor nam fugiat quod! Aperiam ullam dolorum doloribus voluptatem.
        Architecto, ipsam?
      </div>

      <div className="chat-msg-util-container p-2">
        <div className="d-inline close-btn">
          <CloseIcon />
        </div>
        <div className="d-inline">
          <input type="text" id="chat-msg-input" placeholder="Message" />
        </div>
        <div className="d-inline send-btn">
          <Button>
            <SendIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MeetingChat;
