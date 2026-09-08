(function () {
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location.href;
    } catch (error) {
      try { document.documentElement.style.display = 'none'; } catch (e) {}
    }
    return;
  }

  function reveal() {
    if (document.body) {
      document.body.classList.add('ready');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    reveal();
  }

  var STORAGE_KEY = 'juan-card-language-v2';
  var langButtons = document.querySelectorAll('[data-lang-btn]');
  var aboutBlocks = document.querySelectorAll('.about[data-lang]');
  var localizedText = document.querySelectorAll('[data-en][data-es]');
  var siteLink = document.getElementById('site-link');

  function applyLanguage(lang) {
    if (lang !== 'en' && lang !== 'es') {
      lang = 'en';
    }
    document.documentElement.lang = lang;

    Array.prototype.forEach.call(langButtons, function (btn) {
      var isActive = btn.getAttribute('data-lang-btn') === lang;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('active', isActive);
    });

    Array.prototype.forEach.call(aboutBlocks, function (block) {
      block.classList.toggle('is-visible', block.getAttribute('data-lang') === lang);
    });

    Array.prototype.forEach.call(localizedText, function (node) {
      var value = node.getAttribute('data-' + lang);
      if (value !== null) {
        node.textContent = value;
      }
    });

    if (siteLink) {
      var href = siteLink.getAttribute('data-href-' + lang);
      if (href) {
        siteLink.setAttribute('href', href);
      }
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {}
  }

  Array.prototype.forEach.call(langButtons, function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang-btn'));
    });
  });

  var initialLanguage = 'en';
  try {
    var savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === 'en' || savedLanguage === 'es') {
      initialLanguage = savedLanguage;
    } else if (typeof navigator !== 'undefined' && navigator.language &&
               navigator.language.toLowerCase().indexOf('es') === 0) {
      initialLanguage = 'es';
    }
  } catch (error) {}

  applyLanguage(initialLanguage);
}());
