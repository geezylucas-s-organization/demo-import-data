import React, { useEffect, useState } from "react";
import { CssBaseline, Container } from "@material-ui/core";

import { connect } from "react-redux";
import { AppState } from "../../store";

import "./main.css";

import { ChatState } from "../../store/chat/types";
import { sendMessage } from "../../store/chat/actions";

import ChatHistory from "../../components/ChatHistory";
import ChatInterface from "../../components/ChatInterface";

import { UpdateMessageParam } from "../../components/utils";

interface HomeProps {
  sendMessage: typeof sendMessage;
  chat: ChatState;
}

const HomeScreen: React.FC<HomeProps> = (props: HomeProps) => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    props.sendMessage({
      user: "Chat Bot",
      message:
        "This is a very basic chat application written in typescript using react and redux. Feel free to explore the source code.",
      timestamp: new Date().getTime(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMessage = (event: UpdateMessageParam) => {
    setMessage(event.currentTarget.value);
  };

  const sendMessage = (message: string) => {
    props.sendMessage({
      user: "xxx",
      message: message,
      timestamp: new Date().getTime(),
    });
    setMessage("");
  };

  return (
    <Container component="main">
      <CssBaseline />
      <ChatHistory messages={props.chat.messages} />
      <ChatInterface
        userName="xxx"
        message={message}
        updateMessage={updateMessage}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, { sendMessage })(HomeScreen);
