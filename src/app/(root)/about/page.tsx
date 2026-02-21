import OurCulture from "@/components/About/OurCulture";
import OurJourney from "@/components/About/OurJourney";
import VisionAndMission from "@/components/About/VisionAndMission";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "About Us"
}

export default function About() {
    return (
        <main className="flex flex-col w-full justify-center min-h-screen bg-white">
            <section>
                <VisionAndMission />
            </section>
            <section>
                <OurCulture />
            </section>
            <section>
                <OurJourney />
            </section>
        </main>
    )
}