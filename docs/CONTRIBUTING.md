# Contributing to TunyDeal

We welcome contributions from the community! Please follow these guidelines to ensure a smooth development process.

## Branching Strategy

We use a GitFlow-like branching model:

- **`main`**: Represents the production-ready code. All merges to `main` are deployed to production.
- **`staging`**: Represents the development version. All merges to `staging` are deployed to the staging environment for testing.
- **`feature/*`**: For new features. Branched from `staging`. Example: `feature/add-product-reviews`.
- **`fix/*`**: For bug fixes. Branched from `staging`. Example: `fix/checkout-form-validation`.
- **`hotfix/*`**: For urgent production fixes. Branched from `main`.

## Development Workflow

1.  Create a new feature or fix branch from `staging`: `git checkout -b feature/my-new-feature staging`.
2.  Make your changes and commit them using the Conventional Commits format.
3.  Push your branch to the remote repository: `git push origin feature/my-new-feature`.
4.  Create a Pull Request (PR) from your branch to `staging`.
5.  Ensure all automated checks (linting, tests, build) pass.
6.  Request a review from at least one team member.
7.  Once the PR is approved and merged, your changes will be deployed to the staging environment.

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to maintain a clear and automated commit history. Each commit message should be in the format:

`<type>(<scope>): <subject>`

- **type**: `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test`.
- **scope** (optional): The part of the codebase you are changing (e.g., `pdp`, `checkout`, `ci`).
- **subject**: A short, imperative-tense description of the change.

**Example:**
`feat(checkout): add support for gift messages`

## Pull Request (PR) Process

- Use the provided PR template.
- Clearly describe the changes and the problem they solve.
- Include screenshots or GIFs for any UI changes.
- Ensure your PR is linked to the relevant issue.

## Code Style

- We use ESLint and Prettier to enforce code style.
- Run `yarn lint` and `yarn format` before committing your changes.
- Husky pre-commit hooks are configured to run these checks automatically.
