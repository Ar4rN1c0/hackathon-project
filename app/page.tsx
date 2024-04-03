"use client"
import { useEffect, useState } from "react";
import { useTheme } from "./context/themeContext";

export default function Home() {
  const { setTheme, background, theme } = useTheme()
  const [countflag, setflag] = useState<boolean>()
  useEffect(() => {
    setflag(true)
    setTimeout(() => {
      setflag(true)
      console.log(background)
    }, 50)
  },[theme])
  return (
    <main className={background + " w-full min-h-[85vh]"}>
      {countflag}
    </main>
  );
}