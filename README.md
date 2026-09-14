# Solfitness Academia — Landing Page

Site institucional de página única para a **Solfitness Academia** (Patos - PB).
HTML, CSS e JavaScript puros — sem build, sem dependências, sem framework.

---

## Como visualizar

Abra `index.html` no navegador. Para testar tudo corretamente (mapa, fontes e
scripts), use um servidor local:

```bash
python -m http.server 5510
```

Depois acesse `http://localhost:5510`.

---

## Estrutura de arquivos

```
Sol Fitness/
├── index.html              página completa
├── robots.txt              [1] ajustar domínio
├── sitemap.xml             [1] ajustar domínio
├── README.md
└── assets/
    ├── css/style.css       estilos
    ├── js/main.js          [2] configuração no topo do arquivo
    └── img/
        ├── solfitness-logo.png   ORIGINAL da logo (1894x830) — não usado na página
        ├── logo-solfitness.png   logo do site, derivada do original
        ├── favicon.png           ícone (símbolo da logo sobre fundo escuro)
        ├── apple-touch-icon.png  ícone para iOS
        ├── og-image.jpg          imagem de compartilhamento
        ├── hero.svg              [3] placeholder
        ├── experiencia.svg       [3] placeholder
        └── galeria-1..6.svg      [3] placeholders
```

---

## [1] Antes de publicar: trocar o domínio

Substitua `SEU-DOMINIO.com.br` pelo domínio real em três arquivos:

| Arquivo       | Onde                                                       |
|---------------|------------------------------------------------------------|
| `index.html`  | `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD |
| `robots.txt`  | linha `Sitemap:`                                            |
| `sitemap.xml` | tag `<loc>`                                                 |

---

## [2] Configuração (Instagram, WhatsApp, endereço)

Tudo fica no **topo de `assets/js/main.js`**, no objeto `CONFIG`:

```js
var CONFIG = {
  whatsapp: '5583986625760',
  whatsappMensagem: 'Olá! Conheci a Solfitness Academia pelo site e gostaria de saber mais.',
  instagram: '',   // <-- preencher quando o perfil oficial for confirmado
  endereco: 'Solfitness Academia, BR-230, 323 - Salgadinho, Patos - PB, 58700-070'
};
```

### Instagram — única pendência de conteúdo

O perfil oficial ainda não foi informado, então nenhum link foi inventado.
Enquanto `instagram` estiver vazio (`''`), os botões de Instagram do site
aparecem esmaecidos, sem link, com `aria-disabled`, e o texto do card muda
para "Perfil oficial em breve".

Para ativar, basta preencher a URL completa — nada mais precisa ser alterado:

```js
instagram: 'https://www.instagram.com/usuario_oficial/',
```

---

## Identidade visual

### Logo

A logo oficial está aplicada. São dois arquivos, com papéis diferentes:

| Arquivo | Papel |
|---|---|
| `solfitness-logo.png` | **Original**, 1894×830, fundo transparente. Fica no repositório como fonte da marca; a página não o carrega. |
| `logo-solfitness.png` | **Usado no site**, 760×307 (~104 KB). Redução do original, aparada nas margens transparentes. |

A logo é exibida com `object-fit: contain` e altura fixa, portanto **não sofre
distorção**. Aparece no cabeçalho (58 px, 48 px após rolar) e no rodapé (62 px).

⚠️ **A palavra "FITNESS" da logo é branca.** Ela só tem contraste sobre fundo
escuro. Todo o site é escuro, então funciona — mas se um dia for usada sobre
fundo claro, será preciso a versão alternativa da logo junto ao proprietário.

**Se a logo mudar:** substitua `solfitness-logo.png` e gere de novo as versões
derivadas. Os ícones foram produzidos isolando o símbolo "S" (que são duas
formas separadas, os dois componentes mais à esquerda do arquivo) e centrando-o
sobre um quadrado arredondado `#0A0A0B`.

### Cor de destaque

O laranja foi **extraído da própria logo**: `#FD5503`, a cor dominante das
formas do símbolo. As variáveis ficam no topo de `assets/css/style.css`:

```css
--accent:      #fd5503;   /* laranja oficial da marca */
--accent-soft: #ff8a3b;   /* variação clara, usada em hover */
--star:        #ffb400;   /* dourado das estrelas de avaliação */
--accent-ink:  #0a0a0b;   /* texto sobre a cor da marca */
```

Alterar `--accent` repinta o site inteiro. O dourado das estrelas é proposital:
distingue a nota do Google do laranja da marca, como na própria interface do
Google. Contraste de `#FD5503` sobre o fundo `#08080A`: **6,2:1** (WCAG AA).

---

## [3] Fotos — pendência

Nenhuma foto da academia foi fornecida e **nenhuma imagem de terceiros foi
baixada ou reutilizada**. Os espaços de imagem usam placeholders SVG marcados
visualmente com a tarja "IMAGEM PROVISÓRIA".

