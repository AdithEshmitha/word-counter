
import { useMemo, useState } from "react";
import { Copy, RotateCcw, ArrowDownUp } from "lucide-react";

const CASE_OPTIONS = [
    { value: "upper", label: "UPPERCASE", example: "HELLO WORLD" },
    { value: "lower", label: "lowercase", example: "hello world" },
    { value: "title", label: "Title Case", example: "Hello World" },
    { value: "sentence", label: "Sentence case", example: "Hello world" },
    { value: "toggle", label: "tOGGLE cASE", example: "hELLO wORLD" },
];

function toTitleCase(text) {
    return text.toLocaleLowerCase().replace(
        /(^|[\s\-–—/([{])([\p{L}\p{N}])/gu,
        (_, separator, character) =>
            separator + character.toLocaleUpperCase()
    );
}

function toSentenceCase(text) {
    let startOfSentence = true;

    return text
        .toLocaleLowerCase()
        .split("")
        .map((character, index, characters) => {
            if (startOfSentence && /[\p{L}\p{N}]/u.test(character)) {
                startOfSentence = false;
                return character.toLocaleUpperCase();
            }

            if (/[.!?。！？]/u.test(character)) {
                const remaining = characters.slice(index + 1).join("");
                if (/^\s/u.test(remaining) || remaining.length === 0) {
                    startOfSentence = true;
                }
            }

            return character;
        })
        .join("");
}

function convertCase(text, type) {
    switch (type) {
        case "upper":
            return text.toLocaleUpperCase();
        case "lower":
            return text.toLocaleLowerCase();
        case "title":
            return toTitleCase(text);
        case "sentence":
            return toSentenceCase(text);
        case "toggle":
            return Array.from(text)
                .map((character) => {
                    const upper = character.toLocaleUpperCase();
                    const lower = character.toLocaleLowerCase();

                    if (character === upper && character !== lower) return lower;
                    if (character === lower && character !== upper) return upper;

                    return character;
                })
                .join("");
        default:
            return text;
    }
}

export default function CaseConverter() {
    const [input, setInput] = useState("");
    const [caseType, setCaseType] = useState("upper");
    const [copyStatus, setCopyStatus] = useState("");

    const output = useMemo(
        () => convertCase(input, caseType),
        [input, caseType]
    );

    async function copyOutput() {
        if (!output) {
            setCopyStatus("Nothing to copy");
            return;
        }

        try {
            await navigator.clipboard.writeText(output);
            setCopyStatus("Copied!");
        } catch {
            setCopyStatus("Copy failed. Select and copy the text manually.");
        }
    }

    function clearText() {
        setInput("");
        setCopyStatus("");
    }

    return (
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24">
            <header className="mx-auto mb-10 max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#111827]/60">
                    Free online text tool
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                    Free Online Case Converter
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#111827]/70 sm:text-lg">
                    Change text to uppercase, lowercase, Title Case, sentence case, or
                    toggle case in seconds. Paste your text and copy the converted result
                    for free.
                </p>
            </header>

            <section
                aria-label="Text case converter"
                className="rounded-2xl border border-[#111827]/15 bg-white p-4 sm:p-6"
            >
                <label htmlFor="case-input" className="mb-3 block text-sm font-semibold">
                    Enter your text
                </label>

                <textarea
                    id="case-input"
                    value={input}
                    onChange={(event) => {
                        setInput(event.target.value);
                        setCopyStatus("");
                    }}
                    placeholder="Type or paste your text here..."
                    rows={8}
                    className="w-full resize-y rounded-xl border border-[#111827]/20 bg-white p-4 text-base leading-7 text-[#111827] outline-none placeholder:text-[#111827]/40 focus:border-[#111827]"
                />

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-[#111827]/60">
                    <span>{input.length.toLocaleString()} characters</span>
                    <span>{input.trim() ? input.trim().split(/\s+/u).length : 0} words</span>
                </div>

                <div className="mt-6">
                    <p className="mb-3 text-sm font-semibold">Choose a text format</p>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                        {CASE_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    setCaseType(option.value);
                                    setCopyStatus("");
                                }}
                                aria-pressed={caseType === option.value}
                                className={`rounded-lg border px-3 py-3 text-sm font-semibold transition-colors ${caseType === option.value
                                    ? "border-[#111827] bg-[#111827] text-white"
                                    : "border-[#111827]/20 bg-white text-[#111827] hover:border-[#111827]"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <label htmlFor="case-output" className="text-sm font-semibold">
                            Converted text
                        </label>
                        <span className="text-sm text-[#111827]/60">
                            {output.length.toLocaleString()} characters
                        </span>
                    </div>

                    <textarea
                        id="case-output"
                        value={output}
                        readOnly
                        rows={8}
                        placeholder="Your converted text will appear here..."
                        className="w-full resize-y rounded-xl border border-[#111827]/15 bg-[#111827]/2 p-4 text-base leading-7 text-[#111827] outline-none"
                    />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={clearText}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#111827]/20 px-5 py-3 text-sm font-semibold text-[#111827] transition-colors hover:border-[#111827]"
                    >
                        <RotateCcw size={16} aria-hidden="true" />
                        Clear text
                    </button>

                    <button
                        type="button"
                        onClick={copyOutput}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                    >
                        <Copy size={16} aria-hidden="true" />
                        Copy converted text
                    </button>
                </div>

                <p className="mt-3 min-h-5 text-sm text-[#111827]/70" role="status" aria-live="polite">
                    {copyStatus}
                </p>
            </section>

            <section className="mt-20">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    What Is a Case Converter?
                </h2>
                <p className="mt-4 leading-8 text-[#111827]/75">
                    A case converter is an online tool that changes the capitalization
                    of text without requiring you to retype it. It can help you format
                    headings, edit documents, prepare social media posts, and clean up
                    text for websites. Paste your content, choose a case style, and copy
                    the result.
                </p>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Available Text Case Formats
                </h2>

                <div className="mt-6 divide-y divide-[#111827]/10 border-y border-[#111827]/10">
                    {[
                        ["Uppercase", "Converts every letter to capital letters.", "HELLO WORLD"],
                        ["Lowercase", "Converts letters to small letters.", "hello world"],
                        ["Title Case", "Capitalizes the first letter of words.", "Hello World"],
                        ["Sentence case", "Capitalizes the first letter of a sentence.", "Hello world"],
                        ["Toggle Case", "Switches lowercase letters to uppercase and uppercase letters to lowercase.", "hELLO wORLD"],
                    ].map(([name, description, example]) => (
                        <div key={name} className="grid gap-2 py-5 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                            <div>
                                <h3 className="font-semibold">{name}</h3>
                                <p className="mt-1 text-sm leading-6 text-[#111827]/70">{description}</p>
                            </div>
                            <p className="self-center wrap-break-words rounded-lg border border-[#111827]/10 px-4 py-3 text-sm font-medium">
                                {example}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    How to Use This Case Converter
                </h2>
                <ol className="mt-5 list-inside list-decimal space-y-3 leading-7 text-[#111827]/75">
                    <li>Type or paste your text into the input box.</li>
                    <li>Select uppercase, lowercase, Title Case, sentence case, or Toggle Case.</li>
                    <li>Review the converted text in the output box.</li>
                    <li>Click Copy converted text to copy your result.</li>
                </ol>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Frequently Asked Questions
                </h2>

                <div className="mt-6 divide-y divide-[#111827]/15 border-y border-[#111827]/15">
                    <details className="group py-5">
                        <summary className="cursor-pointer font-semibold">
                            Is this case converter free?
                        </summary>
                        <p className="mt-3 leading-7 text-[#111827]/70">
                            Yes. You can use the text case conversion features on this page
                            for free without creating an account.
                        </p>
                    </details>

                    <details className="group py-5">
                        <summary className="cursor-pointer font-semibold">
                            What is the difference between uppercase and lowercase?
                        </summary>
                        <p className="mt-3 leading-7 text-[#111827]/70">
                            Uppercase uses capital letters, such as HELLO. Lowercase uses
                            small letters, such as hello.
                        </p>
                    </details>

                    <details className="group py-5">
                        <summary className="cursor-pointer font-semibold">
                            What does Title Case do?
                        </summary>
                        <p className="mt-3 leading-7 text-[#111827]/70">
                            Title Case capitalizes the first letter of words. This tool uses
                            a simple word-based rule, so you may need to adjust short words
                            to match a particular style guide.
                        </p>
                    </details>

                    <details className="group py-5">
                        <summary className="cursor-pointer font-semibold">
                            Is my text uploaded to a server?
                        </summary>
                        <p className="mt-3 leading-7 text-[#111827]/70">
                            This converter processes text in your browser and does not send
                            it to a Wordix server for conversion.
                        </p>
                    </details>
                </div>
            </section>

            <nav aria-label="Related text tools" className="mt-14 rounded-2xl border border-[#111827]/15 p-6 sm:p-8">
                <h2 className="text-xl font-bold">Explore More Free Text Tools</h2>
                <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold">
                    <a href="/" className="underline underline-offset-4 hover:opacity-70">
                        Word Counter
                    </a>
                    <a href="/slug-generator/" className="underline underline-offset-4 hover:opacity-70">
                        Slug Generator
                    </a>
                    <a href="/character-counter/" className="underline underline-offset-4 hover:opacity-70">
                        Character Counter
                    </a>
                    <a href="/remove-extra-spaces/" className="underline underline-offset-4 hover:opacity-70">
                        Remove Extra Spaces
                    </a>
                </div>
            </nav>
        </div>
    );
}
