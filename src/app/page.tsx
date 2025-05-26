import SkillsComponent from "@/components/SkillsComponent";
import GitReposComponent from "@/components/GitReposComponent";
import AnonMessageForm from "@/components/AnonMessageForm";
import VantaHero from "@/components/VantaHero";
import FeedbackSection from "@/components/feedbackComponents/FeedbackSection";
import AboutMeComponent from "@/components/AboutMeComponent";

export default function Home() {
    return (
        <div>
            <section className="flex items-center justify-center">
                <div>
                    <VantaHero effect="halo"/>
                </div>
            </section>
            <section>
                <AboutMeComponent/>
            </section>
            <section>
                <SkillsComponent/>
            </section>
            <section>
                <AnonMessageForm/>
            </section>
            <section>
                <GitReposComponent/>
            </section>
            <section>
                <FeedbackSection/>
            </section>
        </div>
    );
}
