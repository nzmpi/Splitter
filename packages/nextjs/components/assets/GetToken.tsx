import React, { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { ethers, BigNumber } from "ethers";
import { erc20ABI } from "wagmi";
import { AddressInput } from "../scaffold-eth";
import { Input } from "./Inputs";

export const GetToken = ({ 
  account, 
  splitterXContract,
  tokenContract,
  setTokenContract,
  tokenName, 
  setTokenName,
  tokenSymbol, 
  setTokenSymbol 
}: { 
  account: any, 
  splitterXContract: any, 
  tokenContract: any,
  setTokenContract: any,
  tokenName: any,
  setTokenName: any,
  tokenSymbol: any, 
  setTokenSymbol: any 
}) => {
  const [tokenAllowance, setTokenAllowance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [approveAmount, setApproveAmount] = useState<BigNumber>(BigNumber.from(0));
  const [approveAmountString, setApproveAmountString] = useState("");

  const approve = async () => {
    try {
      const config = await prepareWriteContract({
        address: tokenContract,
        abi: erc20ABI,
        functionName: "approve",
        args: [splitterXContract, approveAmount],
      });
      await writeContract(config);
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenData = async () => {
    try {
      const name = await readContract({
        address: tokenContract,
        abi: erc20ABI,
        functionName: "name",
      });
      setTokenName(name);

      const symbol = await readContract({
        address: tokenContract,
        abi: erc20ABI,
        functionName: "symbol",
      });
      setTokenSymbol(symbol);

      let allowance: any = await readContract({
        address: tokenContract,
        abi: erc20ABI,
        functionName: "allowance",
        args: [account.address, splitterXContract],
      });
      allowance = ethers.utils.formatEther(allowance);
      setTokenAllowance(allowance.toLocaleString());

      let balance: any = await readContract({
        address: tokenContract,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [account.address],
      });
      balance = ethers.utils.formatEther(balance);
      setTokenBalance(balance.toLocaleString());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tokenContract !== "") getTokenData();
  }, [tokenContract]);

  return (
    <div className="mx-auto my-14 -mb-2">
      <div className="md:w-[500px] w-[300px] lg:w-[800px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2">
        <div className="flex flex-col space-y-1 w-full my-1">
          <p className="font-semibold mx-[15px] my-0 break-words">Enter Token Contract</p>          
          <span className="w-3/5">
            <AddressInput
              placeholder={"Token's address"}
              value={tokenContract}
              onChange={value => setTokenContract(value)}
            />
          </span>
        </div>
        <div className="flex flex-col space-y-1 w-full my-1">
          <p className="font-semibold mx-[15px] my-0 break-words">Token Name: {tokenName !== "tokens" ? tokenName : ""} </p>
          <p className="font-semibold mx-[15px] my-0 break-words ">Your Balance: {tokenBalance} </p>
          <p className="font-semibold mx-[15px] my-0 break-words ">Splitter's Allowance: {tokenAllowance} </p>
          <div
            className={"flex flex-row mt-2"}
          >
          <span className="w-3/5 my-[5px]">
            <Input
              name = {tokenSymbol}
              placeholder="Amount"
              value={approveAmountString}
              onChange={ value => {
                if (value !== "") {
                  setApproveAmount(ethers.utils.parseEther(value))
                  setApproveAmountString(value) 
                } else {
                  setApproveAmountString("")
                }
              }}
            />
          </span>
            <button
              type="button"
              disabled={tokenContract == "" || tokenName == "" || approveAmountString == ""}
              style={{ marginLeft: "auto" }}
              className={"ml-3 lg:mx-[100px] md:mx-[40px] btn btn-primary"}
              onClick={async () => {
                await approve();
                getTokenData();
              }}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetToken;