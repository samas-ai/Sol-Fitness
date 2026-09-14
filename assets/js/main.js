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
       INSTAGRAM OFICIAL — deixe vazio ('') enquanto o perfil não for
       confirmado. Assim que souber o @ oficial, preencha a URL completa:

         instagram: 'https://www.instagram.com/usuario_oficial/'

       Enquanto estiver vazio, os botões de Instagram ficam desativados e
       sinalizados como "em breve" — nenhum link inventado é publicado.
       ------------------------------------------------------------------- */
    instagram: '',

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

  /* Remove acentos e normaliza para comparação */
  function normalizar(txt) {
    return String(txt || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9@\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escaparHTML(txt) {
    return String(txt).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
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
     9. Busca nos canais oficiais
     ======================================================================= */
  var ICONE = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96A9.9 9.9 0 0 0 19.1 4.9 9.9 9.9 0 0 0 12.04 2m0 1.83c2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.66 8.15-8.16 8.15a8.1 8.1 0 0 1-4.15-1.14l-.3-.18-3.08.81.82-3.01-.19-.31a8.1 8.1 0 0 1-1.25-4.33c0-4.5 3.66-8.15 8.15-8.15m-3.4 4.1c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16s.2-1.06.14-1.16c-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.74-1.8-.19-.46-.39-.4-.53-.41z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 2.8h10A4.2 4.2 0 0 1 21.2 7v10A4.2 4.2 0 0 1 17 21.2H7A4.2 4.2 0 0 1 2.8 17V7A4.2 4.2 0 0 1 7 2.8Z"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.4" cy="6.6" r="1.15" fill="currentColor"/></svg>'
  };

  var CANAIS = [
    {
      id: 'instagram',
      tipo: 'ig',
      titulo: 'Instagram da Solfitness',
      descricao: 'Veja fotos, novidades e acompanhe a academia.',
      acao: 'Abrir Instagram',
      sugestoes: ['Instagram', 'Rede social', 'Fotos da academia'],
      termos: [
        'instagram', 'insta', 'ig', 'instagran', 'istagram', 'rede social',
        'redes sociais', 'redes', 'rede', 'social', 'fotos', 'foto', 'imagens',
        'perfil', 'arroba', 'stories', 'story', 'post', 'posts', 'publicacoes',
        'novidades', 'seguir', 'feed'
      ]
    },
    {
      id: 'whatsapp',
      tipo: 'wa',
      titulo: 'WhatsApp Solfitness',
      descricao: 'Fale diretamente com nossa equipe.',
      acao: 'Abrir WhatsApp',
      sugestoes: ['WhatsApp', 'Falar com a equipe', 'Contato'],
      termos: [
        'whatsapp', 'whats', 'wpp', 'zap', 'zapzap', 'wats', 'watsapp',
        'contato', 'contatos', 'falar', 'fale', 'conversar', 'mensagem',
        'mensagens', 'chamar', 'duvida', 'duvidas', 'atendimento', 'suporte',
        'telefone', 'numero', 'ligar', 'informacoes', 'matricula', 'visita',
        '83986625760', '986625760', '8398662576'
      ]
    }
  ];

  /* distância de edição simples, para tolerar erros de digitação */
  function distancia(a, b) {
    if (a === b) return 0;
    if (!a.length || !b.length) return Math.max(a.length, b.length);

    var linha = [], i, j, anterior, atual;
    for (j = 0; j <= b.length; j++) linha[j] = j;

    for (i = 1; i <= a.length; i++) {
      anterior = linha[0];
      linha[0] = i;
      for (j = 1; j <= b.length; j++) {
        atual = linha[j];
        linha[j] = Math.min(
          linha[j] + 1,
          linha[j - 1] + 1,
          anterior + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1)
        );
        anterior = atual;
      }
    }
    return linha[b.length];
  }

  function pontuar(canal, consulta) {
    var melhor = 0;

    canal.termos.forEach(function (termo) {
      var p = 0;

      if (termo === consulta) p = 100;
      else if (termo.indexOf(consulta) === 0) p = 80;
      /* casar no meio da palavra só a partir de 3 letras, para evitar
         falsos positivos do tipo "ig" dentro de "ligar" */
      else if (consulta.length >= 3 && termo.indexOf(consulta) > -1) p = 62;
      else if (consulta.length >= 3 && consulta.indexOf(termo) > -1) p = 58;
      else if (consulta.length >= 4 && distancia(termo, consulta) <= 1) p = 45;
      else if (consulta.length >= 6 && distancia(termo, consulta) <= 2) p = 34;

      if (p > melhor) melhor = p;
    });

    /* consultas com mais de uma palavra: considera cada palavra */
    var palavras = consulta.split(' ').filter(function (p) { return p.length > 2; });
    if (palavras.length > 1) {
      palavras.forEach(function (palavra) {
        canal.termos.forEach(function (termo) {
          if (termo === palavra && melhor < 90) melhor = 90;
          else if (termo.indexOf(palavra) === 0 && melhor < 70) melhor = 70;
        });
      });
    }

    return melhor;
  }

  function buscar(texto) {
    var consulta = normalizar(texto);
    if (!consulta) return [];

    return CANAIS
      .map(function (canal) { return { canal: canal, nota: pontuar(canal, consulta) }; })
      .filter(function (r) { return r.nota >= 30; })
      .sort(function (a, b) { return b.nota - a.nota; })
      .map(function (r) { return r.canal; });
  }

  function iniciarBusca() {
    var input = $('#search-input');
    var listaSug = $('#search-suggestions');
    var saida = $('#search-results');
    var limpar = $('#search-clear');
    if (!input || !saida) return;

    var sugestoesAtuais = [];
    var selecionado = -1;

    /* ---------- sugestões (autocomplete) ---------- */
    function montarSugestoes(texto) {
      var consulta = normalizar(texto);
      if (!consulta) return [];

      var achados = [];
      CANAIS.forEach(function (canal) {
        canal.sugestoes.forEach(function (rotulo) {
          var norm = normalizar(rotulo);
          var pos = norm.indexOf(consulta);
          if (pos > -1) {
            achados.push({ rotulo: rotulo, tipo: canal.tipo, peso: pos === 0 ? 0 : 1 });
          }
        });
      });

      /* se nada casou pelo rótulo, tenta pelos termos do canal */
      if (!achados.length) {
        buscar(texto).forEach(function (canal) {
          achados.push({ rotulo: canal.sugestoes[0], tipo: canal.tipo, peso: 2 });
        });
      }

      return achados
        .sort(function (a, b) { return a.peso - b.peso; })
        .filter(function (item, i, arr) {
          return arr.findIndex(function (o) { return o.rotulo === item.rotulo; }) === i;
        })
        .slice(0, 5);
    }

    function destacar(rotulo, texto) {
      var consulta = normalizar(texto);
      var norm = normalizar(rotulo);
      var pos = norm.indexOf(consulta);
      if (pos < 0 || !consulta) return escaparHTML(rotulo);
      return escaparHTML(rotulo.slice(0, pos)) +
             '<mark>' + escaparHTML(rotulo.slice(pos, pos + consulta.length)) + '</mark>' +
             escaparHTML(rotulo.slice(pos + consulta.length));
    }

    function renderSugestoes(texto) {
      sugestoesAtuais = montarSugestoes(texto);
      selecionado = -1;

      if (!sugestoesAtuais.length) {
        listaSug.hidden = true;
        listaSug.innerHTML = '';
        input.setAttribute('aria-expanded', 'false');
        input.removeAttribute('aria-activedescendant');
        return;
      }

      listaSug.innerHTML = sugestoesAtuais.map(function (s, i) {
        return '<li id="sug-' + i + '" role="option" aria-selected="false" data-i="' + i + '">' +
               ICONE[s.tipo] + '<span>' + destacar(s.rotulo, texto) + '</span></li>';
      }).join('');

      listaSug.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    function fecharSugestoes() {
      listaSug.hidden = true;
      listaSug.innerHTML = '';
      selecionado = -1;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    }

    function marcarSelecao() {
      $$('li', listaSug).forEach(function (li, i) {
        li.setAttribute('aria-selected', i === selecionado ? 'true' : 'false');
      });
      if (selecionado > -1) input.setAttribute('aria-activedescendant', 'sug-' + selecionado);
      else input.removeAttribute('aria-activedescendant');
    }

    /* ---------- resultados ---------- */
    function cartao(canal) {
      var ativo = canal.id === 'instagram' ? instagramAtivo() : true;
      var href = canal.id === 'instagram' ? CONFIG.instagram : linkWhatsApp();

      var botao = ativo
        ? '<a class="btn ' + (canal.tipo === 'wa' ? 'btn--wa' : 'btn--accent') + '" href="' +
          escaparHTML(href) + '" target="_blank" rel="noopener noreferrer">' + canal.acao + '</a>'
        : '<span class="btn btn--ghost is-disabled" aria-disabled="true">Em breve</span>';

      var nota = ativo ? '' :
        '<span class="result__note">O perfil oficial ainda não foi divulgado.</span>';

      return '<article class="result result--' + canal.tipo + '">' +
               '<span class="result__ico">' + ICONE[canal.tipo] + '</span>' +
               '<div class="result__body">' +
                 '<h3>' + escaparHTML(canal.titulo) + '</h3>' +
                 '<p>' + escaparHTML(canal.descricao) + '</p>' + nota +
               '</div>' + botao +
             '</article>';
    }

    function renderResultados(texto) {
      if (!normalizar(texto)) { saida.innerHTML = ''; return; }

      var achados = buscar(texto);

      if (!achados.length) {
        saida.innerHTML =
          '<div class="result__empty">' +
            '<strong>Nada encontrado</strong>' +
            '<p>Não localizamos esse termo. Tente <b>Instagram</b>, <b>WhatsApp</b> ou <b>contato</b>.</p>' +
          '</div>';
        return;
      }

      saida.innerHTML = achados.map(cartao).join('');
    }

    /* ---------- eventos ---------- */
    input.addEventListener('input', function () {
      var texto = input.value;
      limpar.hidden = texto === '';
      renderSugestoes(texto);
      renderResultados(texto);
    });

    input.addEventListener('keydown', function (e) {
      if (listaSug.hidden) {
        if (e.key === 'ArrowDown' && input.value) renderSugestoes(input.value);
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selecionado = (selecionado + 1) % sugestoesAtuais.length;
        marcarSelecao();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selecionado = (selecionado - 1 + sugestoesAtuais.length) % sugestoesAtuais.length;
        marcarSelecao();
      } else if (e.key === 'Enter') {
        if (selecionado > -1) {
          e.preventDefault();
          input.value = sugestoesAtuais[selecionado].rotulo;
          limpar.hidden = false;
          fecharSugestoes();
          renderResultados(input.value);
        } else {
          fecharSugestoes();
        }
      } else if (e.key === 'Escape') {
        fecharSugestoes();
      }
    });

    listaSug.addEventListener('mousedown', function (e) {
      var li = e.target.closest('li');
      if (!li) return;
      e.preventDefault();
      input.value = sugestoesAtuais[parseInt(li.getAttribute('data-i'), 10)].rotulo;
      limpar.hidden = false;
      fecharSugestoes();
      renderResultados(input.value);
      input.focus();
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search')) fecharSugestoes();
    });

    limpar.addEventListener('click', function () {
      input.value = '';
      limpar.hidden = true;
      fecharSugestoes();
      saida.innerHTML = '';
      input.focus();
    });

    $$('#search-chips .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        input.value = chip.getAttribute('data-term');
        limpar.hidden = false;
        fecharSugestoes();
        renderResultados(input.value);
        input.focus();
      });
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
    iniciarBusca();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
