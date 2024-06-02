import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import icon from "../assets/weather-favicon-color.png";
import switchThemeIcon from "../assets/power.svg";
import locationIcon from "../assets/land-layer-location.svg";

const Header = () => {
    const [value, setValue] = useState('');

    return (
        <header className="sticky border-b border-pink-300 z-50 top-[.1px] rounded-lg bg-white px-5 py-3 w-full">
            <div className="w-4/5 relative mx-auto flex items-center justify-between">
                <div className="flex items-center px-3 py-1 hover:bg-pink-50 hover:scale-105 active:scale-95 cursor-pointer transition-all rounded-xl shadow-md">
                    <img src={icon} className="h-12 w-12" alt="logo" />
                    <span className='customFontFamily ml-2 select-none text-pink-500 text-2xl font-bold'>Weather API</span>
                </div>

                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <a
                                className="text-md hover:text-pink-400 hover:border-pink-400 transition-all pb-2 px-2 border-zinc-400 text-zinc-400 border-b"
                                href="#"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-md hover:text-pink-400 hover:border-pink-400 transition-all pb-2 px-2 border-zinc-400 text-zinc-400 border-b"
                                href="#"
                            >
                                Связь
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-md hover:text-pink-400 hover:border-pink-400 transition-all pb-2 px-2 border-zinc-400 text-zinc-400 border-b"
                                href="#"
                            >
                                О проекте
                            </a>
                        </li>
                        <li>
                            <button className="bg-pink-50 p-1 rounded-md hover:bg-pink-200 hover:scale-105 active:scale-95 transition-all">
                                <img src={switchThemeIcon} className="h-6 select-none w-6" alt="switch theme" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;