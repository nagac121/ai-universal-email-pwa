import { redirect } from "next/navigation";

export default function RootPage() {
  // Directly forward incoming requests to the mail client dashboard
  redirect("/inbox");
}
