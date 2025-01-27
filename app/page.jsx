import SignInStatus from "@/components/shared/SignInStatus";
import TeamProject from "@/components/shared/TeamProject";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <SignInStatus />
      <TeamProject />
    </div>
  );
}
