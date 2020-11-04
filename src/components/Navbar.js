import React, {useState} from 'react';
import Link from "react-router-dom/Link";
import * as IoIcons from 'react-icons/io';
import {SidebarData} from "./SidebarData";
import "./Navbar.css";
import {IconContext} from "react-icons";
import avatar from '../resources/images/avatar.png'

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <nav className={'sidebar'}>
            <IconContext.Provider value={{color: '#fffff'}}>
                {sidebar ?
                    <div className="navbar active">
                        <img src={avatar} alt={"Avatar"}/>
                        <span className={'title_accommodation'}>web guest house</span>

                        <Link to="#" className="menu-bars active">
                            <IoIcons.IoMdArrowDropleft onClick={showSidebar}/>
                        </Link>

                    </div>
                    :
                    <div className="navbar">
                        <img src={avatar} alt={"Avatar"}/>
                        <Link to="#" className="menu-bars">
                            <IoIcons.IoMdArrowDropright onClick={showSidebar}/>
                        </Link>
                    </div>
                }


                {sidebar ?
                    <div className={'navmenu active'}>
                        {SidebarData.map((item, index) => {
                            return (
                                <div>
                                    <li key={index} className={item.cName + ' active'}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                    {index === 3 ?
                                        <div className={"acc_section"}>
                                            <hr/>
                                            <span>Работа с объектом</span>
                                        </div>
                                        :
                                        index === 5 ?
                                            <hr/>
                                            :
                                            <></>
                                    }
                                </div>)
                        })}
                    </div>
                    :
                    <div className={'navmenu nonactive'}>
                        {SidebarData.map((item, index) => {
                            return (
                                <div>
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                        </Link>
                                    </li>
                                    {index === 3 || index === 5 ?
                                        <hr/>
                                        :
                                        <></>
                                    }
                                </div>
                            )
                        })}
                    </div>
                }

            </IconContext.Provider>
        </nav>
    );
}

export default Navbar;