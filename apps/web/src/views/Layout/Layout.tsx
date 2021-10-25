import React, { ReactNode, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { LayoutContent, LayoutMain, LayoutNav } from "./Layout.styles";

interface LayoutInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutInterface) => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:8002/api/v1/events");

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log({ parsedData });
      };

      setListening(true);
    }
  }, [listening]);

  return (
    <LayoutMain>
      <LayoutNav>
        <Navbar />
      </LayoutNav>
      <LayoutContent>{children}</LayoutContent>
    </LayoutMain>
  );
};
