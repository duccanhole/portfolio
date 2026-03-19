const state = {
  data: null,
};

const qs = (selector) => document.querySelector(selector);
const createEl = (tag, className) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
};

const setText = (el, text) => {
  el.textContent = text;
};

const setHTML = (el, html) => {
  el.innerHTML = html;
};

const renderHero = (hero) => {
  const container = qs("#hero-content");
  const heading = createEl("div");
  const title = createEl("h1");
  const subtitle = createEl("p");
  const actions = createEl("div", "hero-actions");

  setText(title, hero.title);
  setText(subtitle, hero.subtitle);

  hero.actions.forEach((action) => {
    const link = createEl("a", `button${action.variant === "secondary" ? " secondary" : ""}`);
    link.href = action.href;
    setText(link, action.label);
    actions.appendChild(link);
  });

  heading.appendChild(title);
  heading.appendChild(subtitle);
  heading.appendChild(actions);

  // const stats = createEl("div", "project-card");
  // const statsTitle = createEl("h3");
  // setText(statsTitle, hero.highlight.title);
  // const statsBody = createEl("p");
  // setText(statsBody, hero.highlight.description);
  // const statsMeta = createEl("div", "project-meta");

  // hero.highlight.metrics.forEach((metric) => {
  //   const span = createEl("span");
  //   setText(span, metric);
  //   statsMeta.appendChild(span);
  // });

  // stats.appendChild(statsTitle);
  // stats.appendChild(statsBody);
  // stats.appendChild(statsMeta);

  container.appendChild(heading);
  // container.appendChild(stats);
};

const renderAbout = (about) => {
  const container = qs("#about-content");
  const card = createEl("div", "about-card");
  const heading = createEl("h2");
  const body = createEl("p");
  setText(heading, about.title);
  setText(body, about.description);
  card.appendChild(heading);
  card.appendChild(body);
  container.appendChild(card);
};

const renderProjects = (projects) => {
  // const intro = qs("#projects-intro");
  const grid = qs("#projects-grid");
  // setText(intro, projects.intro);

  projects.items.forEach((project) => {
    const card = createEl("article", "project-card");
    const title = createEl("h3");
    const desc = createEl("p");
    const meta = createEl("div", "project-meta");
    const links = createEl("div", "project-links");

    setText(title, project.name);
    setText(desc, project.description);

    project.tags.forEach((tag) => {
      const chip = createEl("span");
      setText(chip, tag);
      meta.appendChild(chip);
    });

    project.links.forEach((link) => {
      const anchor = createEl("a");
      anchor.href = link.href;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      setText(anchor, link.label);
      links.appendChild(anchor);
    });

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(meta);
    card.appendChild(links);
    grid.appendChild(card);
  });
};

const renderSkills = (skills) => {
  // const intro = qs("#skills-intro");
  const list = qs("#skills-list");
  // setText(intro, skills.intro);

  skills.items.forEach((skill) => {
    const chip = createEl("div", "skill-chip");
    setText(chip, skill);
    list.appendChild(chip);
  });
};

const renderContact = (contact) => {
  const container = qs("#contact-content");
  const card = createEl("div", "contact-card");
  const heading = createEl("h2");
  // const body = createEl("p");
  const details = createEl("div", "contact-details");

  setText(heading, contact.title);
  // setText(body, contact.description);

  contact.items.forEach((item) => {
    const row = createEl("div");
    const label = createEl("strong");
    setText(label, item.label);
    row.appendChild(label);
    row.append(" ");

    if (item.href) {
      const link = createEl("a");
      link.href = item.href;
      setText(link, item.value);
      row.appendChild(link);
    } else {
      row.append(item.value);
    }

    details.appendChild(row);
  });

  card.appendChild(heading);
  // card.appendChild(body);
  card.appendChild(details);
  container.appendChild(card);
};

const renderFooter = (footer) => {
  const footerText = qs("#footer-text");
  setText(footerText, footer);
};

const setupMenu = () => {
  const toggle = qs(".menu-toggle");
  const links = qs("#nav-links");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
};

const setupScrollReveal = () => {
  const targets = document.querySelectorAll(".section > .container, .footer");
  targets.forEach((target) => target.classList.add("reveal-target"));
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach((target) => observer.observe(target));
};

const init = async () => {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Failed to load data.json");
    }

    const data = await response.json();
    state.data = data;

    renderHero(data.hero);
    renderAbout(data.about);
    renderProjects(data.projects);
    renderSkills(data.skills);
    renderContact(data.contact);
    renderFooter(data.footer);
    setupMenu();
    setupScrollReveal();
  } catch (error) {
    console.log(error);
    const container = qs("#hero-content");
    if (container) {
      setHTML(container, "<p>Unable to load portfolio data. Please try again later.</p>");
    }
    console.error(error);
  }
};

init();
