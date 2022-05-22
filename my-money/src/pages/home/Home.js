import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

//styles
import styles from "./Home.module.css"

// components
import { TransactionForm } from "./TransactionForm"
import TransactionList from "./TransactionList"

export default function Home(){
    const { user } = useAuthContext()
    const {documents, error} = useCollection(
        'transactions',
        ["uid", "==", user.uid], //This is the query parameter, so that transaction list only of the user who is logged in can be displayed
        ["createdAt", "desc"]
    )

    return (
        <div className={styles.container}>
           <div className={styles.content}>
               {error && <p>{error}</p>}
               {documents && <TransactionList transactions={documents} />} {/*If there is no error we will display the transaction list */}
           </div>
           <div className={styles.sidebar}>
              <TransactionForm uid={user.uid} /> {/*passing user's id as a prop */}
           </div>
        </div>
    )
}