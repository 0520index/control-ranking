/**
 * 害鳥駆除業者ランキング比較 — UI scripts
 * 依存ライブラリなし / 遅延読み込み想定 (defer)
 */
(function () {
  'use strict';

  /* ---------- グローバルナビ（モバイル） ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('gnav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      nav.classList.toggle('is-open', open);
    }
    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!isOpen());
    });

    // メニュー内のリンクを踏んだら閉じる
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // メニュー外タップで閉じる
    document.addEventListener('click', function (e) {
      if (isOpen() && !nav.contains(e.target)) setOpen(false);
    });

    // Escape で閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // PC幅に戻ったら状態をリセット
    var mq = window.matchMedia('(min-width: 901px)');
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- 目次の自動生成 ----------
     .article 内の h2 / h3 から目次を組み立てる。
     h2 に id が無ければ連番 id を付与する。 */
  function initToc() {
    var toc = document.getElementById('toc');
    var article = document.querySelector('[data-toc-source]');
    if (!toc || !article) return;

    var headings = article.querySelectorAll('h2, h3');
    if (!headings.length) return;

    var rootOl = document.createElement('ol');
    var currentSubOl = null;
    var seq = 0;

    Array.prototype.forEach.call(headings, function (h) {
      if (!h.id) {
        seq += 1;
        h.id = 'sec-' + seq;
      }
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.trim();
      li.appendChild(a);

      if (h.tagName === 'H2') {
        rootOl.appendChild(li);
        currentSubOl = null;
      } else {
        var last = rootOl.lastElementChild;
        if (!last) { rootOl.appendChild(li); return; }
        if (!currentSubOl) {
          currentSubOl = document.createElement('ol');
          last.appendChild(currentSubOl);
        }
        currentSubOl.appendChild(li);
      }
    });

    toc.appendChild(rootOl);

    // 目次が長い場合は折りたたむ
    var items = rootOl.children;
    if (items.length > 6) {
      var hidden = [];
      for (var i = 6; i < items.length; i++) {
        items[i].style.display = 'none';
        hidden.push(items[i]);
      }
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'toc-toggle';
      btn.textContent = 'すべて表示（+' + hidden.length + '項目）';
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        hidden.forEach(function (li) { li.style.display = open ? 'none' : ''; });
        btn.setAttribute('aria-expanded', String(!open));
        btn.textContent = open ? 'すべて表示（+' + hidden.length + '項目）' : '折りたたむ';
      });
      toc.appendChild(btn);
    }
  }

  /* ---------- 追従CTA / トップへ戻る ---------- */
  function initScrollUi() {
    var sticky = document.querySelector('.sticky-cta');
    var toTop = document.querySelector('.to-top');
    var footer = document.querySelector('.site-footer');
    if (!sticky && !toTop) return;

    var ticking = false;

    function update() {
      ticking = false;
      var y = window.pageYOffset;
      var show = y > 500;

      // フッターに重なる位置では追従CTAを隠す
      if (sticky && footer) {
        var footerTop = footer.getBoundingClientRect().top;
        show = show && footerTop > window.innerHeight;
      }
      if (sticky) sticky.classList.toggle('is-visible', show);
      if (toTop) toTop.classList.toggle('is-visible', y > 800);
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    update();
  }

  /* ---------- 横スクロールする表にヒントを出す ----------
     スマホでは .spec テーブルがカード型に組み替わりスクロール不要になるため、
     画面幅の変化に応じてヒントの表示/非表示を切り替える。 */
  function updateTableHints() {
    document.querySelectorAll('.table-scroll').forEach(function (box) {
      var next = box.nextElementSibling;
      var hasHint = next && next.classList.contains('scroll-hint');
      var scrollable = box.scrollWidth - box.clientWidth > 4;

      if (scrollable && !hasHint) {
        var hint = document.createElement('p');
        hint.className = 'scroll-hint';
        hint.textContent = '← 横にスクロールできます →';
        box.parentNode.insertBefore(hint, box.nextSibling);
      } else if (!scrollable && hasHint) {
        next.remove();
      }
    });
  }

  /* ---------- リサイズ/画面回転のデバウンス ---------- */
  function onResizeDebounced(fn, wait) {
    var timer;
    var handler = function () {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
    window.addEventListener('resize', handler, { passive: true });
    window.addEventListener('orientationchange', handler, { passive: true });
  }

  /* ---------- FAQ：URLハッシュで該当項目を開く ---------- */
  function initFaqDeepLink() {
    if (!location.hash) return;
    var target = document.querySelector(location.hash);
    if (!target) return;
    var details = target.closest('details');
    if (details) details.open = true;
  }

  /* ---------- 外部リンクの安全化 ---------- */
  function initExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
      var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (rel.indexOf('noopener') === -1) rel.push('noopener');
      a.setAttribute('rel', rel.join(' '));
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initToc();
    initScrollUi();
    updateTableHints();
    initFaqDeepLink();
    initExternalLinks();
    onResizeDebounced(updateTableHints, 150);
  });
})();
