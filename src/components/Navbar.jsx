import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { name: "Home", href: "/" },
        { name: "Tools", href: "/#tools" },
        { name: "About", href: "/#about" },
        { name: "FAQ", href: "/#faq" },
    ];

    return (
        <header className="relative w-full flex justify-between items-center py-4 px-5 md:px-10 lg:px-15 xl:px-25 border-b border-gray-100">
            <a className="text-2xl md:text-3xl font-semibold text-[#111827]" href="/">Wordix.</a>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-20">
                {
                    links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`relative py-2 text-[17px] tracking-wide`}
                        >
                            {link.name}
                        </a>
                    ))
                }
            </div>

            {/* Mobile */}
            {
                menuOpen && (
                    <div className="absolute left-1/2 top-20 z-50 w-[95%] -translate-x-1/2 rounded-xl border border-gray-50 bg-white p-5 shadow-md md:hidden">

                        <nav className="flex flex-col gap-2">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center justify-between rounded px-4 py-3 text-[#111827] tracking-wide transition-all duration-200 hover:bg-indigo-50 hover:text-[#111827]"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>

                    </div>
                )
            }

            {/* Menu */}
            <Menu onClick={() => { setMenuOpen(!menuOpen); }} className="text-xl text-[#111827] cursor-pointer md:hidden" />
        </header>
    );
}
