import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';
import { useGetUsersQuery, useGetUserByIdQuer, useSetNewUserMutation, useDeleteUserMutation, useUpdateUserMutation, listApi } from '../../app/api';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [login, setLogin] = useState('');
  const [userId, setUserId] = useState(1);

  const data  = useGetUsersQuery();

  const [setNewUser, setArgs] = useSetNewUserMutation();
  const [updateUser, updateArgs] = useUpdateUserMutation();
  const [deleteUser, deleteArgs] = useDeleteUserMutation();

  console.log(`setArgs`, setArgs);
  console.log(`updateArgs`, updateArgs);
  console.log(`deleteArgs`, deleteArgs);
  console.log(`data`, data);

  console.log(`setArgs.isLoading`, setArgs.isLoading);
  // dispatch({type: 'listApi/getUsers'});

  const incrementValue = Number(incrementAmount) || 0;

  // if (doQuery) {
  //   const q = useSetNewUserQuery({ login: "Papa", password: "syiasya", avatar : false });
  //   console.log(`q`, q);
  // }

  // useEffect(() => {
  //   const q = useSetNewUserQuery({ login: "Papa", password: "syiasya", avatar : false });
  //   console.log(`q`, q);
  // }, [doQuery])
  

  const handleDeleteUser = (id) => {
    deleteUser(id);
    // const q = useSetNewUserQuery({ login: "Papa", password: "syiasya", avatar : false });
    // console.log(`q`, q);
  }

  const handleNewUser = () => {
    setNewUser({
       login: "Mama", 
       password: "syiasya", 
       avatar : false
    });
    // const q = useSetNewUserQuery({ login: "Papa", password: "syiasya", avatar : false });
    // console.log(`q`, q);
  }


  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({type: 'counter/increment'})}
        >
          Add (Hand writed action creator)
        </button>
        <button onClick={handleNewUser}>
          Add User
        </button>
        <button onClick={() => handleDeleteUser(userId)}>
          Delete User #{userId}
        </button>
        <button onClick={() => dispatch(listApi.endpoints.deleteUser.initiate(userId))}>
          Delete User #{userId} (w/ dispatch)
        </button>
        <button onClick={() => { 
          updateUser({id: userId, login});
        }}>
          Update User #{userId}
        </button>
      </div>
      <div>
        Update User:
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        Delete User:
        <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      
      <div>
        Users:

        { setArgs.isLoading && 'Add user...'}
        {/* { setArgs.isSuccess && (
          <div>
            <h4>Login {setArgs.data.login} (id: {setArgs.data.id})</h4>
            <h5>Password {setArgs.data.password}</h5>
          </div>
        )} */}
        {data.isLoading && 'Get users....'}
        {data.isSuccess && data.data.map(user => (
          <div key={user.login + user.id}>
            <h4>Login: {user.login} (id: {user.id})</h4>
            <h5>Password: {user.password}</h5>
          </div>
        ))}

      </div>
    </div>
    
  );
}
