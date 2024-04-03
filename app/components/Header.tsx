"use client"

import { useTheme } from "../context/themeContext";
import ThemeButton from "./buttons/DarkmodeButton";
import MenuButton from "./buttons/MenuButton";
import Profile from "./Profile";
import SearchBar from "./buttons/SearchBar";
import Link from "next/link";


export default function Header() {
    const { background, theme } = useTheme()
    return (
        <header className={background + " border-2 flex justify-between p-4 sticky"}>
            <h1><Link href="/">Title</Link></h1>
            <menu className="flex justify-between align-middle gap-5">
                <SearchBar></SearchBar>
                <Profile></Profile>
                <MenuButton></MenuButton>
                <ThemeButton />
            </menu>
        </header>
    )
}