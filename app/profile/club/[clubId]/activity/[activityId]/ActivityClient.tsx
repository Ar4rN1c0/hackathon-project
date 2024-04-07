"use client"

import { useTheme } from "@/app/context/themeContext"



export default function ActivityClient({ activityData }: { activityData: any }) {
    const { background, secondaryColor } = useTheme()
    return (
        <main className={background + "min-h-[85vh] w-full grid place-content-center"}>
            <section className={secondaryColor + " p-10 rounded-md"}>

                <h1 className="text-2xl  ">
                    {activityData.name} in club {activityData.clubName}
                </h1>
                <p>
                    {activityData.description}
                </p>
            </section>
        </main>
    )
}