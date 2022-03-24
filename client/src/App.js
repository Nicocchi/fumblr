import {
  createTheme,
  NextUIProvider,
  Text,
  Card,
  Button,
  Spacer,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";

import {
  Home,
  Notification,
  Discovery,
  Message,
  Bookmark,
  User,
} from "react-iconly";
import RouterSwitch from "./routes";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context"
import { verifyToken } from "./utils/utils";

// Apollo
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (networkError) {
    console.log("NETWORK ERROR", networkError)
    // networkError.map(({ message, location, path }) => {
    //   alert(`Network error ${message}`);
    // });
  }
  if (graphqlErrors) {
    console.log("GRAPHQL ERRORS", graphqlErrors)
    // graphqlErrors.map(({ message, location, path }) => {
    //   alert(`Graphql error ${message}`);
    // });
  }
});

const authLink = setContext((_, { headers }) => {
  // Get authentication token from local storage if it exists
  const token = localStorage.getItem('token');

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

function App(props) {
  const darkMode = useDarkMode(true);
  const token = localStorage.getItem('token');
  const isExpired = verifyToken(token);

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
    <ApolloProvider client={client}>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        {token && !isExpired ? (
          <div
            style={{ display: "flex", justifyContent: "center", margin: 10 }}
          >
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
                <Button icon={<Discovery fill="currentColor" />}>
                  Explore
                </Button>
              </NavLink>
              <Spacer y={1} />
              <NavLink to="/notifications">
                <Button
                  icon={<Notification fill="currentColor" />}
                  color="primary"
                >
                  Notifications
                </Button>
              </NavLink>
              <Spacer y={1} />
              <NavLink to="/messages">
                <Button icon={<Message fill="currentColor" />}>Messages</Button>
              </NavLink>
              <Spacer y={1} />
              <NavLink to="/bookmarks">
                <Button icon={<Bookmark fill="currentColor" />}>
                  Bookmarks
                </Button>
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
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <RouterSwitch />
          </div>
        )}
      </NextUIProvider>
    </ApolloProvider>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    tokenExpired: state.authReducer.tokenExpired,
  };
}

export default connect(mapStateToProps, {})(App);
