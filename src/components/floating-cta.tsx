import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function FloatingCTA() {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 z-50 h-16 rounded-full px-6 shadow-2xl animate-bounce glass-button"
    >
      <Link href="/contact">
        <Phone className="mr-2 h-6 w-6" />
        <span className="text-lg">Book Consultation</span>
      </Link>
    </Button>
  );
}
