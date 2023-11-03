import React, { useState } from 'react';
import styles from './styles/Form.module.css'
import { getFirestore, collection, addDoc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../database/database';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Form() {
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

  const handleAddTransaction = async () => {
    if (itemName && amount && !isNaN(amount) && parseFloat(amount) > 0) {
      try {
        // 將記帳資料包含 docRef.id 寫入 Firestore 資料庫中的 "transactions" 集合
        const docRef = await addDoc(collection(db, 'transactions'), {
          type: type,
          itemName: itemName,
          amount: parseFloat(amount),
          documentId: '', // 在這裡保留一個欄位來存儲 docRef.id
        });

        // 更新 docRef.id 欄位為 Firebase 自動生成的文件 ID
        await updateDoc(docRef, {
          documentId: docRef.id,
        });

        // 清空表單輸入
        setItemName('');
        setAmount('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
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


