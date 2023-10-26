'use client'
import React, {useState, useEffect} from 'react'
import BacktoHome from '../components/navButton/BacktoHome'
import Form from '../components/functions/Form.js'
import List from '../components/functions/List.js'


const accountingPage = () => {
        const [transactions, setTransactions] = useState([]);

        useEffect(() => {
            // 在組件初次渲染時設置預設資料
            const defaultTransactions = [
              { id: 1, type: 'expense', itemName: '咖啡', amount: 50000 },
              { id: 2, type: 'income', itemName: '發票中獎', amount: 100000 },
            ];
        
            setTransactions(defaultTransactions);
          }, []);

        const handleAddTransaction = (newTransaction) => {
          setTransactions([...transactions, newTransaction]);
        };
      
        const handleDeleteTransaction = (id) => {
          const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
          setTransactions(updatedTransactions);
        };
        const totalExpense = transactions.filter((transaction) => transaction.type === 'expense').reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
        const totalIncome = transactions.filter((transaction) => transaction.type === 'income').reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
      
        const balance = totalIncome - totalExpense;
    
    return (
        <>
        <Form onAddTransaction={handleAddTransaction} />
        <hr />
      <List transactions={transactions} onDeleteTransaction={handleDeleteTransaction} totalExpense={totalExpense} totalIncome={totalIncome} balance={balance} />

        <div><BacktoHome /></div></>
    )
}

export default accountingPage

