alias b := build
alias i := install
alias d := dev
alias p := preview
alias sc := spellcheck
alias tc := typecheck
alias l := lint
alias lf := lint-fix
alias ls := lint-styles
alias lsf := lint-styles-fix
alias u := unit
alias uc := unit-cov
alias e := e2e
alias eu := e2e-ui

_default:
  @just --list

_vite-ssg *args:
  @DEBUG=vite-ssg:* pnpm vite-ssg {{args}}

_prettier *args:
  pnpm prettier {{args}} "**/*.{vue,js,cjs,mjs,ts,cts,mts,json5,md}"

_husky-precommit:
  pnpm lint-staged --no-stash

_husky-prepush:
  @just fmt-check
  @just lint
  @just lint-styles
  @just typecheck
  @just spellcheck

# Builds the microsite into `_site` folder.
build:
  @just _vite-ssg build
  cp _site/not-found/index.html _site/404.html
  rm -fr _site/.vite

# Installs microsite dependencies.
install:
  pnpm install
  pnpm cypress install

# Runs local development server.
dev:
  pnpm vite --port 3000

# Runs local build preview server.
preview:
  pnpm vite preview --port 4000

# Spellchecks the entire code-base.
spellcheck:
  pnpm cspell --config=.cspell.json "**/*.{md,js,cjs,mjs,ts,cts,mts,vue}"

# Checks types for any errors.
typecheck:
  pnpm vue-tsc --noEmit

# Optimizes a specific svg asset file.
svgo *args:
  pnpm svgo --config=./.svgo.config.cjs -f {{args}}

# Formats the code-base.
fmt *args:
  @just _prettier --write {{args}}

# Checks for any code style discrepancies.
fmt-check:
  @just _prettier --check

# Lints the code-base.
lint *args:
  pnpm eslint . {{args}}

# Attemps to fix any detected linter issue.
lint-fix *args:
  @just lint --fix {{args}}

# Lints stylesheets.
lint-styles *args:
  pnpm stylelint "**/*.scss" "**/*.vue" {{args}}

# Attemps to fix any detected stylesheet issue.
lint-styles-fix *args:
  @just lint-styles --fix {{args}}

# Runs the unit test suite.
unit *args:
  pnpm vitest run {{args}}

# Runs the unit test suite with coverage.
unit-cov *args:
  @just unit --coverage {{args}}

# Runs end-to-end test suite (headless).
e2e *args:
  pnpm cypress run {{args}}

# Opens end-to-end test suite interactive user interface.
e2e-ui *args:
  pnpm cypress open
