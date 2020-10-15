import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./../RoomsTab.css";

const SideBarSearch = () => {
  return (
    <div className='sidebar-search'>
      <div className='sidebar-search__body'>
        <SearchIcon />
        <input type='text' placeholder='Search or start new chat' />
      </div>
    </div>
  );
};

export default SideBarSearch;
