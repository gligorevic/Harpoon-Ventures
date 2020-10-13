document.addEventListener("DOMContentLoaded", function (event) {
  const dotNav = document.querySelector(".dot-nav");
  const sections = document.querySelectorAll("header, section");

  sections.forEach((item, index) => {
    const dot = document.createElement("div");
    dot.className = "dot-nav__item";
    if (index === 0) dot.classList.add("dot-nav__item--active");

    dotNav.appendChild(dot);

    dot.addEventListener("click", (e) => {
      window.scrollTo({
        top: item.offsetTop,
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("scroll", function (e) {
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
  });

  document.querySelectorAll(".arrow").forEach((item) => {
    item.addEventListener("click", (event) => {
      window.scrollTo({
        top: sections[1].offsetTop,
        behavior: "smooth",
      });
    });
  });
});

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
