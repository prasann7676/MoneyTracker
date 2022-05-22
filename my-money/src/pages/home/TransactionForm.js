import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

//styles
import styles from './Home.module.css';


export function TransactionForm( {uid} ) {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");  
  const { addDocument, response } = useFirestore('transactions')
  
  const handleSubmit = (e) => {
      e.preventDefault()
      addDocument({
          uid,   // userid to only show transactions, for a partcular user(who is logged in)
          name,
          amount
      })
  }


  //This useEffect is used to reset the transaction form to clear, after form is being submitted
  // But we will only do it, if adding document to the firestore was successfull
  useEffect(() => {
    if(response.success){
      setName("")
      setAmount("")
    }
  },[response.success])

  return (
    <>
       <h3>Add a Transaction</h3>
       <form onSubmit={handleSubmit}>
         <label> 
           <span> Transaction name:</span>
           <input 
               type="text"
               required
               onChange={(e) => setName(e.target.value)}
               value={name}
           />
         </label>
         <label> 
           <span> Amount:</span>
           <input 
               type="number"
               required
               onChange={(e) => setAmount(e.target.value)}
               value={amount}
           />
         </label>
         <button className={styles.btnt}>Add Transaction</button>
       </form> 
    </>
  )
}
