function CssText(props) {
  const { primary, accent1, accent2, white, light, dark } = props.colourSet;

  // If the value of "dark" colour is greater than "white" colour, it means the colours have been swapped and we're in dark mode:
  const darkMode = parseInt(dark.slice(1), 16) > parseInt(white.slice(1), 16);

  const linkStyles = accent1.pairs.includes(white)
    ? accent1.colour
    : accent2.pairs.length > 0 && accent2.pairs.includes(white)
    ? accent2.colour
    : primary.pairs.includes(white)
    ? primary.colour
    : dark;

  const text = `:root {
        --Paintr-primary: ${primary.colour};
        --Paintr-primary-text: ${primary.pairs[0]};
        --Paintr-accent1: ${accent1.colour};
        --Paintr-accent1-text: ${accent2.pairs[0]};
        ${
          accent2.colour.length > 0
            ? `--Paintr-accent2: ${accent2.colour};`
            : ""
        }
        ${
          accent2.colour.length > 0
            ? `--Paintr-accent2-text: ${accent2.pairs[0]};`
            : ""
        }
        --Paintr-background: ${white};
        --Paintr-grey: ${light};
        --Paintr-text: ${dark};
        --Paintr-link: ${linkStyles};
    }
    
    body {
        color: var(--Paintr-text);
        background-color: var(--Paintr-background);
    }
    
    a {
        color: var(--Paintr-link);
        text-decoration: none;
        border-bottom: 1px solid ${
          linkStyles === dark ? "var(--Paintr-link)" : "transparent"
        };
    }
    a:hover,
    a:focus {
        border-color: var(--Paintr-link);
    }
    a:visited {
        color: var(--Paintr-link);
        text-decoration: none;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: var(--Paintr-text);
    }
    
    nav {
        background-color: var(--Paintr-background);
    }
    
    nav a,
    nav a:visited {
        color: var(--Paintr-text);
    }
    
    nav a:hover,
    nav a:focus {
        color: var(--Paintr-accent1);
        border-color: var(--Paintr-accent1);
    }
    
    button,
    input[type="submit"],
    input[type="button"],
    input[type="reset"] {
        color: var(--Paintr-accent1-text);
        background-color: var(--Paintr-accent1);
        border: 1px solid transparent;
    }
    button:hover,
    buttin:focus,
    button:active,
    input[type="submit"]:hover,
    input[type="submit"]:focus,
    input[type="submit"]:active,
    input[type="button"]:hover,
    input[type="button"]:focus,
    input[type="button"]:active,
    input[type="reset"]:hover,
    input[type="button"]:focus,
    input[type="button"]:active {
        border-color: var(--Paintr-accent1-text);
    }
    
    button:disabled,
    button:disabled:hover,
    button:disabled:focus,
    button:disabled:active {
        background-color: lightgrey;
    }
    
    header {
        background-color: var(--Paintr-primary);
    }
    
    header h1,
    header h1 small,
    header h2,
    header h2 small,
    header h3,
    header h4,
    header h5,
    header h6,
    header p,
    header span,
    header article {
        color: var(--Paintr-primary-text);
    }

    article > header,
    aside > header,
    main > header,
    nav > header,
    section > header {
        background-color: inherit;
        }
        
    article > header > *,
    aside > header > *,
    main > header > *,
    nav > header > *,
    section > header > * {
        color: inherit;
    }
    
    ${
      darkMode
        ? ""
        : `section:nth-child(odd) {
            background-color: var(--Paintr-grey);
        }
            
        section:nth-child(event) {
            background-color: var(--Paintr-background);
        }`
    }

    abbr[title] {
    border-bottom-color: var(--Paintr-primary);
    }
    
    blockquote {
    border-left: 5px solid var(--Paintr-accent1);
    }
    
    code,
    pre {
    color: ${darkMode ? "var(--Paintr-background)" : "inherit"};
    background-color: var(--Paintr-grey);
    }
    
    pre code {
    color: inherit;
    background-color: transparent;
    }
    
    hr {
    border-color: var(--Paintr-primary);
    }
    
    mark {
    color: var(--Paintr-primary-text);
    background-color: var(--Paintr-primary);
    }
    
    select,
    textarea,
    input[type="color"],
    input[type="date"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="email"],
    input[type="month"],
    input[type="number"],
    input[type="password"],
    input[type="search"],
    input[type="tel"],
    input[type="text"],
    input[type="time"],
    input[type="url"],
    input[type="week"] {
    color: var(--Paintr-text);
    }
    
    textarea,
    input[type="color"],
    input[type="date"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="email"],
    input[type="month"],
    input[type="number"],
    input[type="password"],
    input[type="search"],
    input[type="tel"],
    input[type="text"],
    input[type="time"],
    input[type="url"],
    input[type="week"] {
    background-color: var(--Paintr-background);
    }
    
    textarea:focus,
    input[type="color"]:focus,
    input[type="date"]:focus,
    input[type="datetime"]:focus,
    input[type="datetime-local"]:focus,
    input[type="email"]:focus,
    input[type="month"]:focus,
    input[type="number"]:focus,
    input[type="password"]:focus,
    input[type="search"]:focus,
    input[type="tel"]:focus,
    input[type="text"]:focus,
    input[type="time"]:focus,
    input[type="url"]:focus,
    input[type="week"]:focus {
    border-color: var(--Paintr-primary);
    outline: 0;
    }
    
    select {
    background-color: var(--Paintr-background);
    }
    
    select:focus,
    input[type="file"]:focus,
    input[type="radio"]:focus,
    input[type="checkbox"]:focus {
    outline: thin dotted var(--Paintr-text);
    outline-offset: -2px;
    }
    
    input[disabled],
    select[disabled],
    textarea[disabled],
    input[readonly],
    select[readonly],
    textarea[readonly] {
    background-color: lightgrey;
    }
    
    input[type="radio"][disabled],
    input[type="checkbox"][disabled],
    input[type="radio"][readonly],
    input[type="checkbox"][readonly] {
    background-color: transparent;
    }
    
    table {
    background-color: transparent;
    }
    
    th,
    td {
    border-top: 1px solid var(--Paintr-${darkMode ? "grey" : "text"});
    }
    tbody {
    border-top: 2px solid var(--Paintr-${darkMode ? "grey" : "text"});
    }
    th,
    td {
    border-left: 1px solid var(--Paintr-${darkMode ? "grey" : "text"});
    }
    tbody tr:nth-child(odd) td,
    tbody tr:nth-child(odd) th {
    color: var(--Paintr-${darkMode ? "background" : "text"});
    background-color: var(--Paintr-${darkMode ? "grey" : "background"});
    }
    tbody tr:hover td,
    tbody tr:hover th {
    color: var(--Paintr-primary-text);
    background-color: var(--Paintr-primary);
    }
    
    footer {
    color: var(--Paintr-${darkMode ? "background" : "text"});
    background-color: var(--Paintr-grey);
    }
    
    article > footer,
    aside > footer,
    main > footer,
    nav > footer,
    section > footer {
    background-color: inherit;
    }`;

  return (
    <textarea
      id="popup-css-text"
      value={text}
      data-clipboard-target="#popup-css-text"
      rows="10"
      readOnly={true}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
    />
  );
}

export default CssText;
