import { useEffect, useState } from 'react';
import { createPublicClient, webSocket, http } from 'viem';
import { arbitrum } from 'viem/chains';
import { FOUNDRY_COURSE_CONTRACT_ADDRESS, FOUNDRY_COURSE_CONTRACT_ABI } from './contractData';
import Confetti from 'react-dom-confetti';

const confettiConfig = {
  spread: 360,
  startVelocity: 40,
  elementCount: 250,
  decay: 0.91,
};

const RPC_PROVIDER_API_KEY = import.meta.env.VITE_RPC_PROVIDER_API_KEY as string;

const App = () => {
  const [events, setEvents] = useState([] as any);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const webSocketClient = createPublicClient({
      chain: arbitrum,
      transport: webSocket(`wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
    });

    const publicClient = createPublicClient({
      chain: arbitrum,
      transport: http(`https://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
    })

    const listenToEvents = () => {
      const unwatch = webSocketClient.watchContractEvent({
        address: FOUNDRY_COURSE_CONTRACT_ADDRESS,
        abi: FOUNDRY_COURSE_CONTRACT_ABI,
        eventName: 'ChallengeSolved',
        onLogs: (logs: any) => {
          console.log("New Challenge Solved Event!", logs);
          setConfetti(true);
          setTimeout(() => setConfetti(false), 5000);
          setEvents((prevEvents: any) => [...prevEvents, logs[0]]);
        },
      });

      return () => {
        unwatch();
      };
    }

    const getPreviousEvents = async () => {
      const filter = await publicClient.createContractEventFilter({
        abi: FOUNDRY_COURSE_CONTRACT_ABI,
        address: FOUNDRY_COURSE_CONTRACT_ADDRESS,
        eventName: 'ChallengeSolved',
        fromBlock: 97795932n,
      })

      const fetchedEvents = await publicClient.getFilterLogs({ filter });
      setEvents(fetchedEvents);
    }

    getPreviousEvents();
    listenToEvents();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-12">
      <Confetti active={confetti} config={confettiConfig} />
      <div className="w-full md:max-w-2xl mx-4">
        <div className="flex justify-around mb-4">
          <a href="https://twitter.com/PatrickAlphaC" target="_blank" rel="noreferrer" className="flex flex-col items-center transition-all duration-300 hover:scale-105 active:scale-100">
            <img src="/patrick.png" alt="PatrickAlphaC" className="w-20 h-20 rounded-full" />
            <span>PatrickAlphaC</span>
          </a>
          <a href="https://youtu.be/umepbfKp5rI" target="_blank" rel="noreferrer" className="flex flex-col items-center transition-all duration-300 hover:scale-105 active:scale-100">
            <img src="/youtube.png" alt="0xMarkeljan" className="w-20 h-20" />
            <span>Foundry Course</span>
          </a>
          <a href="https://twitter.com/foundrynftmints" target="_blank" rel="noreferrer" className="flex flex-col items-center transition-all duration-300 hover:scale-105 active:scale-100">
            <img src="/twitter.svg" alt="Track Mints" className="w-20 h-20" />
            <span>Track Mints</span>
          </a>
        </div>
        <div className="text-4xl text-start px-8 py-4 bg-blue-800">
          Listening for contract events<span className="ellipsis"></span>
        </div>
        <div className="overflow-y-auto h-[600px] px-4 py-6">
          {[...events].reverse().map((event: any, index: any) => {
            const { args: { solver, challenge, twitterHandle }, transactionHash } = event;
            return (
              <a
              key={index}
              href={`https://arbiscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noreferrer"
              className="block mb-4 p-4 bg-teal-500 rounded-md overflow-hidden transition-all duration-300 hover:bg-teal-400 active:bg-teal-600"
            >
                <div className="scrollable-card-content">
                  <div className="font-semibold">Solver: <span className="font-normal">{solver}</span></div>
                  <div className="font-semibold">Challenge: <span className="font-normal">{challenge}</span></div>
                  <div className="font-semibold">Twitter Handle: <span className="font-normal">{twitterHandle}</span></div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <footer className="w-full mt-auto py-8 bg-gray-800">
        <div className="flex items-center justify-center">
                  <a href="https://github.com/Markeljan/contract-events-twitter-bot" target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-white text-lg">
            <img src="/github.png" alt="GitHub" className="w-8 h-8" />
            <span>Check out the source code on GitHub!</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
