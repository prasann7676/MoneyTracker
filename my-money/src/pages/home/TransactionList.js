import { useFirestore } from '../../hooks/useFirestore';

//styles
import styles from './Home.module.css';

export default function TransactionList({ transactions }) {

  const { deleteDocument, response } = useFirestore('transactions')  

  console.log(response)

  return (
    <ul className={styles.transactions}> {/*transaction class defines inside Home.module.css */}
        {transactions.map((transaction) => (
            <li key={transaction.id}>
                <p className={styles.name}>{transaction.name}</p>
                <p className={styles.amount}>₹ {transaction.amount}</p>
                <button onClick={() => { 
                    alert(`Do you Want to Delete ${transaction.name}?`)
                    deleteDocument(transaction.id)
                  }
                }>X</button>
            </li> // This id is the document id.
        ))}
    </ul>
  )
}