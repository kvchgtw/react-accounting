import React from 'react';
import styles from './styles/List.module.css'


function List({ transactions, onDeleteTransaction, balance }) {
  return (
    <div className={styles.listContainer}>
      {transactions.map((transaction) => (
        <div className={styles.transaction} key={transaction.id}>
          <div className={styles.typeAmountDiv}>
            <span className={`${styles.type} ${transaction.type === 'expense' ? styles.typeRed : ''}`}>
                {transaction.type === 'expense' ? '-' : ''}
            </span>
            <span className={`${styles.transactionAmount} ${transaction.type === 'expense' ? styles.transactionAmountRed : ''}`}>{transaction.amount}</span>
          </div>
          <div className={styles.itemName}>{transaction.itemName}</div>
          <button className={styles.deleteBtn} onClick={() => onDeleteTransaction(transaction.id)}>刪除</button>
        </div>
      ))}
      <div className="totals">
        <p>小計：{balance}</p>
      </div>
    </div>
  );
}

export default List;
