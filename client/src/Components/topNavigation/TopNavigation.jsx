import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { BsMenuButtonWide } from "react-icons/bs";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router";
import React, {  useContext } from 'react';

import { AuthContext } from "../../context/AuthContext";

function TopNavigation (props) {

    const { user} = useContext(AuthContext);

    const navigate = useNavigate();
    const {currentMode} = props;
    const handleNavigate = (eventKey) => {
        navigate(eventKey);
    }
    const handleAdminNav = () => {
        if(user.role=="admin") 
        {
            return (
                <Dropdown.Item eventKey="/admin/category">Management Studio</Dropdown.Item>
        )}
    }
    
    return (
        <div className="navigationTop">
                        <FaSearch className="navigationContent iconSize"></FaSearch>
                        <form className="navigationContent takeRemainingSpace">
                            <input
                            placeholder="Search..."
                            required
                            type="text"
                            className="searchInput"
                            />
                        </form>
                        <BsMenuButtonWide className="navigationContent iconSize"></BsMenuButtonWide>
                        <DropdownButton onSelect={(e) => handleNavigate(e)} as={ButtonGroup} variant="primary" id="dropdown-basic-button" title={currentMode}>
                            <Dropdown.Item eventKey="/">Home</Dropdown.Item>
                            {handleAdminNav()}
                            <Dropdown.Item eventKey="3">Something else</Dropdown.Item>
                        </DropdownButton>
                        <Button  className="navigationContent signOutButton">
                            <label className="paddingRight">Sign Out</label>
                            <FaSignOutAlt className="iconSize"></FaSignOutAlt>
                        </Button>
                    </div>
    )
}
export default TopNavigation;