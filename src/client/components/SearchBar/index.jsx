import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from 'client/assets/images/Logo_ML.png';
import searchLogo from 'client/assets/images/ic_Search.png';
import styles from './style.module.scss';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState();
  return (
    <div className={styles.containerSearch}>
      <div className={styles.subcontainerSearch}>
        <img src={companyLogo} alt='Mercado Libre Logo' />
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          name='searchQuery'
          type='text'
          placeholder='Nunca dejes de buscar'
        />
        <Link to={`/items/search=${searchQuery}`} className={styles.link}>
          <img src={searchLogo} alt='Search Logo' />
        </Link>
      </div>
    </div>
  );
};

export default memo(SearchBar);
