import './Home.css'
import { FaSearch, FaSignOutAlt, FaComments } from 'react-icons/fa';
import { BsMenuButtonWide } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { IoNotifications, IoSend, IoCaretBackSharp, IoPlayBackSharp, IoCaretForwardSharp, IoPlayForwardSharp, 
     IoIosCheckboxOutline } from "react-icons/io5";
import {IoIosCheckbox} from "react-icons/io"
import { AiFillLike, AiFillDislike } from "react-icons/ai";
function Home () {
    const ideas = [1,2,3,4,5];
    const AI = ["AI", 10];
    const IoT = ["IoT", 20]
    const Management = ["Management", 30]
    const Economic = ["Economic", 40]
    //const categories = ["AI", "IoT", "Management", "Economic"]
    const categories = [AI, IoT, Management, Economic]

    return (
        <div className="screen">
            <div className="leftSection">
                <img className="paddingBottom userAvatar"  src="https://i.guim.co.uk/img/media/3aab8a0699616ac94346c05f667b40844e46322f/0_123_5616_3432/master/5616.jpg?width=700&quality=85&auto=format&fit=max&s=a476da702aff265ce6f586be1412b1e1"></img>
                <button className="postButton">Post Idea</button>
            </div>
            <div className="rightSection">
                <div className="topRightSection">

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
                        <button  className="navigationContent signOutButton">
                            <label className="paddingRight">Sign Out</label>
                            <FaSignOutAlt className="iconSize"></FaSignOutAlt>
                        </button>
                    </div>

                    <div className="navigationTop">
                        <button  className="navigationContent signOutButton takeRemainingSpace">
                            <GiEarthAmerica className="iconSize paddingRight"></GiEarthAmerica>
                            <label className="paddingRight">Explore</label>
                        </button>

                        <button  className="navigationContent signOutButton takeRemainingSpace">
                            <IoNotifications className="iconSize paddingRight"></IoNotifications>
                            <label className="paddingRight">Notifications</label>
                        </button>
                    </div>
                </div>
                <div className="bottomRightSection">

                    <div className="ideasContainer">

                        {ideas.map((value, index) => {
                            return <div className="idea">
                            <div className="postDate paddingSurounding">
                                25/03/2022
                            </div>
                            <div className="paddingSurounding ideaHeadline">
                                <img className="paddingBottom posterAvatar paddingRight"  src="https://i.guim.co.uk/img/media/3aab8a0699616ac94346c05f667b40844e46322f/0_123_5616_3432/master/5616.jpg?width=700&quality=85&auto=format&fit=max&s=a476da702aff265ce6f586be1412b1e1"></img>
                                <label className="ideaTitle">AI assisted construction of flood scenarios mapping and flood preventation</label>
                            </div>
                            <div className="navigationContent paddingSurounding">
                                <form className="navigationContent takeRemainingSpace">
                                    <input
                                    placeholder="Leave a comment..."
                                    required
                                    type="text"
                                    className="searchInput"
                                    />
                                </form>
                                <button className="borderlessButton">
                                    <IoSend className="iconSize"></IoSend>
                                </button>
                                <button className="borderlessButton">
                                    <AiFillLike className="iconSize"></AiFillLike>
                                </button>
                                <button className="borderlessButton">
                                    <AiFillDislike className="iconSize"></AiFillDislike>
                                </button>
                                <button className="borderlessButton">
                                    <FaComments className="iconSize"></FaComments>
                                </button>
                            </div>
                        </div>
                        })}

                        <div className="ideaListNavigation">
                            <IoPlayBackSharp className="iconSize"></IoPlayBackSharp>
                            <IoCaretBackSharp className="iconSize"></IoCaretBackSharp>
                            <button>
                                1
                            </button>
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
        </div>
    )
}
export default Home;