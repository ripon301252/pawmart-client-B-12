import useTheme from "./useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      {/* Label */}
      <span className="mr-2 text-gray-700 dark:text-gray-200">
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </span>

      {/* Toggle Switch */}
      <input
        type="checkbox"
        className="toggle toggle-md toggle-primary"
        checked={theme === "dark"}
        onChange={(e) => toggleTheme(e.target.checked)}
      />
    </div>
  );
}
