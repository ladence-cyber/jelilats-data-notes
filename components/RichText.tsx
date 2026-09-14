import { PortableText } from "@portabletext/react";

type PortableTextValue = Parameters<typeof PortableText>[0]["value"];

export default function RichText({ value }: { value?: unknown[] }) {
  if (!value?.length) return null;

  return (
    <div className="prose">
      <PortableText value={value as PortableTextValue} />
    </div>
  );
}