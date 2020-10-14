function findClosestSection(sections) {
  if (sections.length === 0) return null;

  let idx = 0;
  let closest = sections[0];
  let curentPos = getCurrentOffsetTop();
  let difference = Math.abs(curentPos - closest.offsetTop * 1.05);

  sections.forEach((s, i) => {
    const check = Math.abs(s.offsetTop * 1.05 - curentPos);
    if (check < difference) {
      difference = check;
      closest = s;
      idx = i;
    }
  });

  return [idx, closest];
}

function getCurrentOffsetTop() {
  return (
    (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0
  );
}

document.addEventListener("DOMContentLoaded", function (event) {
  const dotNav = document.querySelector(".dot-nav");
  const sections = document.querySelectorAll("header, section");

  function setActiveDot() {
    const [index, sect] = findClosestSection(sections);
    Array.from(dotNav.children).forEach((child, i) => {
      i === index
        ? child.classList.add("dot-nav__item--active")
        : child.classList.remove("dot-nav__item--active");
      if (index % 2 === 0) {
        child.classList.add("dot-nav__item--light");
        child.classList.remove("dot-nav__item--dark");
      } else {
        child.classList.add("dot-nav__item--dark");
        child.classList.remove("dot-nav__item--light");
      }
    });
  }

  sections.forEach((item) => {
    const dot = document.createElement("div");
    dot.className = "dot-nav__item";

    dotNav.appendChild(dot);

    dot.addEventListener("click", (e) => {
      window.scrollTo({
        top: item.offsetTop,
        behavior: "smooth",
      });
    });

    setActiveDot();
  });

  window.addEventListener("scroll", function (e) {
    setActiveDot();
  });

  document.querySelectorAll(".arrow").forEach((item) => {
    item.addEventListener("click", () => {
      window.scrollTo({
        top: sections[1].offsetTop,
        behavior: "smooth",
      });
    });
  });

  document.querySelectorAll(".card").forEach((item) => {
    item.addEventListener("mouseenter", (e) => {
      const btn = item.querySelector(".btn--outlined");
      btn.classList.add("btn--primary");
      btn.classList.remove("btn--outlined");
    });
    item.addEventListener("mouseleave", (e) => {
      const btn = item.querySelector(".btn--primary");
      btn.classList.add("btn--outlined");
      btn.classList.remove("btn--primary");
    });
  });
});
