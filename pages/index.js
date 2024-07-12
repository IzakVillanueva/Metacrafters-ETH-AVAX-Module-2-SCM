import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Tavern.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [tab, setTab] = useState(undefined);
  const [inputAmount, setInputAmount] = useState(1);
  const [level, setLevel] = useState(0);

  const contractAddress = "0xc5a5C42992dECbae36851359345FE25997F5C42d";
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

  const getTab = async() => {
    if (atm) {
      setTab((await atm.getTab()).toNumber());
    }
  }

  const getLevel = async() => {
    if (atm) {
      setLevel((await atm.getLevel()).toNumber());
    }
  }

  const handleInputChange = (event) => {
    setInputAmount(event.target.value);
  };

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(inputAmount);
      await tx.wait();
      getTab();
    }
  }

  const purchaseBeer = async() => {
    if (atm) {
      let tx = await atm.purchase(1);
      await tx.wait();
      getTab();

      let lx = await atm.increaseLevel(2);
      await lx.wait();
      getLevel();
    }
  }

  const purchaseWine = async() => {
    if (atm) {
      let tx = await atm.purchase(4);
      await tx.wait();
      getTab();

      let lx = await atm.increaseLevel(5);
      await lx.wait();
      getLevel();
    }
  }

  const purchaseChampagne = async() => {
    if (atm) {
      let tx = await atm.purchase(7);
      await tx.wait();
      getTab();

      let lx = await atm.increaseLevel(8);
      await lx.wait();
      getLevel();
    }
  }

  const purchaseVodka = async() => {
    if (atm) {
      let tx = await atm.purchase(6);
      await tx.wait()
      getTab();

      let lx = await atm.increaseLevel(11);
      await lx.wait();
      getLevel();
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

    if (tab == undefined) {
      getTab();
    }

    if (level == undefined) {
      getLevel();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p className='bac'>Your Current Blood Alochol Concentration: 0.{level}%</p>
        <p className='tab'>Your Current Tab: {tab} ETH</p>
        <button className="button-style" onClick={deposit}>Deposit ETH</button>
        <style jsx>{`
        p{
          width: auto;
          font-size: 0.9em;
          font-family: Verdana;
          font-weight: bold;
        }
        .bac{
          color: #AA4A44;
        }
        .tab{
          color: #AAFF00;
        }
        .button-style{
          background-color: #2F8682;
          border-radius: 2em;
          font-size: 0.9em;
          font-family: Verdana;
          margin: 0 10px;
          padding: 10px;
          cursor: pointer;
          font-weight: bold;
        }
        `}
        </style>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1 className="title">Drink your way to the Trusty Tavern!</h1></header>
      <div className='parent'>
        <div className='bankDetails'>
          <h2>Enter the amount to deposit in ETH:</h2>
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
        </div>
        <div className="bankDetails">
          {initUser()}
        </div>
      </div>
      <div className='menu'>
          <div className='row'>
              <div className='item'>
                <img 
                  src="https://icons.iconarchive.com/icons/iconarchive/fat-sugar-food/256/Drink-Beer-icon.png"
                  alt="new" width="400" height="400"
                />
                <h3>Beer 1 ETH</h3>
                <button className="button-style" onClick={purchaseBeer}>Purchase</button>
              </div>
              <div className='item'>
                <img 
                  src="https://images.vexels.com/media/users/3/214542/isolated/lists/0b2ce2d5441305592a00ca20e6d65b51-wine-hand-drawn-bottle.png"
                  alt="new" width="400" height="400"
                />
                <h3>Wine 4 ETH</h3>
                <button className="button-style" onClick={purchaseWine}>Purchase</button>
              </div>
          </div>
          <div className='row'>
              <div className='item'>
                <img 
                  src="https://images.vexels.com/media/users/3/299726/isolated/lists/9017bffeaa27404ed14f87e6d8925d04-bottle-of-champagne-with-a-number-1-on-it.png"
                  alt="new" width="400" height="400"
                />
                <h3>Champagne 7 ETH</h3>
                <button className="button-style" onClick={purchaseChampagne}>Purchase</button>
              </div>
              <div className='item'>
                <img 
                  src="https://cdn-icons-png.flaticon.com/256/5821/5821488.png"
                  alt="new" width="400" height="400"
                />
                <h3>Vodka 6 ETH</h3>
                <button className="button-style" onClick={purchaseVodka}>Purchase</button>
              </div>
          </div>
      </div>
      <style jsx>{`
        .container {
          background-color: #16223F;
          padding: 2em 0 1em 0;
          text-align: center
        }
        h2{
          font-family: Tahoma;
          font-size: 1em;
        }
        .title{
          background: linear-gradient(to right, #16223F, #CD7F32, #16223F);
          border-radius: 0.7em;
          width: 80vw;
          margin: 0 auto;
          color: #F0E68C;
          padding: 1rem;
          font-family: Tahoma;
          font-size: 3.6em;
          text-shadow: 
          -3px -3px 0 #000,  
          3px -3px 0 #000,
          -3px  3px 0 #000,
          3px  3px 0 #000;
        }
        .parent {
          border: 5px solid #80461B;
          border-radius: 0.7em;
          width: 70vw;
          margin: 1rem auto;
          text-align: center;
        }
        .bankDetails{
          display: inline-block;
          vertical-align: middle;
          color: #F0E68C;
          border-radius: 1em;
          margin: 1em auto;
          font-size: 1em;
          font-family: Verdana;
        }
        .menu {
          border: 5px solid #80461B;
          border-radius: 0.7em;
          width: 90vw;
          margin: 1rem auto;
          text-align: center;
        }
        .row {
          border-radius: 0.7em;
          margin: 0 auto;
          text-align: center;
        }
        .item {
          border: 1px solid black;
          padding: 0.5em 0.5em 0 0.5em;
          display: inline-block;
          width: 43vw;
        }
        h3{
          color: #F0E68C;
          padding: 0;
          font-family: Tahoma;
          font-size: 2em;
          text-shadow: 
          -3px -3px 0 #000,  
          3px -3px 0 #000,
          -3px  3px 0 #000,
          3px  3px 0 #000;
        }
        .button-style{
          background-color: #2F8682;
          border-radius: 2em;
          font-size: 0.9em;
          font-family: Verdana;
          margin: 0 0 1em 0;
          padding: 10px;
          cursor: pointer;
          font-weight: bold;
        }
      `}
      </style>
    </main>
  )
}
