import { useEffect, useState } from "react";
import {
  getCurrentWalletConnected,
  mintNFT,
  connectWallet,
  //import here
} from "./utils/interact.js";

import meta from "./MetaMask_Fox.svg.png";
import coinbase from "./coinbase-icon.png";
import walleticon from "./walletconnect-logo.svg";

const Minter = (props) => {
  //State variables

  const [selectedWallet, setSelectedWallet] = useState("");

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  const [address, setAddress] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    addWalletListener();
  }, []);

  const selectedMeta = () => {
    setAddress(`https://metamask.io/download.html`);
  };

  const selectedCoin = () => {
    setAddress(`https://www.coinbase.com/`);
  };

  const walletConnect = () => {
    setAddress("https://walletconnect.com/");
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  return (
    <div>
      <div className="first-area">
        <h2 className="select-title">Select Your Wallet</h2>

        <div className="select-wallet">
          <button onClick={selectedMeta} className="select-btn">
            <img className="image" src={meta} />
            <p className="button-text">MetaMask</p>
            {selectedWallet}
          </button>
          <button onClick={selectedCoin} className="select-btn">
            <img className="image" src={coinbase} />
            <p className="button-text">Coinbase Wallet</p>
          </button>
          <button onClick={walletConnect} className="select-btn">
            <img className="image" src={walleticon} />
            <p className="button-text">WalletConnect</p>
          </button>
        </div>
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
      </div>
      <div className="Minter">
        <br></br>
        <h1 id="title">🧙‍♂️ MyNftBrands NFT Minter</h1>
        <p>
          Simply add your asset's link, name, and description, then press
          "Mint."
        </p>
        <form>
          <h2>🖼 Link to asset: </h2>
          <input
            type="text"
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            onChange={(event) => setURL(event.target.value)}
          />
          <h2>🤔 Name: </h2>
          <input
            type="text"
            placeholder="e.g. My first NFT!"
            onChange={(event) => setName(event.target.value)}
          />
          <h2>✍️ Description: </h2>
          <input
            type="text"
            placeholder="e.g. Even cooler than cryptokitties ;)"
            onChange={(event) => setDescription(event.target.value)}
          />
        </form>
        <button id="mintButton" onClick={onMintPressed}>
          Mint NFT
        </button>
        <p id="status">{status}</p>
      </div>
    </div>
  );
};

export default Minter;
