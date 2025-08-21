import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function FloatingCTA() {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 z-50 h-14 rounded-full px-6 shadow-lg animate-bounce"
    >
      <Link href="/contact">
        <Phone className="mr-2 h-5 w-5" />
        Book Consultation
      </Link>
    </Button>
  );
}
