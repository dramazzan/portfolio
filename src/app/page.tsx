import SkillsComponent from "@/components/SkillsComponent";
import GitReposComponent from "@/components/GitReposComponent";

export default function Home() {
  return (
    <div>
      <section>
        <SkillsComponent />
      </section>
      <section>
        <GitReposComponent />
      </section>
    </div>
  );
}
