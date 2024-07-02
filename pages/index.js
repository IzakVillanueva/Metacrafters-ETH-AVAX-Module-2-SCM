import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [message, setMessage] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const getMessage = async() => {
    if (atm) {
      setMessage(await atm.getMessage());
    }
  }

  const [inputAmount, setInputAmount] = useState(1);

  const handleInputChange = (event) => {
    setInputAmount(event.target.value);
  };

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(inputAmount);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(inputAmount);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button className="button-style" onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    if (message == undefined) {
      getMessage();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button className="button-style" onClick={deposit}>Deposit ETH</button>
        <button className="button-style" onClick={withdraw}>Withdraw ETH</button>
        <style jsx>{`
        p{
          width: auto;
          font-size: 0.9em;
          font-family: Verdana;
          font-weight: bold;
        }
        .button-style{
          background-color: #2F8682;
          border-radius: 2em;
          font-size: 0.9em;
          font-family: Verdana;
          margin: 0 10px;
          padding: 10px;
          cursor: pointer;
        }
        `}
        </style>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1 className="title">Welcome to the Krysallion Bank!</h1></header>
      <h2>Enter the amount to deposit/withdraw in ETH:</h2>
      <input
        type="number"
        value={inputAmount}
        onChange={handleInputChange}
        placeholder="Enter deposit amount in ETH"
        style={{ margin: '10px', 
          padding: '5px',
          fontFamily: 'Tahoma',
          fontSize: '1.6em' }}
      />
      <div className="bankDetails">
        {initUser()}
      </div>
      <div className="message">
        <p>{message}</p>
      </div>
      <style jsx>{`
        .container {
          background-color: #16223F;
          height: 95vh;
          padding: 3em 0 0 0;
          text-align: center
        }
        h2{
          margin: 30px 0 10px 0;
          font-family: Tahoma;
          font-size: 1.3em;
          color: #D3A518;
        }
        .title{
          background: linear-gradient(to right, #16223F, #FCB0DB, #16223F);
          border-radius: 0.7em;
          width: 65vw;
          margin: 0 auto;
          color: #D3A518;
          padding: 1rem;
          font-family: Tahoma;
          font-size: 4.8em;
          text-shadow: 
          -1px -1px 0 #000,  
          1px -1px 0 #000,
          -1px  1px 0 #000,
          1px  1px 0 #000;
        }
        .bankDetails{
          background: linear-gradient(to right, #16223F, #5C3A64, #E4796C, #F9F871, #F9F871, #F9F871, #E4796C, #5C3A64, #16223F);
          border-radius: 1em;
          width: 65vw;
          margin: 1em auto;
          padding: 1rem;
          font-size: 1.5em;
          font-family: Verdana;
        }
      `}
      </style>
    </main>
  )
}
