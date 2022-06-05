import React, { useState } from 'react';
import { MenuItem, Select, TextField } from '@mui/material';
import styles from '../styles/Main.module.css';
import { database } from './database';




export default function Main () {

  // Set different states
  const [data, set_data] = useState({...database});
  const [user_data, set_user_data] = useState({
    user_name: '',
    tier: 'TIER_1',
    amount: 0,
  })






  function handle_user_data (e) {
    set_user_data(prev => ({
      ...prev,
      [e.target.name] : e.target.value,
    }));
  }





  function handle_submit () {
    const {user_name, tier, amount} = user_data;
    if(user_name.trim().length < 1 || tier.trim().length < 1 || amount < 1) {
      alert('Fill all details please!');
      return;
    }


    set_data(prev => ({
      ...prev,
      [tier] : {
        members : {
          ...prev[`${tier}`]['members'],
          [user_name] : (prev[tier]['members'][user_name]) ? (prev[tier]['members'][user_name] + +amount) : +amount,
        },
        total : Number(prev[`${tier}`]['total']) + Number(amount)
      }
    }));

    alert('Deposited Successfully!')

  }



  const elements = Object.entries(data).map( each => {

    const members = ([each[1]['members']]);
    const members_2 = members[0];
    const members_3 = Object.entries(members_2);

    return (
      <div>
        <h2> {each[0]} </h2>
        <p> Members </p>
        <ol>
          {
            members_3.map(mem => {
            return <li> {`${mem[0]} --- ${mem[1]}`} </li> 
            })
          }
        </ol>
        <p> <b> Total: </b>{each[1]['total']} </p>
      </div>
    )
  })
  


  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <h1> ẹgbẹ ifowopamọ </h1>
        <TextField 
          type = 'text'
          label= 'name'
          fullWidth
          variant='outlined'
          name = 'user_name'
          onChange = {handle_user_data}
          value = {user_data.user_name}
          />
        
        <span> Select Tier </span>
        <Select 
          fullWidth 
          name = 'tier'
          value = {user_data.tier}
          onChange = {handle_user_data}
          >
          <MenuItem value='TIER_1'> TIER 1 </MenuItem>
          <MenuItem value='TIER_2'> TIER 2 </MenuItem>
          <MenuItem value='TIER_3'> TIER 3 </MenuItem>
        </Select>

        <span> Amount </span>
        <TextField 
          type = 'number'
          label= 'Amount'
          fullWidth
          variant='outlined'
          name = 'amount'
          value = {user_data.amount}
          onChange = {handle_user_data}
        />
        <button onClick={handle_submit} className={styles.button}> Deposit </button>

        <div className={styles.details}>
          <p> <b> Name: </b>  <br /> {user_data.user_name} </p>
          <p> <b> Tier: </b>  <br /> {user_data.tier} </p>
          <p> <b> Amount: </b>  <br /> {user_data.amount} </p>
          <p> <b> percentage: </b>  <br /> {
            (((user_data.tier === 'TIER_1' ? 7 :
              user_data.tier === 'TIER_2' ? 12 : 25) * user_data.amount) / 100) + +user_data.amount
            } ({
              `${(user_data.tier === 'TIER_1' ? 7 :
              user_data.tier === 'TIER_2' ? 12 : 25)}%`
            })
          </p>
        </div>
      </section>

      <section className={styles.right}>
        {
          elements
        }
      </section>
    </div>
  )
}

