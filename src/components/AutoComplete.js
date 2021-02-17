import React from "react";

const AutoComplete = ({ suggestions, handleSuggestionClick }) => {
  return (
    <>
      {suggestions && (
        <div className='suggestion__dropdown'>
          {suggestions.map((sug) => (
            <li onClick={() => handleSuggestionClick(sug)}>{sug}</li>
          ))}
        </div>
      )}
    </>
  );
};

export default AutoComplete;
