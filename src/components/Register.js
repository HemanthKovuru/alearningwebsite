import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import axios from "axios";
import "./../scss/Register.scss";
import Success from "./../images/Icon awesome-check-circle.svg";
import AutoComplete from "./AutoComplete";

const Register = () => {
  const [interests, setInterests] = useState([]);
  const [suggestions, setSuggestions] = useState();
  const [query, setQuery] = useState();
  const [step, setStep] = useState("one");
  const [popUp, setPopUp] = useState(false);

  // register data
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  // popup box
  const handlePopUp = () => {
    setStep("one");
    setInterests([]);
    setPopUp(!popUp);
  };

  // register
  const handleRegister = (evt) => {
    evt.preventDefault();
    const options = {
      method: "POST",
      url: "https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        accept: "success",
        "x-rapidapi-key": "28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7",
        "x-rapidapi-host": "testpostapi1.p.rapidapi.com",
      },
      data: {
        name,
        email,
        interests: `${(interests[0], interests[1], interests[2])}`,
      },
    };

    axios
      .request(options)
      .then(function (res) {
        console.log(res);
        if (res.status === 200 && res.data.key1 === "val1") {
          setStep("two");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // interests api call
  const handleInterests = async (evt) => {
    setQuery(evt.target.value);
    const options = {
      method: "GET",
      url: "https://webit-keyword-search.p.rapidapi.com/autosuggest",
      params: { q: query, language: "en" },
      headers: {
        "x-rapidapi-key": "28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7",
        "x-rapidapi-host": "webit-keyword-search.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then(function (res) {
        console.log(res.data);
        setSuggestions(res.data.data.results);
        console.log("sugg", suggestions);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // display suggestion
  const handleSuggestionClick = (sug) => {
    setSuggestions();
    setInterests((oldArr) => [...oldArr, sug]);
    setQuery("");
  };

  // removeInterest
  const removeInterest = (int) => {
    setInterests((oldInt) => oldInt.filter((i) => i !== int));
  };

  return (
    <>
      <Navbar handlePopUp={handlePopUp} />
      {popUp && (
        <div className='background-box'>
          <div className='signup-box'>
            <span onClick={handlePopUp} className='cross'>
              &#10005;
            </span>

            {/* step-1 */}
            {step === "one" && (
              <div className='step1'>
                <h2 className='heading__secondary'>Register</h2>
                <div className='heading__sub'>It's quick and easy</div>

                <form onSubmit={handleRegister} className='form__signup'>
                  <input
                    className='form__input custom__input'
                    type='text'
                    placeholder='Full Name'
                    required
                    onChange={(evt) => setName(evt.target.value)}
                  />
                  <input
                    className='form__input custom__input'
                    type='email'
                    placeholder='Email'
                    required
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                  <input
                    className='form__input custom__input category-options'
                    type='text'
                    placeholder='Interests'
                    required
                    onChange={handleInterests}
                    id='clear'
                    disabled={interests.length === 3}
                    value={query}
                  />

                  {interests && (
                    <ul className='interests'>
                      {interests.map((int) => (
                        <li key={int}>
                          {int}
                          <span onClick={() => removeInterest(int)}>
                            &#10005;
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <AutoComplete
                    suggestions={suggestions}
                    handleSuggestionClick={handleSuggestionClick}
                  />
                  <button
                    type='submit'
                    className='btn btn-submit custom__input'>
                    Register
                  </button>
                </form>
              </div>
            )}
            {/* end of stpe 1 */}

            {/* step2  */}
            {step === "two" && (
              <div className='step2'>
                <img
                  className='success-logo'
                  src={Success}
                  alt='success logo'
                />
                <h3 className='heading-tertiary'>Registered.Successfull!</h3>
              </div>
            )}
            {/* end of step 2 */}
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
