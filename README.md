# MemoApp — Token‑gated memo manager

A lightweight memo manager built with React + TypeScript, TailwindCSS, and DaisyUI. Users authenticate with an access token and can browse categories, fetch memos, create a new memo, edit memo details, and delete memos — all via a simple drawer UI.

### Tech stack

- React 19 + TypeScript (CRA)
- TailwindCSS + DaisyUI for styling
- Context API for state (auth, drawer, memo)
- Fetch-based API layer with a typed `request` helper
- Testing Library (preconfigured)

### Quick start

- **Install**:
  - `cd memoapp && npm install`
- **Run dev server**:
  - `npm start` → `http://localhost:3000`
- **Build**:
  - `npm run build`
- **Tests**:
  - `npm test`

### Authentication

- Enter your access token in the navbar input and click LOGIN.
- The token must be a valid UUID v4. Basic client-side validation is enforced in `auth-context`.
- On success, categories are loaded and listed in the drawer.

### Features

- **Login with token**: Loads user categories from the API.
- **Browse categories**: Expand a category to fetch its memos.
- **Select memo**: Loads full memo details into an editor pane.
- **Create memo**: Click NEW in the drawer to add a blank memo to the current category.
- **Edit memo**: Update title/content and SAVE.
- **Delete memo**: Remove the current memo with DELETE.
- **Error UX**: API and validation errors are surfaced with user-friendly messages.

### API

- Endpoints used:
  - `GET /category` (requires header `X-ACCESS-TOKEN`) — loads categories on login.
  - `GET /memo?category_id={id}` — fetch memos for a category.
  - `GET /memo/{id}` — fetch memo details.
  - `POST /memo` — create memo `{ category_id, title, content }`.
  - `PUT /memo/{id}` — update memo `{ category_id, title, content }`.
  - `DELETE /memo/{id}` — delete memo.

Headers typically include:
- `Content-Type: application/json`
- `X-ACCESS-TOKEN: <uuid-v4>`

All requests go through:
- `src/utils/request-helper.ts` — adds sensible defaults, parses JSON, and throws typed `ApiError` on non‑2xx.

### Project structure

- `src/App.tsx`: Composes providers and renders the drawer layout.
- `src/context/`
  - `auth-context.tsx`: Token, auth state, simple UUID v4 validation.
  - `memo-context.tsx`: Categories, current category, selected memo, memo list.
  - `drawer-context.tsx`: Drawer open/close state.
- `src/components/`
  - `common/`
    - `drawer.tsx`: Shell layout with navbar and main content.
    - `drawer-side.tsx`: Category list, NEW memo action.
    - `ErrorBoundary.tsx`: Catches render errors.
  - `features/login/`
    - `login-form.tsx`, `login-input.tsx`: Token form and login flow.
  - `features/memo/`
    - `memo-details.tsx`, `memo-edit-form.tsx`, `memo-item.tsx`: Memo view/edit and list item.
  - `features/category/`
    - `category-item.tsx`: Expand/collapse and memo fetching per category.
- `src/services/api/`
  - `login-service.ts`: `GET /category`
  - `memo-service.ts`: CRUD for memos
- `src/utils/`
  - `request-helper.ts`: Robust fetch wrapper.
  - `error.ts`: Maps errors to user-facing messages; timed dismissal helper.
  - `update-category-memos.ts`: Fetch and inject memos into a category.
  - `update-memo-state.ts`: Client-side state updates for ADD/UPDATE/DELETE.

### Styling

- Tailwind and DaisyUI configured via `tailwind.config.js` and `postcss.config.js`.
- Components use utility classes; themes available via DaisyUI.

### Local development tips

- Ensure a valid UUID v4 token for login; invalid tokens disable the LOGIN button or show inline errors.
- Categories fetch on successful login; memos fetch lazily per expanded category.
- After memo operations (add/edit/delete), state is updated immutably via `update-memo-state`.

### Scripts (package.json)

- `start`: CRA dev server
- `build`: Production build
- `test`: Jest + Testing Library
- `eject`: CRA eject (one-way)

### Requirements

- Node 16+ recommended
- Internet access to reach the challenge API

### Troubleshooting

- Seeing “Invalid access token”? Confirm your UUID v4 format.
- 401/403 responses: token missing or invalid.
- 404 editing/deleting: memo may not exist; refresh categories.
- 500 errors: transient server issues; try again later.
