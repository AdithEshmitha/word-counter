
import { useMemo, useState } from "react";
import { Copy, RotateCcw, Check } from "lucide-react";

export default function CharacterCounter() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const stats = useMemo(() => {
        const trimmed = text.trim();

        const words = trimmed
            ? trimmed.split(/\s+/u).filter(Boolean).length
            : 0;

        const sentences = trimmed
            ? (trimmed.match(/[.!?。！？]+(?=\s|$)|[^.!?。！？]+$/gu) || [])
                .filter((sentence) => sentence.trim().length > 0).length
            : 0;

        const paragraphs = trimmed
            ? trimmed.split(/\n\s*\n/u).filter((paragraph) => paragraph.trim()).length
            : 0;

        return {
            characters: text.length,
            charactersNoSpaces: text.replace(/\s/gu, "").length,
            words,
            sentences,
            paragraphs,
            lines: text ? text.split("\n").length : 0,
        };
    }, [text]);

    async function copyText() {
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
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

    const cards = [
        { label: "Characters", value: stats.characters },
        { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
        { label: "Words", value: stats.words },
        { label: "Sentences", value: stats.sentences },
        { label: "Paragraphs", value: stats.paragraphs },
        { label: "Lines", value: stats.lines },
    ];

    return (
        <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
            <header className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#111827]/60">
                    Free Online Text Tool
                </p>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Free Character Counter
                </h1>

                <p className="mt-5 text-base leading-7 text-[#111827]/70 sm:text-lg">
                    Count characters, words, sentences, paragraphs, and lines instantly.
                    Check character counts with or without spaces using this free online
                    character counter.
                </p>
            </header>

            <section
                aria-label="Character counter tool"
                className="rounded-2xl border border-[#111827]/10 bg-white p-4 shadow-sm sm:p-6"
            >
                <label
                    htmlFor="character-counter-input"
                    className="mb-3 block text-sm font-semibold"
                >
                    Enter or paste your text
                </label>

                <textarea
                    id="character-counter-input"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Start typing or paste your text here..."
                    className="min-h-64 w-full resize-y rounded-xl border border-[#111827]/15 bg-white p-4 text-base leading-7 outline-none transition placeholder:text-[#111827]/40 focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
                    spellCheck="false"
                />

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-[#111827]/60">
                        {stats.characters.toLocaleString()} characters entered
                    </p>

                    <div className="flex gap-2">
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
                            onClick={copyText}
                            disabled={!text}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#111827] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#111827]/85 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? "Copied" : "Copy text"}
                        </button>
                    </div>
                </div>
            </section>

            <section
                aria-label="Text statistics"
                className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="rounded-xl border border-[#111827]/10 bg-white p-4 sm:p-5"
                    >
                        <p className="text-sm leading-5 text-[#111827]/60">
                            {card.label}
                        </p>
                        <p className="mt-2 wrap-break-words text-2xl font-bold tabular-nums sm:text-3xl">
                            {card.value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </section>

            <div className="mt-12 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold tracking-tight">
                        What Is a Character Counter?
                    </h2>

                    <p className="mt-4 leading-7 text-[#111827]/75">
                        A character counter is an online tool that counts the characters
                        in a piece of text. It helps you check the length of social media
                        posts, essays, messages, website content, titles, and other writing.
                        Wordix updates your character count as you type or edit your text.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Characters With Spaces vs. Without Spaces
                    </h2>

                    <p className="mt-4 leading-7 text-[#111827]/75">
                        Character count with spaces includes letters, numbers, punctuation,
                        spaces, and line breaks. Character count without spaces excludes
                        whitespace, including spaces, tabs, and line breaks. Different
                        platforms and writing requirements may count characters differently,
                        so check the rules for your specific use case.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold tracking-tight">
                        How to Use the Character Counter
                    </h2>

                    <ol className="mt-4 list-inside list-decimal space-y-3 leading-7 text-[#111827]/75">
                        <li>Type your text into the text box or paste existing content.</li>
                        <li>Check the character count with and without spaces.</li>
                        <li>Review the word, sentence, paragraph, and line counts.</li>
                        <li>Copy your text or clear the box to start again.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Frequently Asked Questions
                    </h2>

                    <div className="mt-5 divide-y divide-[#111827]/10">
                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                How do I count characters online?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                Paste or type your text into the Wordix Character Counter.
                                The tool automatically displays the character count as you type.
                            </p>
                        </details>

                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                Are spaces included in the character count?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                Yes. The Characters statistic includes whitespace. The
                                Characters (no spaces) statistic excludes whitespace.
                            </p>
                        </details>

                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                Can I count words and paragraphs too?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                Yes. This tool also counts words, sentences, paragraphs, and
                                lines while you edit your text.
                            </p>
                        </details>

                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                Is this character counter free?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                Yes. You can use the Wordix Character Counter for free without
                                creating an account.
                            </p>
                        </details>

                        <details className="py-4">
                            <summary className="cursor-pointer font-semibold">
                                Is my text uploaded to a server?
                            </summary>
                            <p className="mt-3 leading-7 text-[#111827]/70">
                                The counting happens in your browser. This component does not
                                send your text to a Wordix backend for counting. Avoid entering
                                sensitive information into any online tool unless you are
                                comfortable with its privacy practices.
                            </p>
                        </details>
                    </div>
                </section>

                <nav aria-label="Related text tools" className="border-t border-[#111827]/10 pt-7">
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
