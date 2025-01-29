import ProjectsSection from "@/components/shared/ProjectsSection";
import SignInStatus from "@/components/shared/SignInStatus";
import TeamProject from "@/components/shared/TeamProject";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 py-8">
      <SignInStatus />
      <TeamProject />
      <ProjectsSection />
    </div>
  );
}
