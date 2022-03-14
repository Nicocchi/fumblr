import {
  createTheme,
  NextUIProvider,
  Switch,
  Text,
  useTheme,
  Card,
  Button,
  Textarea,
  Spacer,
  Avatar,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";

import {
  Home,
  Notification,
  Send,
  Discovery,
  Message,
  Bookmark,
  User,
} from "react-iconly";
import { useState } from "react";
import RouterSwitch from "./routes";

import { NavLink } from "react-router-dom";

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

function App() {
  const darkMode = useDarkMode(true);
  const { type, isDark } = useTheme();
  const [textAreaValue, setTextAreaValue] = useState("");

  const MockItem = ({ text }) => {
    return (
      <Card color="primary" css={{ h: "$24" }}>
        <Text h6 size={15} color="white" css={{ mt: 0 }}>
          {text}
        </Text>
      </Card>
    );
  };

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <div
          style={{
            width: "100%",
            maxWidth: "300px",
            margin: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <NavLink to="/">
            <Button icon={<Home fill="currentColor" />}>Home</Button>
          </NavLink>
          <Spacer y={1} />
          <NavLink to="/explore">
            <Button icon={<Discovery fill="currentColor" />}>Explore</Button>
          </NavLink>
          <Spacer y={1} />
          <NavLink to="/notifications">
            <Button icon={<Notification fill="currentColor" />} color="primary">
              Notifications
            </Button>
          </NavLink>
          <Spacer y={1} />
          <NavLink to="/messages">
            <Button icon={<Message fill="currentColor" />}>Messages</Button>
          </NavLink>
          <Spacer y={1} />
          <NavLink to="/bookmarks">
            <Button icon={<Bookmark fill="currentColor" />}>Bookmarks</Button>
          </NavLink>
          <Spacer y={1} />
          <NavLink to="/profile">
            <Button icon={<User fill="currentColor" />}>Profile</Button>
          </NavLink>
          <Spacer y={1} />
        </div>
        <div style={{ width: "100%", maxWidth: 700, margin: 20 }}>
          <RouterSwitch />
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "300px",
            margin: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <MockItem text="3 of 3" />
        </div>

        {/* <Grid.Container gap={2} justify="center">
          <Grid fluid={2}>
            <div>
              <Button icon={<Home fill="currentColor" />} >Home</Button>
              <Spacer y={1} />
              <Button>Explore</Button>
              <Spacer y={1} />
              <Button icon={<Notification fill="currentColor" />} color="secondary">
                Notifications
              </Button>
              <Spacer y={1} />
              <Button>Messages</Button>
              <Spacer y={1} />
            </div>
          </Grid>
          <Grid xs={6}>
            <div style={{ width: "100%" }}>
              <Grid>
                <Avatar squared text="Junior" />
                <Textarea
                fullWidth
                placeholder="Enter your amazing ideas."
              // value={textAreaValue}
              // onChange={(e) => setTextAreaValue(e.target.value)}
              />
              </Grid>
              
            </div>
          </Grid>
          <Grid xs={2}>
            <MockItem text="3 of 3" />
          </Grid>
        </Grid.Container> */}
      </div>
    </NextUIProvider>
  );
}

export default App;
