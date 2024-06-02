import logo from "../assets/logo-no-background.svg";

const Footer = () => {
    return (
        <footer className="bg-zinc-100 w-full">
            <div className="w-4/5 mx-auto flex justify-between py-8">

                <div className="flex items-center gap-3">
                    <img className="w-24 h-24" src={logo} alt="full logo" />
                    <span className="customFontFamily ml-2 select-none text-pink-500 text-3xl font-bold">Weather API</span>
                </div>

                <div className="flex gap-16">
                    <ul className="pr-8 border-zinc-200 border-r-2">
                        <li className="text-xl font-medium text-zinc-700 mb-3">Используемые технологии</li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">React JS</a>
                        </li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">Rechart</a>
                        </li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">Tailwind CSS</a>
                        </li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">React Router</a>
                        </li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">WebGL</a>
                        </li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">Vite</a>
                        </li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">Faticon</a>
                        </li>
                    </ul>

                    <ul>
                        <li className="text-xl font-medium text-zinc-700 mb-3">Я тут</li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">Telegram</a>
                        </li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">GitHub</a>
                        </li>
                        <li>
                            <a href="#" className="mb-1.5 text-zinc-500 text-lg hover:text-pink-500 transition-colors">Discord</a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="border-t-2 border-zinc-200 mx-4 px-8 py-2">
                <span className="text-zinc-500 font-thin">Made by sevchik-f8fe</span>
            </div>
        </footer>
    );
}

export default Footer;