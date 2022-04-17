import './home.css'
import axios from "axios";
import { format } from 'date-fns';
import { FaSearch, FaSignOutAlt, FaComments } from 'react-icons/fa';
import { BsMenuButtonWide } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { IoNotifications, IoSend, IoCaretBackSharp, IoPlayBackSharp, IoCaretForwardSharp, IoPlayForwardSharp,} from "react-icons/io5";
import {IoIosCheckbox} from "react-icons/io"
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router";
// to install: npm install react-bootstrap bootstrap@5.1.3
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LeftSection from '../../Components/leftSection/LeftSection'
import TopNavigation from '../../Components/topNavigation/TopNavigation'

import { AuthContext } from "../../context/AuthContext";

function Home () {
    const { user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const navigate = useNavigate();
    //const ideas = [1,2,3,4,5]
    const AI = ["AI", 10]
    const IoT = ["IoT", 20]
    const Management = ["Management", 30]
    const Economic = ["Economic", 40]
    const categories = [AI, IoT, Management, Economic]
    const handleNavigate = (eventKey) => {
        navigate(eventKey);
    }

    const { user: currentUser, dispatch } = useContext(AuthContext);

    const [ideaId, setIdeaId] = useState("")
    const [ideaPosterId, setPosterId] = useState("")
    const [ideaCategoryId, setIdeaCategoryId] = useState("")
    const [ideaTitle, setIdeaTitle] = useState("")
    const [ideaDesc, setIdeaDesc] = useState("")
    const [ideaImg, setIdeaImg] = useState("")
    const [ideaCreatedAt, setIdeaCreatedAt] = useState(new Date())
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleCloseDetailForm = () => setShowDetailModal(false);
    const handleShowDetailForm = (id, posterId, categoryId, title, desc, img, created) => {
        setShowDetailModal(true);
        setIdeaId(id)
        setPosterId(posterId)
        setIdeaCategoryId(categoryId)
        setIdeaTitle(title)
        setIdeaDesc(desc)
        setIdeaImg(img)
        created = new Date(created)
        setIdeaCreatedAt(format(created, "dd-MM-yyyy-hh:mm"))
        getLiked()
   }

    // fetch ideas
    const [ideas, setIdeas] = useState([])
    const [reversedIdeas, setReversedIdeas] = useState([])

    const fetchIdeas = async () => {
        try {
            const res = await axios.get("/ideas/allIdeas", {})
            setIdeas(res.data);
            setReversedIdeas(res.data.reverse())
        }
        catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchIdeas();
    }, []);

    const ideasContent = () => {
        segmentIdeasList(reversedIdeas)
        
    }

    // algorithm for segmenting the ideas list
    const [segmenTedList, setSegmentedList] = useState([])

    const segmentIdeasList = (inputArray) => {
        const outputArray = []
        inputArray.map((value, index) => {
            if(index % 5 == 0) {
                outputArray.push(inputArray.slice(index, index + 5))
            }
        })
        setSegmentedList(outputArray)
    }
    const[segmentListIndex, setSegmentListIndex] = useState(0)
    const getIndexButtons = () => {
        for(var i = 0; i < segmenTedList.length; i++ ) {
            return (
                <Button onClick={() => setSegmentListIndex(i)}>{i+1}</Button>
            )
        }
    }

    const handleLike = async (target) => {
        try {
            const body = {
                userId: user._id
            }
            const res = await axios.put("/ideas/like/" + ideaId, body);
            if(res.data == "The post has been liked") {
                target.style.color = "#206040"
            } else {
                target.style.color = "#39ac73"
            }
        } catch (err) {
        console.log(err);
        }
    }
    const likeButton = useRef()
    const getLiked = async () => {
        const body = {
            userId: user._id
        }
        try {
            const res = await axios.get("/ideas/like/" + ideaId, body);
            // return the appropriate color of like button
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const commentInput = useRef()
    
    return (
        <div className="screen">
            <LeftSection></LeftSection>
            <div className="rightSection">
                <div className="topRightSection">

                    <TopNavigation currentMode="Home"></TopNavigation>

                    <div className="navigationTop">
                        <Button  className="navigationContent signOutButton takeRemainingSpace">
                            <GiEarthAmerica className="iconSize paddingRight"></GiEarthAmerica>
                            <label className="paddingRight">Explore</label>
                        </Button>

                        <Button  className="navigationContent signOutButton takeRemainingSpace">
                            <IoNotifications className="iconSize paddingRight"></IoNotifications>
                            <label className="paddingRight">Notifications</label>
                        </Button>
                    </div>
                </div>
                <div className="bottomRightSection">
                    <div className="ideasContainer">
                        {reversedIdeas.map((value, index) => {
                        return (
                            <div className="idea" onClick={() => handleShowDetailForm(value._id, value.posterId, value.categoryId, value.title, value.desc, value.img, value.createdAt)}>
                                <div className="postDate paddingSurounding">
                                    {value.createdAt}
                                </div>
                                <div className="paddingSurounding ideaHeadline">
                                    {/* <img className="paddingBottom posterAvatar paddingRight"  src="https://i.guim.co.uk/img/media/3aab8a0699616ac94346c05f667b40844e46322f/0_123_5616_3432/master/5616.jpg?width=700&quality=85&auto=format&fit=max&s=a476da702aff265ce6f586be1412b1e1"></img> */}
                                    <img className="paddingBottom posterAvatar"  
                                    src={value.img
                                    ? PF + value.img
                                    : PF + "person/noAvatar.png"} alt=""></img>
                                    <label className="ideaTitle">{value.title}</label>
                                </div>
                            </div>
                            )
                        })}

                        <div className="ideaListNavigation">
                            <IoPlayBackSharp className="iconSize"></IoPlayBackSharp>
                            <IoCaretBackSharp className="iconSize"></IoCaretBackSharp>
                            <Button>
                                1
                            </Button>
                            <IoCaretForwardSharp className="iconSize"></IoCaretForwardSharp>
                            <IoPlayForwardSharp className="iconSize"></IoPlayForwardSharp>
                        </div>
                    </div>

                    <div className="categoryContainer">
                        <u className="bigLabel">Categories:</u>
                        {categories.map((value, index) => {
                            return <div>
                                <IoIosCheckbox></IoIosCheckbox>
                                {value[0]}
                                ({value[1]})
                            </div>
                        })}
                    </div>

                </div>
            </div>
            {/* detail modal */}
            <Modal className="myModal" show={showDetailModal} onHide={handleCloseDetailForm}>
                <Modal.Header closeButton className="modalHeader">
                    <Modal.Title className="modalTitle">{ideaTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid-container">
                        <label className="myCustomlabel item2">{ideaCreatedAt}</label>
                    </div>
                    <div className="grid-container">
                        <label className="myCustomlabel item1">Description:</label>
                        <label className="myCustomlabel item2">{ideaDesc}</label>
                    </div>
                    <div className="navigationContent paddingSurounding">
                                    <form className="navigationContent takeRemainingSpace">
                                        <input
                                        placeholder="Leave a comment..."
                                        required
                                        ref={commentInput}
                                        type="text"
                                        className="searchInput"
                                        />
                                    </form>
                                    <button className="borderlessButton">
                                        <IoSend
                                        className="iconSize ideaButton"></IoSend>
                                    </button>
                                    <button className="borderlessButton" ref={likeButton}>
                                        <AiFillLike
                                        className="iconSize ideaButton"
                                        onClick = {({target}) => handleLike(target)}></AiFillLike>
                                    </button>
                                    <button className="borderlessButton">
                                        <FaComments
                                        className="iconSize ideaButton"></FaComments>
                                    </button>
                                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseDetailForm}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Home;