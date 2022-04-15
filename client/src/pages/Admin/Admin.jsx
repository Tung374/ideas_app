import './admin.css'
import axios from "axios";
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { BsMenuButtonWide, BsPeopleFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { IoNotifications,IoAddCircleSharp} from "react-icons/io5";
import { AiFillDelete, AiFillEdit, AiFillCalendar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
// to install: npm install react-bootstrap bootstrap@5.1.3
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import LeftSection from '../../Components/leftSection/LeftSection'
import TopNavigation from '../../Components/topNavigation/TopNavigation'
import CategoryCRUD from '../../Components/categoryCRUD/CategoryCRUD'
import StaffCRUD from '../../Components/staffCRUD/StaffCRUD'
import CloseDate from '../../Components/closeDate/CloseDate'
function Home () {
    const navigate = useNavigate();
    const ideas = [1,2,3,4,5]
    const handleNavigate = (eventKey) => {
        navigate(eventKey);
    }
    const [adminContent, setAdminContent] = useState("category")
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])
    const [closeDates, setCloseDates] = useState([])



    const showContent = (contentName) => {
        if(contentName=="category") {
            return (
                <CategoryCRUD categories={categories}></CategoryCRUD>
            )
        }
        if(contentName=="staff") {
            return (
                <StaffCRUD users={users}></StaffCRUD>
            )
        }
        if(contentName=="closeDate") {
            return (
                <CloseDate closeDates={closeDates}></CloseDate>
            )
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/users/allUsers", {})
                setUsers(res.data);
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchUsers();

        const fetchCategories = async () => {
            try {
                const res = await axios.get("/categories/allCategories", {})
                setCategories(res.data);
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchCategories();

        const fetchCloseDates = async () => {
            try {
                const res = await axios.get("/closeDates/allCloseDates", {})
                setCloseDates(res.data);
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchCloseDates();
    }, [adminContent]);


    return (
        <body className="screen">
            <LeftSection></LeftSection>
            <div className="rightSection">
                <div className="topRightSection">

                    <TopNavigation currentMode="Management Studio"></TopNavigation>

                    <div className="navigationTop">
                        <Button  className="navigationContent signOutButton takeRemainingSpace" onClick={() => setAdminContent("category")}>
                            <BiCategory className="iconSize paddingRight"></BiCategory>
                            <label className="paddingRight">Categories</label>
                        </Button>

                        <Button  className="navigationContent signOutButton takeRemainingSpace" onClick={() => setAdminContent("staff")}>
                            <BsPeopleFill className="iconSize paddingRight"></BsPeopleFill>
                            <label className="paddingRight">Staff</label>
                        </Button>
                        <Button  className="navigationContent signOutButton takeRemainingSpace" onClick={() => setAdminContent("closeDate")}>
                            <AiFillCalendar className="iconSize paddingRight"></AiFillCalendar>
                            <label className="paddingRight">Closing Date</label>
                        </Button>
                    </div>
                </div>
                {showContent(adminContent)}
            </div>
        </body>
    )
}
export default Home;