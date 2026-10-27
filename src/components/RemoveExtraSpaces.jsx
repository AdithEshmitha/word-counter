
import { useMemo, useState } from "react";
import { Copy, RotateCcw, Check, Sparkles } from "lucide-react";

export default function RemoveExtraSpaces() {
    const [text, setText] = useState("");
    const [removeLineBreaks, setRemoveLineBreaks] = useState(false);
    const [copied, setCopied] = useState(false);

    const cleanedText = useMemo(() => {
        let result = text
            .replace(/[^\S\n]+/gu, " ")
            .split("\n")
            .map((line) => line.trim())
            .join("\n");

        if (removeLineBreaks) {
            result = result.replace(/\s+/gu, " ").trim();
        } else {
            result = result.replace(/\n{3,}/gu, "\n\n").trim();
        }

        return result;
    }, [text, removeLineBreaks]);

    const removedCharacters = text.length - cleanedText.length;

    async function copyText() {
        if (!cleanedText) return;

        try {
            await navigator.clipboard.writeText(cleanedText);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    }

    function clearText() {
        setText("");
        setCopied(false);
    }

    function useCleanedText() {
        setText(cleanedText);
        setCopied(false);
    }

    return (
        <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
            <header className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#111827]/60">
                    Free Online Text Tool
                </p>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Remove Extra Spaces from Text
                </h1>

                <p className="mt-5 text-base leading-7 text-[#111827]/70 sm:text-lg">
                    Clean up unwanted spaces, tabs, and extra blank lines in seconds.
                    Paste your text and get a cleaner version instantly with this free
                    online whitespace remover.
                </p>
            </header>

            <section
                aria-label="Remove extra spaces tool"
                className="rounded-2xl border border-[#111827]/10 bg-white p-4 shadow-sm sm:p-6"
            >
                <label
                    htmlFor="spaces-input"
                    className="mb-3 block text-sm font-semibold"
                >
                    Enter or paste your text
                </label>

                <textarea
                    id="spaces-input"
                    value={text}
                    onChange={(event) => {
                        setText(event.target.value);
                        setCopied(false);
                    }}
                    placeholder={"Paste your text here...\n\nExample:   Remove    extra    spaces."}
                    className="min-h-56 w-full resize-y rounded-xl border border-[#111827]/15 bg-white p-4 text-base leading-7 outline-none transition placeholder:text-[#111827]/40 focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
                    spellCheck="false"
                />

                <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-[#111827]/10 p-3">
                    <input
                        type="checkbox"
                        checked={removeLineBreaks}
                        onChange={(event) => {
                            setRemoveLineBreaks(event.target.checked);
                            setCopied(false);
                        }}
                        className="mt-1 h-4 w-4 accent-[#111827]"
                    />

                    <span>
                        <span className="block text-sm font-semibold">
                            Remove all line breaks
                        </span>
                        <span className="mt-1 block text-sm leading-5 text-[#111827]/60">
                            Combine the text into one paragraph and replace whitespace with
                            single spaces.
                        </span>
                    </span>
                </label>

                <div className="mt-4 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={clearText}
                        disabled={!text}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#111827]/15 px-4 py-2.5 text-sm font-medium transition hover:bg-[#111827]/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <RotateCcw size={16} />
                        Clear
                    </button>

                    <button
                        type="button"
                        onClick={useCleanedText}
                        disabled={!text || text === cleanedText}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#111827]/15 px-4 py-2.5 text-sm font-medium transition hover:bg-[#111827]/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Sparkles size={16} />
                        Update input
                    </button>

                    <button
                        type="button"
                        onClick={copyText}
                        disabled={!cleanedText}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#111827] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#111827]/85 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "Copied" : "Copy cleaned text"}
                    </button>
                </div>
            </section>

            <section
                aria-label="Cleaned text result"
                className="mt-6 rounded-2xl border border-[#111827]/10 bg-white p-4 sm:p-6"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-bold">Cleaned Text</h2>

                    <p className="text-sm text-[#111827]/60">
                        {cleanedText.length.toLocaleString()} characters
                    </p>
                </div>

                <div
                    aria-live="polite"
                    className="mt-4 min-h-32 whitespace-pre-wrap wrap-break-words rounded-xl bg-[#111827]/3 p-4 text-base leading-7"
                >
                    {cleanedText || (
                        <span className="text-[#111827]/40">
                            Your cleaned text will appear here...
                        </span>
                    )}
                </div>

                <p className="mt-3 text-sm text-[#111827]/60">
                    {text
                        ? `${Math.max(0, removedCharacters).toLocaleString()} characters removed`
                        : "Enter text above to get started."}
                </p>
            </section>

            <div className="mt-12 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold tracking-tight">
                        What Does Remove Extra Spaces Do?
                    </h2>

                    <p className="mt-4 leading-7 text-[#111827]/75">
                        The Remove Extra Spaces tool cleans up unwanted whitespace in text.
                        It reduces repeated spaces, removes spaces at the beginning and end
                        of lines, and helps eliminate excessive blank lines. This is useful
                        when preparing documents, emails, articles, social media posts, and
                        text copied from websites or other applications.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold tracking-tight">
                        How to Remove Extra Spaces from Text
                    </h2>

                    <ol className="mt-4 list-inside list-decimal space-y-3 leading-7 text-[#111827]/75">
                        <li>Paste your original text into the input box.</li>
                        <li>Review the cleaned text shown below.</li>
                        <li>Enable the line-break option if you want one continuous paragraph.</li>
                        <li>Copy the cleaned result or update the input with it.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Why Clean Extra Whitespace?
                    </h2>

                    <p className="mt-4 leading-7 text-[#111827]/75">
                        Unwanted whitespace can make text harder to read, create inconsistent
                        formatting, and cause problems when preparing text for forms, data
                        processing, or publishing. Cleaning whitespace makes text more
                        consistent. However, review the output before using it in code,
                        poetry, tables, or documents where spacing and line breaks matter.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Frequently Asked Questions
                    </h2>

                    <div className="mt-5 divide-y divide-[#111827]/10">
                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                How do I remove extra spaces from text?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                Paste your text into the tool. It automatically reduces repeated
                                horizontal whitespace, trims line edges, and removes excessive
                                blank lines.
                            </p>
                        </details>

                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                Does this tool remove all spaces?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                No. It preserves single spaces between words. It removes
                                unnecessary repeated spaces and trims unwanted whitespace.
                            </p>
                        </details>

                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                Can I remove line breaks too?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                Yes. Enable the Remove all line breaks option to combine the
                                text into one paragraph.
                            </p>
                        </details>

                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                Is this whitespace remover free?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                Yes. You can use this tool for free without creating an account.
                            </p>
                        </details>

                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                Is my text uploaded to a server?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                This component processes text in your browser and does not send
                                it to a Wordix backend for cleaning. Avoid entering sensitive
                                information into online tools unless you are comfortable with
                                their privacy practices.
                            </p>
                        </details>
                    </div>
                </section>

                <nav
                    aria-label="Related text tools"
                    className="border-t border-[#111827]/10 pt-7"
                >
                    <h2 className="text-xl font-bold">Explore More Text Tools</h2>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <a
                            href="/"
                            className="rounded-lg border border-[#111827]/15 px-4 py-2.5 text-sm font-medium transition hover:bg-[#111827]/5"
                        >
                            Word Counter
                        </a>

                        <a
                            href="/case-converter/"
                            className="rounded-lg border border-[#111827]/15 px-4 py-2.5 text-sm font-medium transition hover:bg-[#111827]/5"
                        >
                            Case Converter
                        </a>

                        <a
                            href="/character-counter/"
                            className="rounded-lg border border-[#111827]/15 px-4 py-2.5 text-sm font-medium transition hover:bg-[#111827]/5"
                        >
                            Character Counter
                        </a>

                        <a
                            href="/slug-generator/"
                            className="rounded-lg border border-[#111827]/15 px-4 py-2.5 text-sm font-medium transition hover:bg-[#111827]/5"
                        >
                            Slug Generator
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
}
