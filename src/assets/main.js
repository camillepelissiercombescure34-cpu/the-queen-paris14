/* THE QUEEN — interactions, sans dépendance externe. */
(function () {
  "use strict";

  var $ = function (selector, root) {
    return (root || document).querySelector(selector);
  };
  var $$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  /* --- Menu mobile ------------------------------------------------------- */
  var burger = $("[data-burger]");
  var nav = $("#nav-principal");

  function setMenu(open) {
    if (!burger || !nav) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    $$("a", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1020) setMenu(false);
    });
  }

  /* --- En-tête au défilement --------------------------------------------- */
  var header = $("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Apparitions douces ------------------------------------------------ */
  var revealables = $$(
    ".section__head, .service-card, .value, .price-block, .contact-card, " +
      ".split__media, .split__body, .quotes, .review-score, .gallery__item, " +
      ".anchor-nav, .price-help, .callband__inner"
  );

  if ("IntersectionObserver" in window && revealables.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach(function (element) {
      element.setAttribute("data-reveal", "");
      observer.observe(element);
    });
  }

  /* --- Horaires : ouvert / fermé, heure de Paris ------------------------- */
  var status = $("[data-status]");
  if (status) {
    var statusText = $("[data-status-text]", status);
    var schedule = {
      Sun: [12 * 60, 19 * 60 + 45],
      Mon: [10 * 60 + 30, 19 * 60 + 45],
      Tue: [10 * 60 + 30, 19 * 60 + 45],
      Wed: [10 * 60 + 30, 19 * 60 + 45],
      Thu: [10 * 60 + 30, 19 * 60 + 45],
      Fri: [10 * 60 + 30, 19 * 60 + 45],
      Sat: [10 * 60 + 30, 19 * 60 + 45]
    };

    var updateStatus = function () {
      try {
        var parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Paris",
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }).formatToParts(new Date());
        var values = {};
        parts.forEach(function (part) {
          values[part.type] = part.value;
        });
        var day = String(values.weekday || "").slice(0, 3);
        var minutes = Number(values.hour) * 60 + Number(values.minute);
        var today = schedule[day] || schedule.Mon;
        var open = minutes >= today[0] && minutes < today[1];

        if (open) {
          var close = today[1];
          var closes = Math.floor(close / 60) + "h" + String(close % 60).padStart(2, "0");
          statusText.textContent = "Ouvert · ferme à " + closes;
          status.classList.add("status--open");
          status.classList.remove("status--closed");
        } else {
          statusText.textContent = "Fermé · appelez-nous";
          status.classList.add("status--closed");
          status.classList.remove("status--open");
        }
        status.setAttribute("title", "Heure de Paris");
      } catch (error) {
        statusText.textContent = "Lun–sam 10h30–19h45";
      }
    };

    updateStatus();
    window.setInterval(updateStatus, 60000);
  }

  /* --- Carte chargée sur demande ----------------------------------------- */
  $$("[data-map]").forEach(function (map) {
    var button = $("[data-map-load]", map);
    var template = $("[data-map-template]", map);
    if (!button || !template) return;
    button.addEventListener("click", function () {
      var frame = template.content.firstElementChild.cloneNode(true);
      map.replaceChildren(frame);
    });
  });

  /* --- Copier le numéro --------------------------------------------------- */
  $$("[data-copy]").forEach(function (button) {
    var note = $("[data-copy-note]");
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy") || "";
      var done = function () {
        if (note) note.textContent = "Numéro copié : " + value;
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(function () {
          if (note) note.textContent = "Numéro : " + value;
        });
      } else {
        var field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        try {
          document.execCommand("copy");
          done();
        } catch (error) {
          if (note) note.textContent = "Numéro : " + value;
        }
        document.body.removeChild(field);
      }
    });
  });

  /* --- Filtres de la galerie --------------------------------------------- */
  var filters = $("[data-filters]");
  var gallery = $("[data-gallery]");
  if (filters && gallery) {
    var items = $$(".gallery__item", gallery);
    var counter = $("[data-gallery-count]");

    var applyFilter = function (category) {
      var visible = 0;
      items.forEach(function (item) {
        var show = category === "Tout" || item.getAttribute("data-category") === category;
        item.hidden = !show;
        if (show) visible += 1;
      });
      if (counter) {
        counter.textContent = visible + (visible > 1 ? " visuels affichés" : " visuel affiché");
      }
    };

    $$("[data-filter]", filters).forEach(function (button) {
      button.addEventListener("click", function () {
        $$("[data-filter]", filters).forEach(function (other) {
          var active = other === button;
          other.classList.toggle("is-active", active);
          other.setAttribute("aria-pressed", String(active));
        });
        applyFilter(button.getAttribute("data-filter"));
      });
    });
  }

  /* --- Lightbox ----------------------------------------------------------- */
  var dialog = $("[data-lightbox-dialog]");
  if (dialog) {
    var triggers = $$("[data-lightbox]");
    var image = $("[data-lightbox-img]", dialog);
    var caption = $("[data-lightbox-caption]", dialog);
    var counter = $("[data-lightbox-count]", dialog);
    var closeButton = $("[data-lightbox-close]", dialog);
    var previous = $("[data-lightbox-prev]", dialog);
    var next = $("[data-lightbox-next]", dialog);
    var current = 0;

    var visibleTriggers = function () {
      return triggers.filter(function (trigger) {
        var figure = trigger.closest(".gallery__item");
        return !figure || !figure.hidden;
      });
    };

    var show = function (index) {
      var list = visibleTriggers();
      if (!list.length) return;
      current = (index + list.length) % list.length;
      var trigger = list[current];
      var source = trigger.getAttribute("data-src");
      var img = $("img", trigger);
      image.src = source || (img ? img.currentSrc || img.src : "");
      image.alt = trigger.getAttribute("data-alt") || (img ? img.alt : "");
      caption.textContent = trigger.getAttribute("data-caption") || "";
      counter.textContent = current + 1 + " / " + list.length;
    };

    var open = function (index) {
      show(index);
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      document.body.classList.add("nav-open");
    };

    var close = function () {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
      document.body.classList.remove("nav-open");
    };

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var list = visibleTriggers();
        open(list.indexOf(trigger));
      });
    });

    closeButton.addEventListener("click", close);
    previous.addEventListener("click", function () {
      show(current - 1);
    });
    next.addEventListener("click", function () {
      show(current + 1);
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("close", function () {
      document.body.classList.remove("nav-open");
    });
    dialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
  }

  /* --- Année courante ----------------------------------------------------- */
  $$("[data-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
