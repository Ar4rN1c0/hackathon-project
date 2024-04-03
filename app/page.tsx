"use client"
import { useEffect, useState } from "react";
import { useTheme } from "./context/themeContext";

export default function Home() {
  const { setTheme, background, theme } = useTheme()

  return (
    <main className={background + " w-full min-h-[85vh]"}>
    </main>
  );
}