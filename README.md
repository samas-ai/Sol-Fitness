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
        ├── hero.webp             foto do topo (e da seção "A experiência")
        ├── estrutura-1.webp      galeria
        ├── estrutura-3.webp      galeria
        ├── estrutura-4.webp      galeria (única em retrato)
        ├── estrutura-5.webp      galeria
        ├── estrutura-6.webp      galeria
        ├── logo-solfitness.png   logo do site
        ├── favicon.png           ícone (símbolo da logo sobre fundo escuro)
        ├── apple-touch-icon.png  ícone para iOS
        ├── og-image.jpg          imagem de compartilhamento
        │
        ├── solfitness-logo.png        ORIGINAL da logo (1894x830)
        ├── Foto-do-ambiente-hero.png  ORIGINAL da foto do topo
        └── estrutura-N.png            ORIGINAIS das fotos (5 arquivos)
```

Os arquivos marcados como ORIGINAL não são carregados pela página. Ficam no
repositório como fonte, caso seja preciso regerar as versões web em outro
tamanho ou formato. Somam cerca de 9 MB — se preferir mantê-los fora do Git,
é só adicioná-los ao `.gitignore`.

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
  instagram: 'https://www.instagram.com/solfitness.academia/',
  endereco: 'Solfitness Academia, BR-230, 323 - Salgadinho, Patos - PB, 58700-070'
};
```

### Instagram

O perfil oficial está configurado: `@solfitness.academia`. Os dois botões de
Instagram da página (card de contato e rodapé) abrem em nova aba, com
`rel="noopener noreferrer"`.

Se um dia o perfil mudar ou precisar sair do ar, basta deixar o campo vazio
(`''`) — os botões voltam sozinhos ao estado esmaecido, com o texto "Perfil
oficial em breve", sem link quebrado na página.

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

## [3] Fotos

As fotos oficiais da academia estão aplicadas. Nenhuma imagem de terceiros foi
baixada ou reutilizada, e nenhuma foto foi inventada.

### Pipeline

Os arquivos chegaram em PNG (8,7 MB no total) e foram convertidos para **WebP
qualidade 82**, na resolução nativa — sem ampliar, o que só criaria borrão.
Resultado: **616 KB**, uma redução de 93%. O WebP tem suporte universal em
Chrome, Safari e Edge desde 2020.

| Arquivo web       | Origem                      | Dimensões | Peso   |
|-------------------|-----------------------------|-----------|--------|
| `hero.webp`       | `Foto-do-ambiente-hero.png` | 1280×960  | 104 KB |
| `estrutura-1.webp`| `estrutura-1.png`           | 1280×960  | 125 KB |
| `estrutura-3.webp`| `estrutura-3.png`           | 1280×960  | 114 KB |
| `estrutura-4.webp`| `estrutura-4.png`           | 765×1020  |  67 KB |
| `estrutura-5.webp`| `estrutura-5.png`           | 1280×960  |  84 KB |
| `estrutura-6.webp`| `estrutura-6.png`           | 1280×960  | 122 KB |

A numeração segue a dos arquivos que você enviou — não existe `estrutura-2`,
e esse vão foi mantido de propósito para a correspondência ficar óbvia.

Para regerar depois de trocar um original:

```bash
python -c "from PIL import Image; Image.open('assets/img/estrutura-1.png').convert('RGB').save('assets/img/estrutura-1.webp','WEBP',quality=82,method=6)"
```

### Duas observações sobre as fotos

**A seção "A experiência" reaproveita a foto do topo.** Não veio uma foto
dedicada para ela, e é o único quadro em retrato (4:5) fora da galeria. Como a
seção fica bem longe do topo, a repetição quase não se percebe — mas uma foto
própria ali deixaria a página melhor. É o último item visual pendente.

**A foto do topo tem 1280 px de largura.** Cobre bem telas até ~1440 px; em
monitores maiores fica levemente suave, porque é ampliada. O véu escuro
disfarça bastante. Se houver uma versão em resolução maior, vale substituir.

### Textos alternativos

Cada `alt` e cada `data-caption` descreve o que realmente aparece na foto —
área de cardio, corredor de máquinas, peso livre e assim por diante. Ao trocar
qualquer imagem, **atualize também esses textos**, junto com `width`, `height`
e o `data-caption` do lightbox.

A galeria funciona com qualquer quantidade de fotos: para acrescentar ou
remover, duplique ou apague blocos `<figure class="gallery__item">`. O layout
masonry se reorganiza sozinho — hoje, com 5 fotos, a única em retrato ocupa a
coluna central e as três colunas ficam quase da mesma altura.

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
- [x] Fotos reais aplicadas, com `alt` e legendas descritivos
- [ ] Foto dedicada para a seção "A experiência" (hoje repete a do topo)
- [x] `CONFIG.instagram` preenchido
- [ ] `SEU-DOMINIO.com.br` substituído nos 3 arquivos
- [ ] HTTPS ativo
- [ ] Perfil do Google Empresas apontando para o site
