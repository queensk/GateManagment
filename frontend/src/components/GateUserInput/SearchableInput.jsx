import React, { useState, useEffect } from "react";
import api from "../../api/api";

export default function SearchableInput({
  userVisitPerson,
  setUserVisit,
  setUserVisitId,
  options,
  setSearchWork,
}) {
  const [focusSearch, setFocusSearch] = useState(true);
  const handleSearch = (event) => {
    const userVisitPerson = event.target.value;
    setUserVisit(userVisitPerson);
  };

  const handleOptionClick = (option) => {
    setUserVisit(option?.name);
    setUserVisitId(option?.id);
    setFocusSearch(false);
  };
  useEffect(() => {
    const handleUserSearch = async () => {
      try {
        const response = await api.get(`/users/search/${userVisitPerson}`);
        const reqData = await response?.data?.users;
        setSearchWork([...reqData]);
      } catch (err) {
        console.log(err);
      }
    };
    handleUserSearch();
  }, [userVisitPerson, setSearchWork]);

  return (
    <div>
      <label>
        Who to visit
        <br />
        <input
          type="text"
          value={userVisitPerson}
          onChange={handleSearch}
          onFocus={() => setFocusSearch(true)}
        />
      </label>
      {userVisitPerson && options.length > 0 && focusSearch && (
        <ul className="searchUserData">
          {options?.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
