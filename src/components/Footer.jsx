
const toolLinks = [
    { label: "Word Counter", href: "/" },
    { label: "Character Counter", href: "/character-counter/" },
    { label: "Case Converter", href: "/case-converter/" },
    { label: "Remove Extra Spaces", href: "/remove-extra-spaces/" },
    { label: "Slug Generator", href: "/slug-generator/" },
];

const companyLinks = [
    { label: "About Wordix", href: "/#about" },
    { label: "Frequently Asked Questions", href: "/#faq" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const linkClass =
        "text-sm text-[#111827]/65 transition hover:text-[#111827]";

    return (
        <footer className="border-t border-[#111827]/10 bg-white text-[#111827]">
            <div className="mx-auto max-w-6xl px-5 py-12 sm:py-14">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <a
                            href="/"
                            aria-label="Wordix home"
                            className="inline-block text-2xl font-bold tracking-tight"
                        >
                            Wordix<span className="text-[#111827]/40">.</span>
                        </a>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-[#111827]/65">
                            Simple, free online text tools to help you write, edit, and
                            format text with ease.
                        </p>
                    </div>

                    <nav aria-label="Text tools">
                        <h2 className="text-sm font-semibold">Text Tools</h2>

                        <ul className="mt-4 space-y-3">
                            {toolLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className={linkClass}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Wordix information">
                        <h2 className="text-sm font-semibold">Wordix</h2>

                        <ul className="mt-4 space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className={linkClass}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-[#111827]/10 pt-6 text-sm text-[#111827]/55 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {currentYear} Wordix. All rights reserved.
                    </p>

                    <p>Free tools. Simple solutions.</p>
                </div>
            </div>
        </footer>
    );
}
