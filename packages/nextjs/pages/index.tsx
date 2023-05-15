import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import type { NextPage } from "next";
import SplitterXUI from "~~/components/assets/SplitterXUI";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [activeItem, setActiveItem] = useState("split-eth");
  const [totalAmount, setTotalAmount] = useState("0");
  const account = useAccount();

  function handleItemClick(itemId: string) {
    setActiveItem(itemId);
  }

  let splitterXContract;
  const { data: deployedContractData } = useDeployedContractInfo("SplitterX");
  if (deployedContractData) {
    ({ address: splitterXContract } = deployedContractData);
  }

  const { data: fee} = useScaffoldContractRead({
    contractName: "SplitterX",
    functionName: "fee",
  });

  useEffect(() => {    
  }, [fee]);

  return (
    <>
      <Head>
        <title>SplitterX</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">

        <ul className="menu menu-horizontal bg-base-100 rounded-box activemenu border">
          <li onClick={() => handleItemClick("split-eth")}>
            <a className={activeItem === "split-eth" ? "active" : ""}>Split ETH</a>
          </li>          
          <li onClick={() => handleItemClick("split-tokens")}>
            <a className={activeItem === "split-tokens" ? "active" : ""}>Split Tokens</a>
          </li>
        </ul>
        <SplitterXUI 
          splitItem={activeItem} 
          account={account} 
          splitterXContract={splitterXContract} 
          fee={fee} 
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
          />
        
        <div className="flex mx-auto mt-14 border-primary border-2 rounded-3xl shadow-lg px-7 py-5 ">
        <div className="flex-column">
          <span className="p-2 text-lg font-bold"> Sum + Fee: </span>
          <span className="text-lg text-right min-w-[2rem]"> {totalAmount.toLocaleString() || "0"} </span>
          
          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Fee: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {fee ? fee/10 : "0"} %
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Contract Address:</span>
          <span className="text-lg text-right min-w-[2rem]"> {splitterXContract || "Not Deployed"} </span>

        </div>
        </div>
        </div>
    </>
  );
};

export default Home;
