import SkillsComponent from "@/components/SkillsComponent";
import GitReposComponent from "@/components/GitReposComponent";
import AnonMessageForm from "@/components/AnonMessageForm";
import VantaHero from "@/components/VantaHero";
import React from "react";
import FeedbackSection from "@/components/feedbackComponents/FeedbackSection";

export default function Home() {
    return (
        <div>
            <section className="flex items-center justify-center">
                <div>
                    <VantaHero effect="halo"/>
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
