import React, { useEffect, useState } from "react";
import { AddressInput } from "../scaffold-eth";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Input } from "./Inputs";
import { GetToken } from "./GetToken";
import { ethers } from "ethers";

const SplitterXUI = ({ 
  splitItem, 
  account, 
  splitterXContract, 
  fee,
  totalAmount,
  setTotalAmount 
}: { 
  splitItem: string, 
  account: any, 
  splitterXContract: any, 
  fee: any, 
  totalAmount: any,
  setTotalAmount: any 
}) => {
  const [wallets, setWallets] = useState<string[]>([""]);
  const [amounts, setAmounts] = useState<any[]>([]);
  const [amountsString, setAmountsString] = useState<string[]>([""]);
  const [tokenContract, setTokenContract] = useState("");
  const [tokenName, setTokenName] = useState("tokens");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const updateWallet = async (value: string, index: number) => {
    const newWallets = [...wallets];
    newWallets[index] = value;
    setWallets(newWallets);
  };

  const updateAmounts = async (value: string, index: number) => {
    const newAmounts = [...amountsString];
    newAmounts[index] = value;
    setAmountsString(newAmounts);
  };

  const addField = () => {
    const newWallets = [...wallets, ""];
    setWallets(newWallets);
    const newAmounts = [...amountsString, ""];
    setAmountsString(newAmounts);
  };

  const removeField = (index: number) => {
    const newWallets = [...wallets];
    newWallets.splice(index, 1);
    setWallets(newWallets);

    const newAmounts = [...amountsString];
    newAmounts.splice(index, 1);
    setAmountsString(newAmounts);
  };

  useEffect(() => {
    let totalETH = 0;
    const newAmounts = [];
    for (let index = 0; index < amountsString.length; index++) {
      if (amountsString[index] === "") {
        return;
      }
      totalETH += parseFloat(amountsString[index]);
      newAmounts.push(ethers.utils.parseUnits(amountsString[index].toString(), "ether"));
    }
    setAmounts(newAmounts);
    if (fee > 0) {
      totalETH *= (1000+fee)/1000;
    }
    setTotalAmount(totalETH.toString());
  }, [amountsString]);

  useEffect(() => {
    for (let index = 0; index < amountsString.length; index++) {
      if (wallets[index] === "" || amountsString[index] === "") {
        return;
      }
    }
  }, [amountsString, wallets]);

  const { writeAsync: splitEth } = useScaffoldContractWrite({
    contractName: "SplitterX",
    functionName: "splitEth",
    args: [wallets, amounts],
    value: totalAmount,
  });

  const { writeAsync: splitToken } = useScaffoldContractWrite({
    contractName: "SplitterX",
    functionName: "splitToken",
    args: [tokenContract, wallets, amounts],
  });

  return (
    <>
      {splitItem === "split-tokens" && (
        <GetToken
          account={account}
          splitterXContract={splitterXContract}
          tokenContract={tokenContract}
          setTokenContract={setTokenContract}
          tokenName={tokenName}
          setTokenName={setTokenName}
          tokenSymbol={tokenSymbol}
          setTokenSymbol={setTokenSymbol}
        />
      )}

      <div className="mx-auto mt-14">
        <form className="md:w-[500px] w-[300px] lg:w-[800px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2">
          <div className="flex flex-col space-y-1 w-full my-1 ">
            <p className="font-semibold mx-[15px] my-0">Receivers</p>

            {wallets.map((wallet, index) => (
              <div key={index}>
                <div key={index} className="flex gap-2 mt-2 w-full ">
                  <div className="w-11/12 flex gap-2 items-center">
                    <span className="p-2 text-lg text-right min-w-[2rem]">
                      {index + 1}.
                    </span>
                    <span className="w-11/12">
                      <AddressInput
                        name={""}
                        placeholder={"Receiver's address"}
                        value={wallet}
                        onChange={value => updateWallet(value, index)}
                      />
                    </span>
                    <span className="w-4/12">
                      <Input
                        name = {splitItem === "split-eth" ? "Ξ" : tokenSymbol}
                        placeholder="Amount"
                        value={amountsString[index]}
                        onChange={value => updateAmounts(value, index)}                        
                      />
                    </span>
                  </div>
                  
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        removeField(index);
                      }}
                    >
                      <TrashIcon className="h-1/2" />
                    </button>
                  )}
                </div>
                {wallet.length > 0 && !ethers.utils.isAddress(wallet) && (
                  <p className="ml-2 text-[0.75rem] text-red-400">Not an address!</p>
                )}
              </div>
            ))}
          </div>

          <div className="my-[15px] w-full space-y-4">
          <button type="button" onClick={addField} 
          className="btn btn-primary w-full font-black">
              <PlusIcon className="h-1/2" />
          </button>
          </div>

          <div className="my-[15px] w-full space-y-4">
          <button
              type="button"
              disabled={
                amountsString.includes("") ||
                wallets.includes("") ||
                wallets.some(wallet => !ethers.utils.isAddress(wallet))
              }              
              onClick={async () => {
                splitItem === "split-eth" ? await splitEth() : await splitToken();
              }}
              className={`btn btn-primary w-full font-black `}
            >
              Split {splitItem === "split-eth" ? " ETH" : tokenName}
            </button>
          </div>
          
        </form>
      </div>

    </>
  );
};

export default SplitterXUI;