import './App.css';

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
import { Grid } from '@nextui-org/react';
import useDarkMode from "use-dark-mode";

import { Home, Notification, Send, Discovery, Message, Bookmark, User } from 'react-iconly'
import { useState } from 'react';

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
      <Card color="primary" css={{ h: '$24' }}>
        <Text h6 size={15} color="white" css={{ mt: 0 }}>
          {text}
        </Text>
      </Card>
    );
  }

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <div style={{ width: "100%", maxWidth: "300px", margin: 20, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Button icon={<Home fill="currentColor" />} >Home</Button>
          <Spacer y={1} />
          <Button icon={<Discovery fill="currentColor" />} >Explore</Button>
          <Spacer y={1} />
          <Button icon={<Notification fill="currentColor" />} color="primary">
            Notifications
          </Button>
          <Spacer y={1} />
          <Button icon={<Message fill="currentColor" />}>Messages</Button>
          <Spacer y={1} />
          <Button icon={<Bookmark fill="currentColor" />}>Bookmarks</Button>
          <Spacer y={1} />
          <Button icon={<User fill="currentColor" />}>Profile</Button>
          <Spacer y={1} />
        </div>
        <div style={{ width: "100%", maxWidth: 700, margin: 20 }}>
          <div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <Avatar squared text="Nico" size="xl" style={{marginRight: 10}} />
              <Textarea
                fullWidth
                placeholder="What's happening?"
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
              />
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <div></div>
            <Button icon={<Send fill="currentColor" />} color="secondary">
            
          </Button>
            </div>
          </div>

        </div>
        <div style={{ width: "100%", maxWidth: "300px", margin: 20, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
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
