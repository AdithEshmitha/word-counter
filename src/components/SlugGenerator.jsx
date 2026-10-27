import { useState } from "react";
import { Copy, RotateCcw, ArrowRight } from "lucide-react";

export default function SlugGenerator() {
    const [text, setText] = useState("");
    const [separator, setSeparator] = useState("-");
    const [lowercase, setLowercase] = useState(true);
    const [removeNumbers, setRemoveNumbers] = useState(false);
    const [copied, setCopied] = useState(false);

    function generateSlug(value) {
        let slug = value.trim();

        // Normalize accented characters
        slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Convert to lowercase if enabled
        if (lowercase) {
            slug = slug.toLowerCase();
        }

        // Remove numbers if selected
        if (removeNumbers) {
            slug = slug.replace(/[0-9]/g, "");
        }

        // Replace spaces and underscores with the selected separator
        slug = slug.replace(/[\s_]+/g, separator);

        // Keep letters, numbers, and the selected separator
        const escapedSeparator = separator === "-" ? "\\-" : "_";
        const allowedCharacters = new RegExp(
            `[^\\p{L}\\p{N}${escapedSeparator}]`,
            "gu"
        );

        slug = slug.replace(allowedCharacters, "");

        // Remove repeated separators
        const repeatedSeparator = new RegExp(
            `${escapedSeparator}{2,}`,
            "g"
        );

        slug = slug.replace(repeatedSeparator, separator);

        // Remove separators at the beginning and end
        const edgeSeparators = new RegExp(
            `^${escapedSeparator}+|${escapedSeparator}+$`,
            "g"
        );

        return slug.replace(edgeSeparators, "");
    }

    const slug = generateSlug(text);

    async function copySlug() {
        if (!slug) return;

        try {
            await navigator.clipboard.writeText(slug);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch {
            alert("Copy failed. Please copy the slug manually.");
        }
    }

    function clearText() {
        setText("");
        setCopied(false);
    }

    return (
        <section className="w-full bg-white text-[#111827]">
            <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#111827]/55">
                        Free online tool
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                        Slug Generator
                    </h1>

                    <p className="mt-5 leading-7 text-[#111827]/70">
                        Create clean, readable, URL-friendly slugs for blog posts,
                        website pages, and articles in seconds.
                    </p>
                </div>

                <div className="mt-10 rounded-2xl border border-[#111827]/15 bg-white p-5 sm:p-8">
                    <label
                        htmlFor="slug-input"
                        className="mb-3 block text-sm font-semibold"
                    >
                        Enter your title or text
                    </label>

                    <textarea
                        id="slug-input"
                        value={text}
                        onChange={(event) => {
                            setText(event.target.value);
                            setCopied(false);
                        }}
                        rows={4}
                        placeholder="Example: My First Blog Post!"
                        className="w-full resize-y rounded-xl border border-[#111827]/20 bg-white p-4 text-base leading-7 text-[#111827] outline-none transition-colors placeholder:text-[#111827]/35 focus:border-[#111827]"
                    />

                    <div className="mt-6">
                        <p className="mb-3 text-sm font-semibold">Slug separator</p>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setSeparator("-");
                                    setCopied(false);
                                }}
                                aria-pressed={separator === "-"}
                                className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${separator === "-"
                                    ? "border-[#111827] bg-[#111827] text-white"
                                    : "border-[#111827]/20 bg-white text-[#111827] hover:border-[#111827]"
                                    }`}
                            >
                                Hyphen (-)
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setSeparator("_");
                                    setCopied(false);
                                }}
                                aria-pressed={separator === "_"}
                                className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${separator === "_"
                                    ? "border-[#111827] bg-[#111827] text-white"
                                    : "border-[#111827]/20 bg-white text-[#111827] hover:border-[#111827]"
                                    }`}
                            >
                                Underscore (_)
                            </button>
                        </div>
                    </div>

                    <div className="mt-5 space-y-4">
                        <label className="flex cursor-pointer items-center gap-3 text-sm">
                            <input
                                type="checkbox"
                                checked={lowercase}
                                onChange={(event) => {
                                    setLowercase(event.target.checked);
                                    setCopied(false);
                                }}
                                className="h-4 w-4 accent-[#111827]"
                            />
                            Convert to lowercase
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 text-sm">
                            <input
                                type="checkbox"
                                checked={removeNumbers}
                                onChange={(event) => {
                                    setRemoveNumbers(event.target.checked);
                                    setCopied(false);
                                }}
                                className="h-4 w-4 accent-[#111827]"
                            />
                            Remove numbers
                        </label>
                    </div>

                    <div className="mt-8 border-t border-[#111827]/10 pt-6">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            Generated slug
                            <ArrowRight size={16} aria-hidden="true" />
                        </div>

                        <div
                            aria-live="polite"
                            className="mt-3 min-h-14 break-all rounded-xl border border-[#111827]/15 bg-[#111827]/3 p-4 text-sm leading-6"
                        >
                            {slug || (
                                <span className="text-[#111827]/40">
                                    Your generated slug will appear here.
                                </span>
                            )}
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={copySlug}
                                disabled={!slug}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Copy size={16} aria-hidden="true" />
                                {copied ? "Copied" : "Copy slug"}
                            </button>

                            <button
                                type="button"
                                onClick={clearText}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#111827]/20 bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition-colors hover:border-[#111827]"
                            >
                                <RotateCcw size={16} aria-hidden="true" />
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold tracking-tight">
                        What is a URL slug?
                    </h2>

                    <p className="mt-4 leading-7 text-[#111827]/70">
                        A URL slug is the readable part of a web address that identifies
                        a particular page. For example, the title "My First Blog Post!"
                        can become the slug "my-first-blog-post". Slugs help create
                        clear, easy-to-read URLs.
                    </p>

                    <h2 className="mt-8 text-2xl font-bold tracking-tight">
                        How to use this tool
                    </h2>

                    <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-[#111827]/70">
                        <li>Enter a page title, blog post title, or other text.</li>
                        <li>Choose a hyphen or underscore as the separator.</li>
                        <li>Adjust the lowercase and number options if needed.</li>
                        <li>Copy the generated slug and use it in your website URL.</li>
                    </ol>

                    <h2 className="mt-8 text-2xl font-bold tracking-tight">
                        Example
                    </h2>

                    <div className="mt-4 overflow-hidden rounded-xl border border-[#111827]/15">
                        <div className="grid grid-cols-2 border-b border-[#111827]/15 bg-[#111827]/3">
                            <div className="p-4 text-sm font-semibold">Original title</div>
                            <div className="p-4 text-sm font-semibold">Generated slug</div>
                        </div>

                        <div className="grid grid-cols-2 border-b border-[#111827]/10">
                            <div className="wrap-break-words p-4 text-sm">
                                My First Blog Post!
                            </div>
                            <div className="break-all p-4 text-sm">
                                my-first-blog-post
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="wrap-break-words p-4 text-sm">
                                Best Tips for Web Design 2026
                            </div>
                            <div className="break-all p-4 text-sm">
                                best-tips-for-web-design-2026
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}