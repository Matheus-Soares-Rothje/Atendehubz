/* ── TEMA (dark / light / system) ── */
(function () {
  const html = document.documentElement;
  const KEY = 'atendeehubz-theme';

  // Aplica tema salvo (se houver) antes do primeiro paint
  const saved = localStorage.getItem(KEY);
  if (saved) html.setAttribute('data-theme', saved);

  function getEffectiveTheme() {
    const attr = html.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateIcon() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const theme = getEffectiveTheme();
    btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    btn.title = theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro';
  }

  function toggleTheme() {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
    updateIcon();
  }

  // Atualiza ícone ao mudar preferência do sistema (sem escolha manual)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem(KEY)) updateIcon();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);
    updateIcon();
  });
})();


/* ── FAQ ACCORDION ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Fecha todos
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      // Abre o clicado (se não estava aberto)
      if (!isOpen) item.classList.add('open');
    });
  });
});
