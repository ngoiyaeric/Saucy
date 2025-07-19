import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  showLabel?: boolean;
};

export function ThemeToggle({ showLabel = true }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full gap-3 font-normal",
        showLabel ? "justify-start" : "justify-center p-3"
      )}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      {showLabel && (
        <span className="truncate">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </Button>
  );
}