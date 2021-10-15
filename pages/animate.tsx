import axios from 'axios';
import { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import SearchField from 'react-search-field';

import styles from '../styles/animate.module.css';

const Animate = () => {
  const [oldVal, setOldVal]= useState('')
  const [filterdVal, setFilterdVal]= useState('')
  const [url, setUrl]= useState('');
  const onChange = (e: string) => {
    setUrl(e);
    axios.get(`/api/requestProxy?url=${encodeURIComponent(e)}`).then(res => {
      setOldVal(res.data);
    });
    axios.get(`/api/animate?url=${encodeURIComponent(e)}`).then(res => {
      setFilterdVal(res.data);
    });
  }
  return (
    <div>
      <div id="searchBar" className={styles.searchBar}>
      <SearchField 
      placeholder='Search item'
      onChange={onChange}
    />
    <a href={`/api/animate?url=${encodeURIComponent(url)}`}> rss address </a>
      </div>
      <div id="result">
      <ReactDiffViewer oldValue={oldVal} newValue={filterdVal} splitView={true} />
      </div>
    </div>
  );
};
export default Animate;