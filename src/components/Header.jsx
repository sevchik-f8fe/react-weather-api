import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import icon from "../assets/weather-favicon-color.png";
import switchThemeIcon from "../assets/power.svg";

const Header = () => {
    const [theme, setTheme] = useState(() => {
        const initialTheme = localStorage.getItem("theme");
        return initialTheme ? initialTheme : "light";
    });

    useEffect(() => {
        if (window.matchMedia('{prefers-color-scheme: dark}').matches) {
            setTheme('dark');
        } else setTheme('light');
    }, [])

    useEffect(() => {
        getThemeFromLocalStorage();

        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme])

    const getThemeFromLocalStorage = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    }

    return (
        <header className="sticky dark:bg-zinc-900 border-b dark:border-transparent border-pink-300 z-50 top-[.1px] bg-white px-5 py-3 w-full">
            <div className="w-4/5 relative mx-auto flex items-center justify-between">
                <div className="flex items-center px-3 py-1 dark:hover:bg-zinc-900 dark:shadow-sm dark:shadow-zinc-700 hover:bg-pink-50 hover:scale-105 active:scale-95 cursor-pointer transition-all rounded-xl shadow-md">
                    <img src={icon} className="h-12 w-12" alt="logo" />
                    <span className='customFontFamily ml-2 select-none text-pink-500 dark:text-pink-600 text-2xl font-bold'>Weather API</span>
                </div>

                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <a
                                className="text-md hover:text-pink-500 hover:border-pink-500 transition-all pb-2 px-2 border-zinc-400 text-zinc-400 border-b"
                                href="#"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-md hover:text-pink-500 hover:border-pink-500 transition-all pb-2 px-2 border-zinc-400 text-zinc-400 border-b"
                                href="#"
                            >
                                Связь
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-md hover:text-pink-500 hover:border-pink-500 transition-all pb-2 px-2 border-zinc-400 text-zinc-400 border-b"
                                href="#"
                            >
                                О проекте
                            </a>
                        </li>
                        <li>
                            <button onClick={toggleTheme} className="bg-pink-50 dark:bg-zinc-500 dark:hover:bg-pink-500 p-1 rounded-md hover:bg-pink-200 hover:scale-105 active:scale-95 transition-all">
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