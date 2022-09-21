import { useState, useEffect } from "react";
import { CreateAdBanner } from "./componets/CreateAdBanner";
import { GameBanner } from "./componets/GameBanner";
import { GameController } from "phosphor-react";
import { Input } from "./componets/Form/Input";

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
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
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
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50">
            <Dialog.Title className="text-3xl font-black">
              Create a new Ad
            </Dialog.Title>

            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Select the game
                </label>
                <Input
                  type="text"
                  id="game"
                  placeholder="Select the game that you want to play"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Your name (or nickname)</label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name in the game"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">How long do you play?</label>
                  <Input
                    type="number"
                    id="yearsPlaying"
                    placeholder="0 is ok"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">What is your discord?</label>
                  <Input type="text" id="discord" placeholder="Username#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">When do you play?</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      title="Sunday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>
                    <button
                      title="Monday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      M
                    </button>
                    <button
                      title="Tuesday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      T
                    </button>
                    <button
                      title="Wednesday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      W
                    </button>
                    <button
                      title="Thursday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      T
                    </button>
                    <button
                      title="Friday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      F
                    </button>
                    <button
                      title="Saturday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">What time do you play?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" placeholder="From" />
                    <Input type="time" id="hourEnd" placeholder="To" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />
                Voice chat
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancel
                </Dialog.Close>
                <button 
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Find duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
