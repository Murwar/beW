import React, {useState} from 'react';
import Link from "react-router-dom/Link";
import * as IoIcons from 'react-icons/io';
import {SidebarConstants} from "../constants";
import "./Navbar.css";
import {IconContext} from "react-icons";
import avatar from '../resources/images/avatar.png'
import store from "store";

const handleLogout = history => () => {
    store.remove('loggedIn');
    history.push('/login');
}

const Navbar = ({history}) => {
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
                        {SidebarConstants.map((item, index) => {
                            return (
                                <div>
                                    {item.title === 'Выйти' ?
                                        <li key={index} className={item.cName + ' active'}
                                            onClick={handleLogout(history)}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                        :
                                        <li key={index} className={item.cName + ' active'}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    }
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
                        {SidebarConstants.map((item, index) => {
                            return (
                                <div>
                                    {item.title === 'Выйти' ?
                                        <li key={index} className={item.cName} onClick={handleLogout(history)}>
                                            <Link to={item.path}>
                                                {item.icon}
                                            </Link>
                                        </li> :
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                            </Link>
                                        </li>
                                    }

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