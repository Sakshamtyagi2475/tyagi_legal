import Link from "next/link";
import { Scale } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Scale className="h-7 w-7 text-primary" />
      <span className="font-headline text-xl font-bold">
        Tyagi Legal
      </span>
    </Link>
  );
}
