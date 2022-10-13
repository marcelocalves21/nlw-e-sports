import { useState, useEffect } from "react";
import axios from "axios";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/Logo-nlw-sport.svg";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data)
    });
  }, []);

  return (
    <div className="max-w[1344] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20 ">
        Your{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        is here
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
