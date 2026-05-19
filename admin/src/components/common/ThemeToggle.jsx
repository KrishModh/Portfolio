import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme" type="button">
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">{isLight ? <Sun size={15} /> : <Moon size={15} />}</span>
      </span>
    </button>
  );
}
