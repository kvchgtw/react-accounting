import React, { useState } from 'react';
import styles from './styles/Form.module.css'

function Form({ onAddTransaction }) {
  const [type, setType] = useState('expense');
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAddTransaction = () => {
    if (itemName && amount && !isNaN(amount) && parseFloat(amount) > 0) {
      const newTransaction = {
        id: Date.now(),
        type: type,
        itemName: itemName,
        amount: parseFloat(amount),
      };
      onAddTransaction(newTransaction);
      setItemName('');
      setAmount('');
    } else {
      alert('資料輸入無效。請輸入有效的項目名稱與金額。');
    }
  };

  return (
    <div className={styles.inputContainer}>
      <select className={styles.dropdown} value={type} onChange={handleTypeChange}>
        <option value="expense">支出</option>
        <option value="income">收入</option>
      </select>
      <input className={styles.inputField} type="text" placeholder="項目名稱" value={itemName} onChange={handleItemNameChange} />
      <input className={styles.inputField} type="number" placeholder="金額" value={amount} onChange={handleAmountChange} />
      <button className={styles.addBtn} onClick={handleAddTransaction}>新增紀錄</button>
    </div>
  );
}

export default Form;


