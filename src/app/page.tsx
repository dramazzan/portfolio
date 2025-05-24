import SkillsComponent from "@/components/SkillsComponent";
import GitReposComponent from "@/components/GitReposComponent";
import AnonMessageForm from "@/components/AnonMessageForm";
import VantaHero from "@/components/VantaHero";
import React from "react";

export default function Home() {
    return (
        <div>
            <section>
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
        </div>
    );
}
