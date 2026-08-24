(function () {
  "use strict";

  var root = document.querySelector(".research-topics");

  if (!root) return;

  var toggles = Array.from(
    root.querySelectorAll(".publication-card__abstract-toggle")
  );

  function getPanel(toggle) {
    return document.getElementById(toggle.getAttribute("aria-controls"));
  }

  function setExpanded(toggle, panel, expanded) {
    toggle.classList.toggle("collapsed", !expanded);
    toggle.setAttribute("aria-expanded", String(expanded));
    panel.classList.toggle("show", expanded);
    panel.hidden = !expanded;
    panel.setAttribute("aria-hidden", String(!expanded));
  }

  function closeAllAbstracts() {
    toggles.forEach(function (toggle) {
      var panel = getPanel(toggle);

      if (panel) setExpanded(toggle, panel, false);
    });
  }

  root.addEventListener("click", function (event) {
    var toggle = event.target.closest(".publication-card__abstract-toggle");

    if (!toggle || !root.contains(toggle)) return;

    var panel = getPanel(toggle);

    if (!panel) return;

    var shouldOpen = !panel.classList.contains("show");

    closeAllAbstracts();

    if (shouldOpen) setExpanded(toggle, panel, true);
  });

  root.addEventListener("hide.bs.collapse", function (event) {
    if (event.target.id.indexOf("collapse-research-") === 0) {
      closeAllAbstracts();
    }
  });

  closeAllAbstracts();
}());
