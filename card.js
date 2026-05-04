(function () {
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location.href;
    } catch (error) {
      document.documentElement.style.display = 'none';
    }
  }

  var langButtons = document.querySelectorAll('[data-lang-btn]');
  var aboutBlocks = document.querySelectorAll('.about[data-lang]');
  var localizedText = document.querySelectorAll('[data-en][data-es]');

  function setActiveState(collection, attrName, value) {
    Array.prototype.forEach.call(collection, function (node) {
      var isActive = node.getAttribute(attrName) === value;
      if (node.hasAttribute('data-lang-btn')) {
        node.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      }
      if (isActive) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    setActiveState(langButtons, 'data-lang-btn', lang);
    setActiveState(aboutBlocks, 'data-lang', lang);

    Array.prototype.forEach.call(localizedText, function (node) {
      var value = node.getAttribute('data-' + lang);
      if (value !== null) {
        node.textContent = value;
      }
    });

    try {
      window.localStorage.setItem('juan-card-language-v2', lang);
    } catch (error) {}
  }

  Array.prototype.forEach.call(langButtons, function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang-btn'));
    });
  });

  var initialLanguage = 'en';

  try {
    var savedLanguage = window.localStorage.getItem('juan-card-language-v2');
    if (savedLanguage === 'en' || savedLanguage === 'es') {
      initialLanguage = savedLanguage;
    }
  } catch (error) {}

  applyLanguage(initialLanguage);
}());
