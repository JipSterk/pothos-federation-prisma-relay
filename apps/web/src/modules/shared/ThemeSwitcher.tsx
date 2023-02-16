"use client";

import { Button } from "@acme/ui";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { setTheme, themes } = useTheme();

  return (
    <>
      {themes.map((theme) => (
        <Button key={theme} onClick={() => setTheme(theme)}>
          {theme}
        </Button>
      ))}
    </>
  );
}
