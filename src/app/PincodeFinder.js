"use client";

import { useState } from 'react';
import axios from 'axios';
import styles from './PincodeFinder.module.css';


const PincodeFinder = () => {
  const [postOfficeName, setPostOfficeName] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reverseMode, setReverseMode] = useState(false);

  const getPincodeFromPostOffice = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.postalpincode.in/postoffice/${postOfficeName}`);
      if (response.data[0].Status === 'Success') {
        const pincode = response.data[0].PostOffice[0].Pincode;
        setPincode(pincode);
      } else {
        setError('Post Office not found.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPostOfficeFromPincode = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      if (response.data[0].Status === 'Success') {
        const postOffice = response.data[0].PostOffice[0].Name;
        setPostOfficeName(postOffice);
      } else {
        setError('Pincode not found.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
  <h1 className={styles.title}>{reverseMode ? 'Find Post Office from Pincode' : 'Find Pincode from Post Office'}</h1>
  <div className={styles.inputContainer}>
    <input
      className={styles.inputField}
      type="text"
      placeholder={reverseMode ? 'Enter Pincode' : 'Enter Post Office Name'}
      value={reverseMode ? pincode : postOfficeName}
      onChange={(e) => reverseMode ? setPincode(e.target.value) : setPostOfficeName(e.target.value)}
    />
    <button className={styles.btn} onClick={reverseMode ? getPostOfficeFromPincode : getPincodeFromPostOffice}>
      {reverseMode ? 'Get Post Office' : 'Get Pincode'}
    </button>
  </div>
  {loading && <p className={styles.loading}>Loading...</p>}
  {error && <p className={styles.error}>{error}</p>}
  {!loading && !error && (
    <div className={styles.result}>
      {reverseMode && postOfficeName && <p>Post Office: {postOfficeName}</p>}
      {!reverseMode && pincode && <p>Pincode: {pincode}</p>}
    </div>
  )}
  <div className={styles.toggleBtnContainer}>
    <button className={styles.toggleBtn} onClick={() => setReverseMode(!reverseMode)}>
      {reverseMode ? 'Switch to Find Pincode' : 'Switch to Find Post Office'}
    </button>
  </div>
</div>

  );
};

export default PincodeFinder;
