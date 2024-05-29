import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import icon from "../assets/weather-favicon-color.png";
import switchThemeIcon from "../assets/power.svg";
import locationIcon from "../assets/land-layer-location.svg";

const Header = () => {

    return (
        <header className="sticky border-b border-pink-300 z-50 top-[.1px] rounded-lg bg-white px-5 py-3 w-full">
            <div className="w-4/5 relative mx-auto flex items-center justify-between">
                <div className="flex items-center px-3 py-1 hover:bg-pink-50 hover:scale-105 active:scale-95 cursor-pointer transition-all rounded-xl shadow-md">
                    <img src={icon} className="h-12 w-12" alt="logo" />
                    <span className='customFontFamily ml-2 select-none text-pink-500 text-2xl font-bold'>Weather API</span>
                </div>

                <div className="relative min-w-72">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-pink-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block outline-none w-full p-3 pl-10 text-md text-zinc-900 border border-pink-400 rounded-lg " placeholder="Чернобыль..." required />
                    <button type="submit" className="text-white select-none absolute end-1.5 bottom-2 bg-pink-400 hover:bg-pink-500 outline-none active:bg-pink-300 transition-all font-medium rounded-lg text-sm px-2 py-2">Поиск</button>
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
                    </ul>
                </nav>

                <div className="flex gap-6">
                    <button className="bg-pink-50 p-1 rounded-md hover:bg-pink-200 hover:scale-105 active:scale-95 transition-all">
                        <img src={locationIcon} className="h-6 select-none w-6" alt="use geolocation" />
                    </button>
                    <button className="bg-pink-50 p-1 rounded-md hover:bg-pink-200 hover:scale-105 active:scale-95 transition-all">
                        <img src={switchThemeIcon} className="h-6 select-none w-6" alt="switch theme" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;