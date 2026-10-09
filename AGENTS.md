# Repository Guidelines

## Comunicação

Sempre converse com o usuário em português do Brasil (pt-BR), incluindo respostas, perguntas e atualizações de progresso.

## Project Structure & Module Organization

This application uses Laravel 12, Vue 3, TypeScript, Inertia 2, Nuxt UI, and Tailwind CSS 4.

- `app/`: PHP models, controllers, form requests, middleware, resources, and providers.
- `routes/`: web, authentication, settings, and console routes.
- `resources/js/`: Inertia pages, layouts, components, composables, and types; `@/` aliases this directory.
- `resources/css/` and `resources/views/`: styles and the Blade application shell; `public/` contains static assets.
- `database/`: migrations, factories, and seeders.
- `tests/Feature/` and `tests/Unit/`: Pest tests; `.github/workflows/tests.yml` defines CI.

## Build, Test, and Development Commands

Use PHP 8.4 and Node matching `package.json` (e.g., 22.13+).

- `composer setup`: initial bootstrap; installs dependencies, creates `.env`, generates the application key, migrates, and builds assets.
- `composer dev`: runs the Laravel server, queue listener, logs, and Vite together.
- `npm run build`: builds production assets.
- `composer lint`: applies Rector changes, Pint formatting, and ESLint fixes.
- `npm run format`: formats `resources/` with Prettier; `npm run format:check` checks without editing.
- `composer test`: runs PHP type coverage, Pest coverage, formatting checks, Rector dry-run, and PHPStan.
- `vendor/bin/pest tests/Feature/Settings/ProfileUpdateTest.php`: runs a focused test file.

## Coding Style & Naming Conventions

Use four spaces for PHP, following Pint's Laravel preset. Keep strict types and explicit parameter/return types. Vue/TypeScript follows Prettier: two spaces, single quotes, and no semicolons. Use PascalCase classes and Vue filenames (`ProfileController.php`, `UserMenu.vue`), camelCase functions, and `useX` composables (`useTheme.ts`). Prefer form requests for validation; architecture tests restrict the Validator facade and debug helpers. Prettier organizes imports and Tailwind classes.

## Testing Guidelines

Name files `*Test.php`, with descriptive Pest `test()` or `it()` cases. Shared setup uses `RefreshDatabase` and freezes time; tests use in-memory SQLite. Add feature tests for routes, authentication, and validation, and unit tests for isolated logic. The configured gates require exactly 100% code coverage and 100% PHP type coverage. Coverage runs need a driver such as Xdebug.

## Commit & Pull Request Guidelines

History currently contains only `chore: initial commit`. Follow that `type: concise summary` pattern, using appropriate types such as `feat`, `fix`, or `chore`. Keep commits focused. PRs should explain behavior changes, link relevant issues, report validation, and include screenshots for UI changes. Run the asset build and `composer test` before review.

## Security & Configuration

Keep secrets in untracked `.env`; document new settings in `.env.example`. Avoid committing build output. Wayfinder generates `resources/js/actions/`, `resources/js/routes/`, and `resources/js/wayfinder/`; regenerate these through Vite instead of editing them manually.
