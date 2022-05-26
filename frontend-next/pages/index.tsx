import type { NextPage } from "next";
import Image from "next/image";

import { Greeter } from "../components/Greeter";

const Home: NextPage = () => {
  return (
    <div className="App bg-offWhite">
      <header className="App-header">
        <Symfoni autoInit={true}>
          <p className="font-extrabold text-3xl text-primary">
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Greeter></Greeter>
        </Symfoni>
      </header>
    </div>
  );
};

export default Home;
