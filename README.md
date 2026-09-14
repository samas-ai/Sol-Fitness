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
        ├── logo-solfitness.svg   [3] LOGO PROVISÓRIA — substituir
        ├── favicon.svg           [3] derivada da logo provisória
        ├── hero.svg              [4] placeholder
        ├── experiencia.svg       [4] placeholder
        ├── galeria-1..6.svg      [4] placeholders
        └── og-image.svg          [4] placeholder (compartilhamento)
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

### Instagram

O perfil oficial **não foi informado**, então nenhum link foi inventado.
Enquanto `instagram` estiver vazio (`''`), o site se comporta assim:

- os botões de Instagram ficam esmaecidos, sem link e marcados como
  `aria-disabled`;
- o texto do card muda para "Perfil oficial em breve";
- a busca ainda encontra o Instagram, mas exibe o aviso
  "O perfil oficial ainda não foi divulgado" com um botão "Em breve".

Para ativar, basta preencher a URL completa — nada mais precisa ser alterado:

```js
instagram: 'https://www.instagram.com/usuario_oficial/',
```

---

## [3] Logo

A logo oficial não foi fornecida. `assets/img/logo-solfitness.svg` é um
**logotipo provisório** criado apenas para permitir a montagem do layout.

**Para aplicar a logo oficial:** substitua esse arquivo mantendo o mesmo nome
(`logo-solfitness.svg`). Se a logo oficial for PNG, salve como
`logo-solfitness.png` e troque a extensão nas 2 ocorrências em `index.html`
(cabeçalho e rodapé).

A logo é exibida com `object-fit: contain` e altura fixa, portanto **não sofre
distorção** seja qual for a proporção do arquivo. Prefira SVG ou PNG com fundo
transparente.

Convém também trocar `assets/img/favicon.svg` pelo símbolo da marca oficial.

### Cor de destaque

A cor laranja (`#FF7A00`) foi escolhida como referência ao "Sol" do nome, já
que a logo oficial não estava disponível para extração da cor. Ao aplicar a
logo real, ajuste as variáveis no topo de `assets/css/style.css`:

```css
--accent:      #FF7A00;   /* cor principal da marca */
--accent-soft: #FFB02E;   /* variação clara (estrelas, hover) */
--accent-ink:  #0A0A0B;   /* texto sobre a cor principal */
```

Só isso já repinta o site inteiro. Mantenha bom contraste com o fundo escuro.

---

## [4] Fotos

Nenhuma foto da academia foi fornecida e **nenhuma imagem de terceiros foi
baixada ou reutilizada**. Todos os espaços de imagem usam placeholders SVG
marcados visualmente com a tarja "IMAGEM PROVISÓRIA".

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
| `og-image.svg`     | Compartilhamento redes  | 1200×630           | `og-image.jpg`     |

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

## O que o site faz

| Recurso | Detalhe |
|---|---|
| Menu | Fixo, ganha fundo ao rolar; link ativo conforme a seção visível |
| Mobile | Menu hamburger em tela cheia, cards em coluna única |
| CTA fixo | Barra de WhatsApp no rodapé do celular, surge após a primeira dobra |
| Botão flutuante | WhatsApp no canto inferior direito (tablet/desktop) |
| Galeria | Masonry + lightbox com teclado (`Esc`, `←`, `→`) |
| Avaliações | Contadores animados de 0 até 5,0 e 4 |
| Mapa | Google Maps incorporado com `loading="lazy"` e filtro escuro |
| Busca | Ver abaixo |
| Animações | Fade/slide por IntersectionObserver, parallax discreto, hover |
| Acessibilidade | Skip link, foco visível, ARIA no menu/busca/lightbox, `alt` em tudo |
| Movimento reduzido | `prefers-reduced-motion` desliga animações e parallax |
| SEO | Title, meta description, Open Graph, Twitter Card, JSON-LD `ExerciseGym` |

### Mecanismo de busca

Busca nos canais oficiais, com autocomplete, resultados instantâneos e estado
vazio. Ignora acentos e maiúsculas e tolera erros de digitação.

- **Instagram** — reconhece: instagram, insta, ig, rede social, redes, fotos,
  perfil, stories, novidades, feed, seguir… (e erros como "instagran")
- **WhatsApp** — reconhece: whatsapp, whats, wpp, zap, contato, falar, mensagem,
  telefone, número, dúvida, atendimento, matrícula… (e erros como "wats")

Navegação por teclado: `↓` `↑` percorrem as sugestões, `Enter` seleciona,
`Esc` fecha.

Para acrescentar termos ou um novo canal, edite o array `CANAIS` em
`assets/js/main.js`.

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

Basta enviar todos os arquivos para a raiz do servidor — é um site estático.
Funciona em qualquer hospedagem (Hostinger, Vercel, Netlify, GitHub Pages,
cPanel).

Checklist final:

- [ ] Logo oficial aplicada (`logo-solfitness.svg` e `favicon.svg`)
- [ ] Cor de destaque ajustada à logo, se necessário
- [ ] Fotos reais no lugar dos placeholders, com `alt` atualizado
- [ ] Aviso `.gallery__note` removido
- [ ] `CONFIG.instagram` preenchido
- [ ] `SEU-DOMINIO.com.br` substituído nos 3 arquivos
- [ ] HTTPS ativo
- [ ] Perfil do Google Empresas apontando para o site
