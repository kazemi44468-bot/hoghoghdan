/* Persian digit normalization for all visible site content. */
(() => {
  'use strict';
  const toFa = value => String(value).replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit.charCodeAt(0) - 48]);
  const skipTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE', 'KBD', 'SAMP']);
  const normalizeText = root => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || skipTags.has(parent.tagName) || parent.closest('[data-number-format="off"], [contenteditable="true"]')) return NodeFilter.FILTER_REJECT;
        return /[0-9]/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { node.nodeValue = toFa(node.nodeValue); });
    const attrs = ['aria-label', 'title', 'placeholder'];
    const elements = root.nodeType === Node.ELEMENT_NODE ? [root, ...root.querySelectorAll('*')] : root.querySelectorAll ? [...root.querySelectorAll('*')] : [];
    elements.forEach(el => {
      if (skipTags.has(el.tagName) || el.matches('[data-number-format="off"]')) return;
      attrs.forEach(name => { if (el.hasAttribute(name)) el.setAttribute(name, toFa(el.getAttribute(name))); });
      if (el.tagName === 'INPUT' && el.type !== 'number' && el.type !== 'password' && el.type !== 'email' && el.type !== 'url' && el.type !== 'tel' && el.type !== 'date' && el.type !== 'time' && el.type !== 'datetime-local') {
        if (el.hasAttribute('value') && !el.matches('[data-number-format="off"]')) el.setAttribute('value', toFa(el.getAttribute('value')));
        if (el.type === 'button' || el.type === 'submit' || el.type === 'reset') el.value = toFa(el.value);
      }
    });
  };
  const start = () => {
    normalizeText(document.body);
    const observer = new MutationObserver(records => records.forEach(record => {
      if (record.type === 'characterData') {
        const p = record.target.parentElement;
        if (p && !skipTags.has(p.tagName) && !p.closest('[data-number-format="off"], [contenteditable="true"]')) record.target.nodeValue = toFa(record.target.nodeValue);
      } else record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const p = node.parentElement;
          if (p && !skipTags.has(p.tagName) && !p.closest('[data-number-format="off"], [contenteditable="true"]')) node.nodeValue = toFa(node.nodeValue);
        } else if (node.nodeType === Node.ELEMENT_NODE) normalizeText(node);
      });
    }));
    observer.observe(document.body, {subtree: true, childList: true, characterData: true});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true}); else start();
})();
