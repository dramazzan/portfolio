import SkillsComponent from "@/components/SkillsComponent";
import GitReposComponent from "@/components/GitReposComponent";
import AnonMessageForm from "@/components/AnonMessageForm";
import VantaHero from "@/components/VantaHero";
import FeedbackSection from "@/components/feedbackComponents/FeedbackSection";
import AboutMeComponent from "@/components/AboutMeComponent";
import AnimatedInvertCircle from "@/components/AnimatedInvertCircle";

export default function Home() {
    return (
        <div className="bg-background-light dark:bg-background-dark">
            <section>
                <div>
                    <VantaHero effect="halo"/>
                </div>
            </section>
            <section>
                <AboutMeComponent/>
            </section>
            <section className="flex flex-wrap items-center justify-center gap-8 w-full max-w-[1200px] mx-auto p-4">
                <div className="flex flex-col items-start gap-4 p-4 rounded-2xl w-full md:w-[45%]">
                    <h2 className="font-bold text-3xl md:text-5xl w-full text-gray-800 dark:text-gray-300 border-b p-2">
                        My education
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-500">
                        I am a student at Narxoz University, I have completed my 3rd year. My specialty is digital
                        engineering. I studied different areas of programming and different programming languages
                        ​​under the university program. I would like to start with front-end development.
                    </p>
                </div>
                <div className="w-full md:w-[45%]">
                    <AnimatedInvertCircle text="NARXOZ"/>
                </div>
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
