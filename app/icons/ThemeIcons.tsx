import Image from "next/image";
import sun from "../../public/sun.svg"
import moon from "../../public/moonlight.svg"

export default function Icon ({name}: {name: string}) {
    return <Image className="w-[5vh]" src={name === "sun" ? sun : moon} alt="" width="30" height={30}/>
}