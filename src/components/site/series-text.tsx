import { Fragment } from "react";
import { Link } from "@tanstack/react-router";

const SPLIT =
  /(неперфорированн[а-яё]*|перфорированн[а-яё]*|проволочн[а-яё]*|лестничн[а-яё]*|страт-профил[а-яё]*|крышк[а-яё]*|метиз[а-яё]*|крепёж[а-яё]*|крепеж[а-яё]*|глух[а-яё]*)/gi;

function seriesOf(word: string) {
  const value = word.toLowerCase();
  if (value.startsWith("неперфорированн")) return "solid" as const;
  if (value.startsWith("перфорированн")) return "perforated" as const;
  if (value.startsWith("проволочн")) return "wire" as const;
  if (value.startsWith("лестничн")) return "ladder" as const;
  if (value.startsWith("страт-профил")) return "strut" as const;
  if (value.startsWith("крышк")) return "cover" as const;
  if (value.startsWith("метиз")) return "fastener" as const;
  if (value.startsWith("крепёж") || value.startsWith("крепеж")) return "fastener" as const;
  if (value.startsWith("глух")) return "solid" as const;
  return null;
}

export function SeriesText({
  text,
  skip,
  className = "underline decoration-current/40 underline-offset-2 hover:decoration-current",
}: {
  text: string;
  skip?: "perforated" | "ladder" | "solid" | "wire" | "cover" | "strut" | "fastener";
  className?: string;
}) {
  const parts = text.split(SPLIT);
  return (
    <>
      {parts.map((part, index) => {
        const series = seriesOf(part);
        if (!series || series === skip) return <Fragment key={index}>{part}</Fragment>;
        return (
          <Link key={index} to="/catalog/$series" params={{ series }} className={className}>
            {part}
          </Link>
        );
      })}
    </>
  );
}
