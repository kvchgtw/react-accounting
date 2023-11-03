'use client'
import React, { useState, useEffect } from 'react';
import BacktoHome from '../components/navButton/BacktoHome';
import Form from '../components/functions/Form.js';
import List from '../components/functions/List.js';
import { getFirestore, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/database/database';



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const transactionsCollection = collection(db, 'transactions');

function AccountingPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'transactions'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    });

    return () => {
      // 在組件卸載時取消監聽
      unsubscribe();
    };
  }, []); // 空的依賴陣列表示只在組件初次渲染時執行

  
  const handleDeleteTransaction = async (id) => {
    try {
      // 將 id 轉換為文件參考
      const transactionDocRef = doc(transactionsCollection, `${id}`);
      // 刪除文件
      await deleteDoc(transactionDocRef);
  
      // 更新本地狀態
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction: ', error);
    }
  };


  const totalExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <>
      <Form />
      <hr />
      <List transactions={transactions} onDeleteTransaction={handleDeleteTransaction} totalExpense={totalExpense} totalIncome={totalIncome} balance={balance} />
      <div>
        <BacktoHome />
      </div>
    </>
  );

}
export default AccountingPage;
