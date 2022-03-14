import {
  NextUIProvider,
  Text,
  Card,
} from "@nextui-org/react";


function Landing() {

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
    <div>
        <Text h1>Landing</Text>
    </div>
  );
}

export default Landing;
