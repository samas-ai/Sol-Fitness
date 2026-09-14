/* =========================================================================
   SOLFITNESS ACADEMIA — scripts da landing page
   ========================================================================= */
(function () {
  'use strict';

  /* =======================================================================
     CONFIGURAÇÃO — ajuste apenas este bloco
     ======================================================================= */
  var CONFIG = {

    /* WhatsApp oficial (somente dígitos, com DDI 55) */
    whatsapp: '5583986625760',

    /* Mensagem que já vem escrita ao abrir a conversa */
    whatsappMensagem: 'Olá! Conheci a Solfitness Academia pelo site e gostaria de saber mais.',

    /* -------------------------------------------------------------------
       INSTAGRAM OFICIAL — se algum dia precisar desativar, basta deixar
       vazio (''): os botões voltam a ficar esmaecidos e sinalizados como
       "Perfil oficial em breve", sem link quebrado na página.
       ------------------------------------------------------------------- */
    instagram: 'https://www.instagram.com/solfitness.academia/',

    /* Endereço usado no botão "Como chegar" */
    endereco: 'Solfitness Academia, BR-230, 323 - Salgadinho, Patos - PB, 58700-070'
  };

  /* =======================================================================
     Helpers
     ======================================================================= */
  var $  = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function linkWhatsApp() {
    return 'https://wa.me/' + CONFIG.whatsapp +
           '?text=' + encodeURIComponent(CONFIG.whatsappMensagem);
  }

  function linkRota() {
    return 'https://www.google.com/maps/dir/?api=1&destination=' +
           encodeURIComponent(CONFIG.endereco);
  }

  function instagramAtivo() {
    return typeof CONFIG.instagram === 'string' && CONFIG.instagram.trim() !== '';
  }

  /* =======================================================================
     1. Links dinâmicos (WhatsApp, Instagram, rota)
     ======================================================================= */
  function aplicarLinks() {
    $$('[data-whatsapp]').forEach(function (el) {
      el.setAttribute('href', linkWhatsApp());
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });

    $$('[data-rota]').forEach(function (el) {
      el.setAttribute('href', linkRota());
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });

    $$('[data-instagram]').forEach(function (el) {
      if (instagramAtivo()) {
        el.setAttribute('href', CONFIG.instagram);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
        el.classList.remove('is-disabled');
        el.removeAttribute('aria-disabled');
      } else {
        el.setAttribute('href', '#contato');
        el.classList.add('is-disabled');
        el.setAttribute('aria-disabled', 'true');
        el.setAttribute('title', 'Perfil oficial do Instagram ainda não divulgado');
      }
    });

    if (!instagramAtivo()) {
      $$('[data-instagram-label]').forEach(function (el) {
        el.textContent = 'Perfil oficial em breve';
      });
    }
  }

  /* =======================================================================
     2. Header — fundo ao rolar
     ======================================================================= */
  function iniciarHeader() {
    var header = $('#header');
    if (!header) return;

    var marcar = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    marcar();
    window.addEventListener('scroll', marcar, { passive: true });
  }

  /* =======================================================================
     2b. CTA fixo no mobile — aparece depois da primeira dobra
     ======================================================================= */
  function iniciarCtaMobile() {
    var barra = $('.mobile-cta');
    var hero = $('.hero');
    if (!barra || !hero) return;

    var marcar = function () {
      barra.classList.toggle('is-visible', window.scrollY > hero.offsetHeight * 0.65);
    };
    marcar();
    window.addEventListener('scroll', marcar, { passive: true });
    window.addEventListener('resize', marcar);
  }

  /* =======================================================================
     3. Menu mobile
     ======================================================================= */
  function iniciarMenu() {
    var burger = $('#burger');
    var nav = $('#nav');
    if (!burger || !nav) return;

    function fechar() {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('is-locked');
    }

    function abrir() {
      nav.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('is-locked');
    }

    burger.addEventListener('click', function () {
      nav.classList.contains('is-open') ? fechar() : abrir();
    });

    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', fechar);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        fechar();
        burger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) fechar();
    });
  }

  /* =======================================================================
     4. Link ativo conforme a seção visível
     ======================================================================= */
  function iniciarScrollspy() {
    var links = $$('.nav__link');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var mapa = {};
    var alvos = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href');
      if (!id || id.charAt(0) !== '#') return;
      var alvo = document.querySelector(id);
      if (alvo) { mapa[id.slice(1)] = link; alvos.push(alvo); }
    });

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        var atual = mapa[entrada.target.id];
        if (atual) atual.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    alvos.forEach(function (a) { obs.observe(a); });
  }

  /* =======================================================================
     5. Animações de entrada
     ======================================================================= */
  function iniciarReveal() {
    var itens = $$('.reveal');
    if (!itens.length) return;

    if (reduzirMovimento || !('IntersectionObserver' in window)) {
      itens.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entradas, observador) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    itens.forEach(function (el) { obs.observe(el); });
  }

  /* =======================================================================
     6. Parallax discreto
     ======================================================================= */
  function iniciarParallax() {
    var itens = $$('[data-parallax]');
    if (!itens.length || reduzirMovimento) return;

    var pendente = false;

    function atualizar() {
      pendente = false;
      var alturaJanela = window.innerHeight;

      itens.forEach(function (el) {
        var pai = el.parentElement;
        var caixa = pai.getBoundingClientRect();
        if (caixa.bottom < -200 || caixa.top > alturaJanela + 200) return;

        var fator = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        var centro = caixa.top + caixa.height / 2 - alturaJanela / 2;
        el.style.transform = 'translate3d(0,' + (centro * fator * -1).toFixed(1) + 'px,0)';
      });
    }

    function agendar() {
      if (pendente) return;
      pendente = true;
      window.requestAnimationFrame(atualizar);
    }

    atualizar();
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
  }

  /* =======================================================================
     7. Contadores animados
     ======================================================================= */
  function iniciarContadores() {
    var itens = $$('.counter');
    if (!itens.length) return;

    function formatar(valor, casas) {
      return valor.toFixed(casas).replace('.', ',');
    }

    function animar(el) {
      var destino = parseFloat(el.getAttribute('data-count-to')) || 0;
      var casas = parseInt(el.getAttribute('data-decimals'), 10) || 0;

      if (reduzirMovimento) {
        el.textContent = formatar(destino, casas);
        return;
      }

      var duracao = 1400;
      var inicio = null;

      function passo(agora) {
        if (inicio === null) inicio = agora;
        var t = Math.min((agora - inicio) / duracao, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = formatar(destino * eased, casas);
        if (t < 1) window.requestAnimationFrame(passo);
      }

      window.requestAnimationFrame(passo);
    }

    if (!('IntersectionObserver' in window)) {
      itens.forEach(animar);
      return;
    }

    var obs = new IntersectionObserver(function (entradas, observador) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        animar(entrada.target);
        observador.unobserve(entrada.target);
      });
    }, { threshold: 0.5 });

    itens.forEach(function (el) { obs.observe(el); });
  }

  /* =======================================================================
     8. Lightbox da galeria
     ======================================================================= */
  function iniciarLightbox() {
    var caixa = $('#lightbox');
    var img = $('#lb-img');
    var legenda = $('#lb-cap');
    var btns = $$('[data-lightbox]');
    if (!caixa || !img || !btns.length) return;

    var indice = 0;
    var ultimoFoco = null;

    function mostrar(i) {
      indice = (i + btns.length) % btns.length;
      var b = btns[indice];
      var interna = $('img', b);
      img.src = b.getAttribute('data-src');
      img.alt = interna ? interna.alt : '';
      legenda.textContent = b.getAttribute('data-caption') || '';
    }

    function abrir(i) {
      ultimoFoco = document.activeElement;
      mostrar(i);
      caixa.hidden = false;
      document.body.classList.add('is-locked');
      $('#lb-close').focus();
    }

    function fechar() {
      caixa.hidden = true;
      document.body.classList.remove('is-locked');
      img.src = '';
      if (ultimoFoco) ultimoFoco.focus();
    }

    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { abrir(i); });
    });

    $('#lb-close').addEventListener('click', fechar);
    $('#lb-prev').addEventListener('click', function () { mostrar(indice - 1); });
    $('#lb-next').addEventListener('click', function () { mostrar(indice + 1); });

    caixa.addEventListener('click', function (e) {
      if (e.target === caixa) fechar();
    });

    document.addEventListener('keydown', function (e) {
      if (caixa.hidden) return;
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowLeft') mostrar(indice - 1);
      if (e.key === 'ArrowRight') mostrar(indice + 1);
    });
  }

  /* =======================================================================
     Inicialização
     ======================================================================= */
  function iniciar() {
    aplicarLinks();
    iniciarHeader();
    iniciarCtaMobile();
    iniciarMenu();
    iniciarScrollspy();
    iniciarReveal();
    iniciarParallax();
    iniciarContadores();
    iniciarLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
