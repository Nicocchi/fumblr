import { Button, Textarea, Avatar } from "@nextui-org/react";

import { Send } from "react-iconly";
import { useState } from "react";

function HomePage() {
  const [textAreaValue, setTextAreaValue] = useState("");

  return (
    <div style={{ width: "100%", maxWidth: 700 }}>
      <div>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Avatar squared text="Nico" size="xl" style={{ marginRight: 10 }} />
          <Textarea
            fullWidth
            placeholder="What's happening?"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div></div>
          <Button
            icon={<Send fill="currentColor" />}
            color="secondary"
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
