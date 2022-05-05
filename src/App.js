import React, { useState} from 'react'

import logo from './logo.svg';
import './App.css';
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'


const injected = injectedModule()
const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/cf540cb0b3b643d399e59aef4f5ac179'
  }
  ],
  appMetadata: {
    name: 'My App',
    icon: '<SVG_ICON_STRING>',
    description: 'My app using Onboard'
  }
});


function App() {
  const [wallet, setWallet] = useState({});
  const [connected, setConnected] = useState(false);
  async function wallets(){
    const wallets = await onboard.connectWallet();
    setConnected(true);
    console.log(wallets);
    setWallet(wallets)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo}  alt="logo" width={250}  />
        <p>
        Integrate Web3-Onboard <span className='App-link'>in under 5 minutes.</span>
        </p>
          {!connected ?
          <button onClick={wallets}>Get Wallets</button> :
              wallet.map(({ label, accounts, index}) => {
              return (
                <div>
                  <p>{label}</p>
                  <p>Here are your connected accounts' details are: {JSON.stringify(accounts, null, 2)}</p>
                </div>
              )
            })
          }
      </header>
    </div>
  );
}

export default App;
