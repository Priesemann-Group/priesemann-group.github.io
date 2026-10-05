const root = document.documentElement;
const control = document.querySelector("#theme-toggle a");
const icon = document.querySelector("#theme-icon");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const storedTheme = () => {
  try {
    return window.localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
};

const applyTheme = (theme) => {
  const useDarkTheme = theme === "dark" || (theme !== "light" && systemTheme.matches);
  root.toggleAttribute("data-theme", useDarkTheme);
  icon.textContent = useDarkTheme ? "☾" : "☀";
  control.setAttribute("aria-label", useDarkTheme ? "Use light theme" : "Use dark theme");
  control.setAttribute("aria-pressed", String(useDarkTheme));
};

control.addEventListener("click", () => {
  const nextTheme = root.hasAttribute("data-theme") ? "light" : "dark";

  try {
    window.localStorage.setItem("theme", nextTheme);
  } catch (error) {
    // The selected theme still applies for this page when storage is unavailable.
  }

  applyTheme(nextTheme);
});

systemTheme.addEventListener("change", () => {
  if (!storedTheme()) applyTheme(null);
});

applyTheme(storedTheme());
