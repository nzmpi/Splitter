import React, { useEffect, useState } from "react";
import { AddressInput } from "../scaffold-eth";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ethers } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { EthInput } from "./Inputs";
import { GetToken } from "./GetToken";

const SplitterUI = ({ 
  splitItem, 
  account, 
  splitterContract, 
  fee,
  totalAmount,
  setTotalAmount 
}: { 
  splitItem: string, 
  account: any, 
  splitterContract: any, 
  fee: any, 
  totalAmount: any,
  setTotalAmount: any 
}) => {
  const [wallets, setWallets] = useState<string[]>([""]);
  const [amounts, setAmounts] = useState<string[]>([""]);
  const [amountsInWei, setAmountsInWei] = useState<any[]>([]);
  const [tokenContract, setTokenContract] = useState("");
  const [tokenName, setTokenName] = useState("tokens");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const updateWallet = async (value: string, index: number) => {
    const newWallets = [...wallets];
    newWallets[index] = value;
    setWallets(newWallets);
  };

  const updateAmounts = async (value: string, index: number) => {
    const newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  const addWalletField = () => {
    const newWallets = [...wallets, ""];
    setWallets(newWallets);
    const newAmounts = [...amounts, ""];
    setAmounts(newAmounts);
  };

  const removeWalletField = (index: number) => {
    const newWallets = [...wallets];
    newWallets.splice(index, 1);
    setWallets(newWallets);

    const newAmounts = [...amounts];
    newAmounts.splice(index, 1);
    setAmounts(newAmounts);
  };

  useEffect(() => {
    let totalETH = 0;
    const newAmountsInWei = [];
    for (let index = 0; index < amounts.length; index++) {
      if (amounts[index] === "") {
        return;
      }
      totalETH += parseFloat(amounts[index]);
      newAmountsInWei.push(ethers.utils.parseUnits(amounts[index].toString(), "ether"));
    }
    setAmountsInWei(newAmountsInWei);
    if (fee > 0) {
      totalETH *= (1000+fee)/1000;
    }
    setTotalAmount(totalETH.toString());
  }, [amounts]);

  useEffect(() => {
    for (let index = 0; index < amounts.length; index++) {
      if (wallets[index] === "" || amounts[index] === "") {
        return;
      }
    }
  }, [amounts, wallets]);

  const { writeAsync: splitEth } = useScaffoldContractWrite({
    contractName: "Splitter",
    functionName: "splitEth",
    args: [wallets, amountsInWei],
    value: totalAmount,
  });

  const { writeAsync: splitToken } = useScaffoldContractWrite({
    contractName: "Splitter",
    functionName: "splitToken",
    args: [tokenContract, wallets, amountsInWei],
  });

  return (
    <>
      {splitItem === "split-tokens" && (
        <GetToken
          account={account}
          splitterContract={splitterContract}
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
                        placeholder={"Receivers' address"}
                        value={wallet}
                        onChange={value => updateWallet(value, index)}
                      />
                    </span>
                    <span className="w-4/12">
                      <EthInput
                        name = {splitItem === "split-eth" ? "Ξ" : tokenSymbol}
                        placeholder="Amount"
                        value={amounts[index]}
                        onChange={value => updateAmounts(value, index)}                        
                      />
                    </span>
                  </div>
                  
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        removeWalletField(index);
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
          <button type="button" onClick={addWalletField} 
          className="btn btn-primary w-full font-black">
              <PlusIcon className="h-1/2" />
          </button>
          </div>

          <div className="my-[15px] w-full space-y-4">
          <button
              type="button"              
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

export default SplitterUI;