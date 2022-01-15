import React,{useState} from 'react';
import './App.css';
import * as solanaWeb3 from '@solana/web3.js';
import {useConnection,useWallet} from '@solana/wallet-adapter-react';
import {FundTransfer} from './FundTransfer';

function App() {
  const [user,setUser]=useState("");
  const [userBalance,setUserBalance]=useState('---');
  const [senderAddress,setSenderAdress]=useState('');
  const [reciverAddress,SetReciverAddress]=useState('');
  const [ammount,setAmmount]=useState('');
  const {connection}=useConnection();
  const {sendTrnsaction}=useWallet();
  const getConnection= async ()=>{
    if(window.solana){
      if(window.solana.isPhantom){
        let users= await window.solana.connect();
        //console.log("user",user.publicKey.toString());
        let myUser=users.publicKey.toString();
        setUser(myUser);
        var connection = new solanaWeb3.Connection(
          solanaWeb3.clusterApiUrl('devnet'),
          'confirmed',
        );
        const wallet = users.publicKey;
        console.log(wallet);
        let _balance = await connection.getBalance(wallet)
        .then(function(data) {
          setUserBalance(data);
          console.log("Wallet Balance: " + data);
          return data;
        })
        .catch(function(error) {
          console.log(error);
          return error;
        });
      }
    }
  }
  /*const fundTranfer=callback(async()=>{
    
        const transaction =new Transaction().add(
            solanaWeb3.SystemProgram.transfer({
              fromPubkey:user,
              toPubkey:reciverAddress,
              lamports:1,
            })
          )
          const signatures= await sendTransaction(transaction,connection);
          await connection.confirmTransaction(signatures,'processed');
  },[ sendTransaction, connection]);*/        
  return (
    <div className="App">
      <header className="App-header">
          <h1>Solana Practice</h1>
          <div className="btn_connect">
              <div>
                <h3>let us connect with the wallat</h3>
              </div>
              <button className="connectBtn" onClick={getConnection}>Connect</button>
          </div>
      </header>
      <div className='container'>
        <div className='card'>
          <div className='card-body'>
              <section>
                <h2>UserData</h2>
              </section>
              <div className='userAdress'>
                  <div className='row'>
                      <div className='col'>
                        <span>User Adress :</span>    
                      </div>
                      <div className='col'>
                        <span style={{color:'rgb(9, 226, 154)',margin:'10px'}}>{user}</span>
                      </div>
                  </div>
              </div>
              <div className='balanceShow'>
                  <div className='row'>
                    <div className='col'>
                       <span>Balance :</span> 
                    </div>
                    <div className='col'>
                      <span style={{color:'rgb(9, 226, 154)'}}>
                        {userBalance} sol
                      </span>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <div className='fundTransfe'>
          <h2>Fund Transfer From one Account to other</h2>
          <FundTransfer/>
          {/*<div className='fields'>
              <input type="text" placeholder='Enter the Sender Adress Like a User who is conneceted' value={user} onChange={e=>{setSenderAdress(e.target.value)}}/>
              <input type="text" placeholder='Enter the Reciptent Adree' onChange={e=>{SetReciverAddress(e.target.value)}}/>
              <input  type="number" placeholder='Select ammount' onChange={e=>{setAmmount(e.target.value)}}/> 
              <button className="btn_transfer" >Transfer</button>
          </div>*/}
        </div>
      </div>
        
    </div>
    
  );
}

export default App;
