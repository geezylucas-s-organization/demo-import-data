import React from "react";
import { CssBaseline, Container } from "@material-ui/core";

import { connect } from "react-redux";

const HomeScreen: React.FC = () => {
  return (
    <Container component="main">
      <CssBaseline />
      <h1>Mi cuenta</h1>
    </Container>
  );
};

export default connect<{}, {}, {}>(null, {})(HomeScreen);
