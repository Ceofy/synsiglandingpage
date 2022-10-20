import React from "react";
import PropTypes from "prop-types";

import Autocomplete from "react-autocomplete";

import styles from "./queryPanelStyles/queryForm.module.css";

const QueryForm = (props) => {
  const handleSubmit = (event) => {
    props.handleSubmit(event);
  };

  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };

  return (
    <>
      <p className={styles.text}>{props.text1}</p>
      <div className={styles.queryForm}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <Autocomplete
            wrapperStyle={{ position: "relative" }}
            className={[styles.inputField].join(" ")}
            id="searchBar"
            items={props.autocompleteSuggestions}
            getItemValue={(suggestion) => suggestion.item}
            renderItem={(suggestion, isHighlighted) => (
              <div
                style={{
                  background: isHighlighted ? "lightgray" : "white",
                }}
              >
                {suggestion.item}
              </div>
            )}
            value={props.query}
            onChange={handleChange}
            onSelect={props.setAndSubmit}
            menuStyle={{
              borderRadius: "3px",
              boxShadow:
                "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
              padding: "2px 0",
              left: 0,
              top: 30,
              zIndex: 10,
              fontSize: "90%",
              position: "absolute",
              overflow: "scroll",
              height: "300px",
              backgroundColor: "white",
            }}
          />
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
