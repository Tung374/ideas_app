import './closeDate.css'
import axios from "axios";
import { IoAddCircleSharp} from "react-icons/io5";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import React, { useState } from 'react';
import { useNavigate } from "react-router";
// to install: npm install react-bootstrap bootstrap@5.1.3
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// to install: npm install react-datepicker --save
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function CloseDate (props) {

    const year1 = ["#1", 2019, "1/1/2019", "30/4/2019", "30/6/2019"]
    const year2 = ["#2", 2020, "1/1/2020", "30/4/2020", "30/6/2020"]
    const year3 = ["#3", 2021, "1/1/2021", "30/4/2021", "30/6/2021"]
    const year4 = ["#4", 2022, "1/1/2022", "30/4/2022", "30/6/2021"]
    const years = [year1, year2, year3, year4]
    const {closeDates} = props

    const [closeDateId, setCloseDateId] = useState("");
    const [year, setYear] = useState("")
    const [openDate, setOpenDate] = useState(new Date());
    const [commentCloseDate, setCommentCloseDate] = useState(new Date());
    const [postCloseDate, setPostCloseDate] = useState(new Date());
    // Add modal
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddForm = () => setShowAddModal(false);
    const handleShowAddForm = () => setShowAddModal(true);
    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteForm = () => setShowDeleteModal(false);
    const handleShowDeleteForm = ( id, year, open , commentClose, postClose) => {
        setShowDeleteModal(true);
        
        setCloseDateId(id)
        setYear(year)
        setOpenDate(open);
        setCommentCloseDate(commentClose);
        setPostCloseDate(postClose);
    }
    // Update modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseUpdateForm = () => setShowUpdateModal(false);
    const handleShowUpdateForm = (id, year, open , commentClose, postClose) => {
        setShowUpdateModal(true);
        
        setCloseDateId(id)
        setYear(year)
        setOpenDate(open);
        setCommentCloseDate(commentClose);
        setPostCloseDate(postClose);
    }
    // Details modal
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleCloseDetailForm = () => setShowDetailModal(false);
    const handleShowDetailForm = (id, year, open , commentClose, postClose) => {
        setShowDetailModal(true);

        setCloseDateId(id)
        setYear(year)
        setOpenDate(open);
        setCommentCloseDate(commentClose);
        setPostCloseDate(postClose);
   }

   const handleAddCloseDate = async (e) => {
    e.preventDefault();
    const body = {
        year: year,
        openDate: openDate,
        commentCloseDate: commentCloseDate,
        postCloseDate: postCloseDate,
    };
    try {
        await axios.post("/closeDates/add", body);
        handleCloseAddForm()
    } catch (err) {
        console.log(err);
    }
}

    return (
        <div className="bottomRightSection">
                    <div className="tableContainer">

                            <div className="flexDirectionRow" >
                                <IoAddCircleSharp className="iconSize addIcon"></IoAddCircleSharp>
                                <Button className="addButtonContainer" onClick={handleShowAddForm}
                                onMouseOver = {({target}) => target.style.backgroundColor="#008080"}
                                onMouseOut = {({target}) => target.style.backgroundColor="#009999"}
                                >Add new Closing Date</Button>
                            </div>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Year</th>
                                    <th>Open Post Date</th>
                                    <th>Close Comment Date</th>
                                    <th>Close Post Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {closeDates.map((value, index) => {
                            return <tr>
                                <td>{value._id}</td>
                                <td>{value.year}</td>
                                <td>{value.openDate}</td>
                                <td>{value.commentCloseDate}</td>
                                <td>{value.postCloseDate}</td>
                                <td className="tableButtonContainer">
                                    <AiFillDelete className="deleteButton iconSize"
                                    onMouseOver = {({target}) => target.style.color="#b30000"}
                                    onMouseOut = {({target}) => target.style.color="red"} onClick={()=> handleShowDeleteForm(value._id, value.year, value.openDate, value.commentCloseDate, value.postCloseDate)}></AiFillDelete >
                                </td>
                                <td className="tableButtonContainer">
                                    <AiFillEdit className="editButton iconSize"
                                    onMouseOver = {({target}) => target.style.backgroundColor="#cccc00"}
                                    onMouseOut = {({target}) => target.style.backgroundColor="yellow"} onClick={()=> handleShowUpdateForm(value._id, value.year, value.openDate, value.commentCloseDate, value.postCloseDate)}></AiFillEdit>
                                </td>
                                <td className="tableButtonContainer">
                                    <BiDetail className="detailButton iconSize"
                                    onMouseOver = {({target}) => target.style.backgroundColor="#004080"}
                                    onMouseOut = {({target}) => target.style.backgroundColor="#0066cc"} onClick={()=> handleShowDetailForm(value._id, value.year, value.openDate, value.commentCloseDate, value.postCloseDate)}></BiDetail>
                                </td>
                            </tr>
                            })}
                            </tbody>
                        </Table>
                    </div>
                    {/* Add modal */}
                    <Modal className="myModal" show={showAddModal} onHide={handleCloseAddForm}>
                        <Modal.Header closeButton  className="modalHeader">
                            <Modal.Title  className="modalTitle">New Closing Date</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleAddCloseDate}>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Year:</label>
                                    <input className="myCustomInput item2" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required type="text"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Open Date:</label>
                                    <DatePicker required showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={openDate} onChange={(date) => setOpenDate(date)} />
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Comment Close Date:</label>
                                    <DatePicker required showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={commentCloseDate} onChange={(date) => setCommentCloseDate(date)} />
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Close Date:</label>
                                    <DatePicker required showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={postCloseDate} onChange={(date) => setPostCloseDate(date)} />
                                </div>
                                <Button className="myCustomFooterButton" type="submit" variant="primary">
                                    Post
                                </Button>
                                <Button className="myCustomFooterButton" variant="secondary" onClick={handleCloseAddForm}>
                                    Cancel
                                </Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Delete modal */}
                    <Modal className="myModal" show={showDeleteModal} onHide={handleCloseDeleteForm}>
                        <Modal.Header closeButton className="modalHeader">
                            <Modal.Title className="modalTitle">Are you sure to delete this category?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                            <div className="grid-container">
                                    <label className="myCustomlabel item1">Close Date ID:</label>
                                    <label className="myCustomlabel item2">{closeDateId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Year:</label>
                                    <label className="myCustomlabel item2">{year}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Open Date:</label>
                                    <label className="myCustomlabel item2">{openDate}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Comment Close Date:</label>
                                    <label className="myCustomlabel item2">{commentCloseDate}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Close Date:</label>
                                    <label className="myCustomlabel item2">{postCloseDate}</label>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDeleteForm}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleCloseDeleteForm}>
                                Confirm Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Update modal */}
                    <Modal className="myModal" show={showUpdateModal} onHide={handleCloseUpdateForm}>
                        <Modal.Header closeButton className="modalHeader">
                            <Modal.Title className="modalTitle">Updating Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Close Date ID:</label>
                                    <label className="myCustomlabel item2">{closeDateId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Year:</label>
                                    <input className="myCustomInput item2" value={year} onChange={(e) => setYear(e.target.value)} required type="text"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Open Date:</label>
                                    <DatePicker showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={openDate} onChange={(date) => setOpenDate(date)} />
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Comment Close Date:</label>
                                    <DatePicker showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={commentCloseDate} onChange={(date) => setCommentCloseDate(date)} />
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Close Date:</label>
                                    <DatePicker showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={postCloseDate} onChange={(date) => setPostCloseDate(date)} />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseUpdateForm}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleCloseUpdateForm}>
                                Confirm Change
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
    )
}
export default CloseDate;