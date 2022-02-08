import PropTypes from 'prop-types';
import React, { useState } from 'react';

import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

function Header({ title, searchBar }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div>
      <div className="div-header">
        <a href="/profile">
          <img
            className="profileIcon"
            type="image/svg+xml"
            alt="Profile Icon"
            data-testid="profile-top-btn"
            src={ profileIcon }
          />
        </a>

        <h1 data-testid="page-title">{title}</h1>

        {searchBar && (
          <a href={ SearchBar } onClick={ handleClick }>
            <img
              className="serchIcon"
              type="image/svg+xml"
              alt="Sherch Icon"
              data-testid="search-top-btn"
              src={ searchIcon }
            />
          </a>
        )}
      </div>
      {isDisabled && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  searchBar: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  searchBar: true,
};

export default Header;
