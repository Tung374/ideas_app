import './leftSection.css';
import axios from "axios";
import React, { useState, useContext, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

import { AuthContext } from "../../context/AuthContext";

function LeftSection () {
    const [showPostModal, setShowPostModal] = useState(false);
    const handleClosePostForm = () => setShowPostModal(false);
    const handleShowPostForm = () => setShowPostModal(true);

    const { user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    // post Idea
    const addDesc = useRef("")
    const addCategoryId = useRef("")
    
    const options = [
        { value: '625471b6de3b73d4f3fc2360', label: 'IoT' },
        { value: '62547239de3b73d4f3fc2362', label: 'AI' },
        { value: '6254728bde3b73d4f3fc2364', label: 'HRM' },
      ];
    const handleAddCategory = async (e) => {
        e.preventDefault();
        const isError = false
        if (addDesc.current.value.length > 500) 
        {
            addDesc.current.setCustomValidity("Description must not exceed 500 characters");
            isError = true
        }
        if(isError == false) {
            const body = {
                posterId: user._id,
                desc: addDesc.current.value,
                categoryId: addCategoryId.current.value,
            };
            try {
              await axios.post("/ideas/add", body);
            } catch (err) {
              console.log(err);
            }
          }
        handleClosePostForm()
    }
    return (
        <div className="leftSection">
                <img className="paddingBottom userAvatar"  src={user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"} alt=""></img>
                {user.role}
                {user._id}
                <Button 
                onMouseOver = {({target}) => target.style.backgroundColor="#008080"}
                onMouseOut = {({target}) => target.style.backgroundColor="#009999"}
                className="postButton"
                onClick={handleShowPostForm}>Post Idea</Button>
                <Modal className="myModal" show={showPostModal} onHide={handleClosePostForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Idea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddCategory}>
                        <div className="grid-container">
                            <label className="myCustomlabel item1">Idea Description:</label>
                            <textarea className="myCustomTextArea item2" ref={addDesc} placeholder="Description here" required type="text"/>
                        </div>
                        <div className="grid-container">
                            <label className="myCustomlabel item1">Category:</label>
                            <select ref={addCategoryId}>
                                <option value="625471b6de3b73d4f3fc2360">IoT</option>
                                <option value="62547239de3b73d4f3fc2362">AI</option>
                                <option value="6254728bde3b73d4f3fc2364">HRM</option>
                            </select>
                            {/* <Select ref={addCategoryId} 
                                    // defaultValue={addCategoryId}
                                    // onChange={setAddCategoryId}
                                    options={options}>
                            </Select> */}
                        </div>
                        <Button className="myCustomFooterButton" type="submit" variant="primary">
                            Post
                        </Button>
                        <Button className="myCustomFooterButton" variant="secondary" onClick={handleClosePostForm}>
                            Cancel
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
            </div>
    )
}
export default LeftSection;