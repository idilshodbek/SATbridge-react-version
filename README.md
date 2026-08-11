# SATbridge

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Layout

```
src/
  main.jsx          entry point
  App.jsx           shell: sidebar + screen switch + overlays, and DEFAULT_SETTINGS
  useModel.js       all app state and every derived value the screens read
  data.js           the prototype's content (units, questions, mocks, vocabulary, …)
  theme.jsx         accent-colour + dark-mode translation, exposed as useTheme()
  GlobalStyles.jsx  base stylesheet, keyframes, and the hover/active rules
  pseudoStyles.js   generated hover/active/focus CSS
  components/       Sidebar, ThemePicker, Celebration
  screens/          19 screens, one file each
```