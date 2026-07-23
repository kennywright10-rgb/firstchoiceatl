/* First Choice — shared site chrome (nav, announcement bar, footer) + shared page scripts.
   Edit this ONE file to change the header/footer on every page — no need to touch each HTML file. */

(function () {
  "use strict";

  var BRAND_DESC = "We help independent plumbers, HVAC companies, electricians, roofers, and other home service businesses become the trades AI recommends &mdash; through Google Maps dominance, automated reviews, and AI-structured websites. No ad spend. Guaranteed results.";
  var ADDR_LINE = "6815 Sunbriar Drive, Cumming, GA 30040";
  var PHONE_DISPLAY = "(678) 478-0973";
  var PHONE_TEL = "6784780973";
  var EMAIL = "info@firstchoicelocalatl.com";
  var BRAND_TAGLINE = "We help home service businesses become the first choice.";

  function navLinks(isHome) {
    var pricingHref = isHome ? "#pricing" : "index.html#pricing";
    return [
      ["index.html", "Home"],
      ["services.html", "Services"],
      [pricingHref, "Pricing"]
    ];
  }

  function renderLinks(links) {
    return links.map(function (l) {
      return '<a href="' + l[0] + '">' + l[1] + "</a>";
    }).join("");
  }

  function buildNav(isHome) {
    var links = renderLinks(navLinks(isHome));
    return (
      '<div class="site-header">' +
      '<nav class="nav">' +
      '  <div class="nav-inner">' +
      '    <a href="index.html" class="logo"><span class="logo-dot"></span>First Choice</a>' +
      '    <ul class="nav-links">' + links + "</ul>" +
      '    <div class="nav-right">' +
      '      <a href="book-a-call.html" class="btn-cta-outline">Book a Call</a>' +
      '      <a href="audit.html" class="btn-cta">Get Free Audit</a>' +
      '      <button class="hamburger" onclick="document.getElementById(\'mobileMenu\').classList.toggle(\'open\')" aria-label="Menu">' +
      "        <span></span><span></span><span></span>" +
      "      </button>" +
      "    </div>" +
      "  </div>" +
      '  <div class="mobile-menu" id="mobileMenu">' + links +
      '<a href="book-a-call.html">Book a Call</a><a href="audit.html">Get Free Audit</a></div>' +
      "</nav>" +
      '<div class="announce">Be the business AI actually recommends: <a href="audit.html">Download the Free Local Visibility Guide &rarr;</a></div>' +
      "</div>"
    );
  }

  function buildFooter() {
    return (
      '<footer class="footer">' +
      '  <div class="wrap">' +
      '    <div class="footer-grid">' +
      "      <div>" +
      '        <a href="index.html" class="logo" style="color:#fff"><span class="logo-dot"></span>First Choice</a>' +
      '        <p class="footer-desc">' + BRAND_DESC + "</p>" +
      '        <div class="footer-contact">' +
      "          <div>&#128205; " + ADDR_LINE + "</div>" +
      '          <div>&#128222; <a href="tel:+1' + PHONE_TEL + '">' + PHONE_DISPLAY + "</a></div>" +
      '          <div>&#9993; <a href="mailto:' + EMAIL + '">' + EMAIL + "</a></div>" +
      "        </div>" +
      "      </div>" +
      "      <div>" +
      "        <h4>Services</h4>" +
      "        <ul>" +
      '          <li><a href="service-maps.html">Google Maps Dominance</a></li>' +
      '          <li><a href="service-reputation.html">Reputation Engine</a></li>' +
      '          <li><a href="service-ai.html">AI Architecture</a></li>' +
      '          <li><a href="service-website.html">Website Optimization</a></li>' +
      "        </ul>" +
      "      </div>" +
      "      <div>" +
      "        <h4>Company</h4>" +
      "        <ul>" +
      '          <li><a href="index.html">Home</a></li>' +
      '          <li><a href="index.html#results">Results</a></li>' +
      '          <li><a href="index.html#pricing">Pricing</a></li>' +
      '          <li><a href="index.html#faq">FAQ</a></li>' +
      "        </ul>" +
      "      </div>" +
      "      <div>" +
      "        <h4>Get Started</h4>" +
      "        <ul>" +
      '          <li><a href="audit.html">Free Audit</a></li>' +
      '          <li><a href="book-a-call.html">Book a Call</a></li>' +
      '          <li><a href="mailto:' + EMAIL + '">Contact Us</a></li>' +
      '          <li><a href="#">Privacy Policy</a></li>' +
      "        </ul>" +
      "      </div>" +
      "    </div>" +
      '    <div class="footer-bottom">' +
      "      <div>&copy; 2026 First Choice. All rights reserved.</div>" +
      "      <div>" + BRAND_TAGLINE + "</div>" +
      "    </div>" +
      "  </div>" +
      "</footer>"
    );
  }

  function mountChrome() {
    var headerMount = document.getElementById("site-header-mount");
    if (headerMount) {
      var isHome = headerMount.getAttribute("data-homepage") === "true";
      headerMount.outerHTML = buildNav(isHome);
    }
    var footerMount = document.getElementById("site-footer-mount");
    if (footerMount) {
      footerMount.outerHTML = buildFooter();
    }
  }

  /* ---- Shared form-submit handler (audit.html + book-a-call.html) ---- */
  window.handleFormSubmit = function (e, formId, successId, errorId) {
    e.preventDefault();
    var form = document.getElementById(formId);
    var success = document.getElementById(successId);
    var error = document.getElementById(errorId);
    var btn = form.querySelector('button[type="submit"]');
    error.style.display = "none";
    btn.disabled = true;
    btn.textContent = "Sending...";
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    }).then(function (response) {
      if (response.ok) {
        form.style.display = "none";
        success.style.display = "block";
      } else {
        throw new Error("Submission failed");
      }
    }).catch(function () {
      error.style.display = "block";
      btn.disabled = false;
      btn.textContent = "Try Again";
    });
    return false;
  };

  /* ---- Shared testimonial carousel (index.html) ---- */
  function initTestimonialCarousel() {
    var scroller = document.getElementById("testiScroll");
    var dotsWrap = document.getElementById("testiDots");
    if (!scroller || !dotsWrap) return;
    var cards = scroller.querySelectorAll(".testi-card");
    cards.forEach(function (card, i) {
      var dot = document.createElement("button");
      dot.className = "testi-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      dot.addEventListener("click", function () {
        scroller.scrollTo({ left: card.offsetLeft - scroller.offsetLeft, behavior: "smooth" });
      });
      dotsWrap.appendChild(dot);
    });
    var dotEls = dotsWrap.querySelectorAll(".testi-dot");
    function updateActiveDot() {
      var scrollLeft = scroller.scrollLeft;
      var closest = 0, min = Infinity;
      cards.forEach(function (card, i) {
        var dist = Math.abs(card.offsetLeft - scroller.offsetLeft - scrollLeft);
        if (dist < min) { min = dist; closest = i; }
      });
      dotEls.forEach(function (d, i) { d.classList.toggle("active", i === closest); });
    }
    var ticking = false;
    scroller.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { updateActiveDot(); ticking = false; });
        ticking = true;
      }
    });
    window.testiScroll = function (dir) {
      scroller.scrollBy({ left: dir * scroller.clientWidth * 0.9, behavior: "smooth" });
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    mountChrome();
    initTestimonialCarousel();
  });
})();
