Obsidian Web Clipper helps you highlight and capture the web in your favorite browser. Anything you save is stored as durable Markdown files that you can read offline, and preserve for the long term.

- **[Download Web Clipper](https://obsidian.md/clipper)**
- **[Documentation](https://help.obsidian.md/web-clipper)**
- **[Troubleshooting](https://help.obsidian.md/web-clipper/troubleshoot)**

## Get started

Install the extension by downloading it from the official directory for your browser:

- **[Chrome Web Store](https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf)** for Chrome, Brave, Arc, Orion, and other Chromium-based browsers.
- **[Firefox Add-Ons](https://addons.mozilla.org/en-US/firefox/addon/web-clipper-obsidian/)** for Firefox and Firefox Mobile.
- **[Safari Extensions](https://apps.apple.com/us/app/obsidian-web-clipper/id6720708363)** for macOS, iOS, and iPadOS.
- **[Edge Add-Ons](https://microsoftedge.microsoft.com/addons/detail/obsidian-web-clipper/eigdjhmgnaaeaonimdklocfekkaanfme)** for Microsoft Edge.

## Use the extension

Documentation is available on the [Obsidian Help site](https://help.obsidian.md/web-clipper), which covers how to use [highlighting](https://help.obsidian.md/web-clipper/highlight), [templates](https://help.obsidian.md/web-clipper/templates), [variables](https://help.obsidian.md/web-clipper/variables), [filters](https://help.obsidian.md/web-clipper/filters), and more.

## Contribute

### Translations

You can help translate Web Clipper into your language. Submit your translation via pull request using the format found in the [/_locales](/src/_locales) folder.

### Features and bug fixes

See the [help wanted](https://github.com/obsidianmd/obsidian-clipper/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) tag for issues where contributions are welcome.

## Roadmap

In no particular order:

- [ ] A separate icon for Web Clipper
- [ ] Translate UI into more languages — help is welcomed
- [ ] Annotate highlights
- [ ] Template directory
- [ ] Template validation
- [ ] Template logic (if/for)
- [x] Save images locally, [added in Obsidian 1.8.0](https://obsidian.md/changelog/2024-12-18-desktop-v1.8.0/)

## Developers

To build the extension:

```
npm run build
```

This will create three directories:
- `dist/` for the Chromium version
- `dist_firefox/` for the Firefox version
- `dist_safari/` for the Safari version

### Install the extension locally

For Chromium browsers, such as Chrome, Brave, Edge, and Arc:

1. Open your browser and navigate to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `dist` directory

For Firefox:

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Navigate to the `dist_firefox` directory and select the `manifest.json` file

### Linting

This project uses ESLint to ensure consistent code quality and indentation. The linting configuration enforces:

- **Indentation**: Tabs (not spaces) for consistent indentation across the codebase
- **TypeScript**: Full TypeScript support with type-aware linting
- **Code Quality**: Unused variables, mixed spaces/tabs, and other common issues

#### Available Commands

- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Automatically fix linting issues where possible
- `npm run lint:check` - Check for linting issues with zero tolerance for warnings (useful for CI/CD)

#### Pre-commit Setup

To ensure code quality before commits, you can set up a pre-commit hook:

1. Install husky: `npm install --save-dev husky`
2. Add to package.json scripts: `"prepare": "husky install"`
3. Create pre-commit hook: `npx husky add .husky/pre-commit "npm run lint:check"`

This will automatically run linting checks before each commit and prevent commits with linting errors.

## Third-party libraries

- [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) for browser compatibility
- [defuddle](https://github.com/kepano/defuddle) for content extraction
- [turndown](https://github.com/mixmark-io/turndown) for HTML to Markdown conversion
- [dayjs](https://github.com/iamkun/dayjs) for date parsing and formatting
- [lz-string](https://github.com/pieroxy/lz-string) to compress templates to reduce storage space
- [lucide](https://github.com/lucide-icons/lucide) for icons
- [mathml-to-latex](https://github.com/asnunes/mathml-to-latex) for MathML to LaTeX conversion
- [dompurify](https://github.com/cure53/DOMPurify) for sanitizing HTML
