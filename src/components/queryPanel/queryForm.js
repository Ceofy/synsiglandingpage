import React from "react";
import PropTypes from "prop-types";

import styles from "./queryPanelStyles/queryForm.module.css";

const QueryForm = (props) => {
  const handleSubmit = (event) => {
    props.handleSubmit(event);
  };

  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };

  const handleAutocompleteClick = (suggestion) => {
    props.handleChange(suggestion);
  };

  const autocompleteSuggestions = props.autocompleteSuggestions.map(
    (suggestion) => {
      return (
        <div
          key={suggestion.refIndex}
          value={suggestion.item}
          onClick={(e) => handleAutocompleteClick(suggestion.item)}
        >
          {suggestion.item}
        </div>
      );
    }
  );
  return (
    <>
      <p className={styles.text}>{props.text1}</p>
      <div className={styles.queryForm}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <label className={styles.label}>
            <input
              type="text"
              value={props.query}
              placeholder="Eg. DLG2"
              onChange={handleChange}
              className={[
                styles.inputField,
                "form-control form-control-sm ml-0 my-1",
              ].join(" ")}
              id="searchBar"
            />
          </label>
          {autocompleteSuggestions.length > 0 ? autocompleteSuggestions : null}
          <input type="submit" value="Search" className={styles.inputButton} />
        </form>
      </div>
      <p className={styles.text}>{props.text2}</p>
    </>
  );
};

QueryForm.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  query: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

export default QueryForm;
