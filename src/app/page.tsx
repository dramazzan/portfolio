import SkillsComponent from "@/components/SkillsComponent";
import GitReposComponent from "@/components/GitReposComponent";
import AnonMessageForm from "@/components/AnonMessageForm";

export default function Home() {
  return (
    <div>
      <section>
        <SkillsComponent />
      </section>
       <section>
        <AnonMessageForm/>
      </section>
      <section>
        <GitReposComponent />
      </section>
     
    </div>
  );
}
