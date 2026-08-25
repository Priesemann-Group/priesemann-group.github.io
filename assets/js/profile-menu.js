const profileWrapper = document.querySelector(".author__urls-wrapper");

if (profileWrapper) {
  const profileButton = profileWrapper.querySelector("button");
  const profileMenu = profileWrapper.querySelector(".author__urls");
  const mobileProfile = window.matchMedia("(max-width: 924px)");

  const alignProfileArrow = () => {
    const buttonBounds = profileButton.getBoundingClientRect();
    const menuBounds = profileMenu.getBoundingClientRect();
    const arrowLeft = buttonBounds.left + buttonBounds.width / 2 - menuBounds.left;

    profileMenu.style.setProperty("--profile-arrow-left", `${arrowLeft}px`);
  };

  const setProfileMenuOpen = (open) => {
    profileWrapper.classList.toggle("is-open", open);
    profileButton.classList.toggle("open", open);
    profileButton.setAttribute("aria-expanded", String(open));

    if (open) {
      alignProfileArrow();
    }
  };

  profileButton.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (mobileProfile.matches) {
        setProfileMenuOpen(!profileWrapper.classList.contains("is-open"));
      }
    },
    { capture: true },
  );

  document.addEventListener("click", (event) => {
    if (!profileWrapper.contains(event.target)) {
      setProfileMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && profileWrapper.classList.contains("is-open")) {
      setProfileMenuOpen(false);
      profileButton.focus();
    }
  });

  mobileProfile.addEventListener("change", () => setProfileMenuOpen(false));
  window.addEventListener("resize", () => {
    if (profileWrapper.classList.contains("is-open")) {
      alignProfileArrow();
    }
  });

  profileMenu.addEventListener("click", () => setProfileMenuOpen(false));
}