### Como substituir

Coloque as fotos reais em `assets/img/` e atualize os caminhos em `index.html`.

| Placeholder        | Onde aparece            | Proporção sugerida | Nome sugerido      |
|--------------------|-------------------------|--------------------|--------------------|
| `hero.svg`         | Topo, tela cheia        | 16:9 (1920×1080)   | `hero.jpg`         |
| `experiencia.svg`  | Seção "A experiência"   | 4:5 (1200×1500)    | `experiencia.jpg`  |
| `galeria-1.svg`    | Galeria                 | 4:3                | `galeria-1.jpg`    |
| `galeria-2.svg`    | Galeria                 | 4:5                | `galeria-2.jpg`    |
| `galeria-3.svg`    | Galeria                 | 3:2                | `galeria-3.jpg`    |
| `galeria-4.svg`    | Galeria                 | 4:5                | `galeria-4.jpg`    |
| `galeria-5.svg`    | Galeria                 | 4:3                | `galeria-5.jpg`    |
| `galeria-6.svg`    | Galeria                 | 1:1                | `galeria-6.jpg`    |

Ao trocar cada imagem, **atualize também**:

1. o atributo `alt` — hoje está descrito como "Espaço reservado para foto…";
   troque por uma descrição real do que aparece na foto (acessibilidade e SEO);
2. o `data-caption` do botão da galeria — é a legenda do lightbox;
3. os atributos `width` e `height` com as dimensões reais (evita deslocamento
   de layout durante o carregamento);
4. remova o parágrafo de aviso `.gallery__note` no fim da seção Estrutura.

A galeria funciona com qualquer quantidade de fotos: para usar menos de 6,
apague os blocos `<figure class="gallery__item">` sobrando — o layout masonry
se reorganiza sozinho.

**Otimização recomendada:** exporte em WebP ou JPG com largura máxima de
1920 px e qualidade ~80. Todas as imagens abaixo da dobra já usam
`loading="lazy"`.

---

## Seções da página

Hero → Diferenciais → Estrutura (galeria) → Experiência → Avaliações → CTA →
Localização → Contato.

| Recurso | Detalhe |
|---|---|
| Menu | Fixo, ganha fundo ao rolar; link ativo conforme a seção visível |
| Mobile | Menu hamburger em tela cheia, cards em coluna única |
| CTA fixo | Barra de WhatsApp no rodapé do celular, surge após a primeira dobra |
| Botão flutuante | WhatsApp no canto inferior direito (tablet/desktop) |
| Galeria | Masonry + lightbox com teclado (`Esc`, `←`, `→`) |
| Avaliações | Contadores animados de 0 até 5,0 e 4 |
| Mapa | Google Maps incorporado com `loading="lazy"` e filtro escuro |
| Animações | Fade/slide por IntersectionObserver, parallax discreto, hover |
| Acessibilidade | Skip link, foco visível, ARIA no menu e no lightbox, `alt` em tudo |
| Movimento reduzido | `prefers-reduced-motion` desliga animações e parallax |
| SEO | Title, meta description, Open Graph, Twitter Card, JSON-LD `ExerciseGym` |

---

## Conteúdo: o que é dado real e o que não existe

Nada além das informações fornecidas foi inventado. **Não há** no site preços,
planos, modalidades, quantidade de aparelhos, horário por dia da semana,
serviços adicionais, nomes de profissionais nem avaliações extras.

Publicado com base no que foi informado:

- Endereço, telefone, "Aberto até 22:00"
- Nota 5,0 no Google com 4 avaliações
- Os 3 depoimentos reproduzidos na seção de avaliações

Os dados estruturados (JSON-LD) declaram `aggregateRating` 5,0 com 4
avaliações. Como esses números vêm do Google e tendem a mudar, mantenha-os
atualizados — e retire o bloco caso as avaliações deixem de ser exibidas
publicamente.

O horário de funcionamento **não** foi incluído no JSON-LD, porque "aberto até
22:00" não informa os dias nem o horário de abertura. Quando a grade completa
estiver disponível, vale acrescentar `openingHoursSpecification`.

---

## Publicação

Site estático: basta enviar os arquivos para a raiz do servidor. Funciona em
Vercel, Netlify, GitHub Pages, Hostinger ou cPanel.

Checklist final:

- [x] Logo oficial aplicada
- [x] Cor de destaque extraída da logo
- [x] Favicon e imagem de compartilhamento gerados a partir da logo
- [ ] Fotos reais no lugar dos placeholders, com `alt` atualizado
- [ ] Aviso `.gallery__note` removido
- [ ] `CONFIG.instagram` preenchido
- [ ] `SEU-DOMINIO.com.br` substituído nos 3 arquivos
- [ ] HTTPS ativo
- [ ] Perfil do Google Empresas apontando para o site
