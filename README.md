# Button presses

An extremely simple full-stack app: press a button, and it counts how many times it's been pressed each day. Shows today's count and the date with the most presses ever.

## Structure

```
backend/    Express API + SQLite via Sequelize, table: presses(date PK, count)
frontend/   React + Vite
package.json  root scripts that run both together
```

## Development

Install dependencies once (root, backend, and frontend each have their own `package.json`):

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

Then start both the backend and frontend dev servers together:

```bash
npm run dev
```

- Backend runs on http://localhost:3001
- Frontend runs on http://localhost:5173 and proxies `/api` requests to the backend

## Production

Build the frontend and start the backend, which then serves the built frontend, the API, and everything from a single port:

```bash
npm run build
npm start
```

- App available on http://localhost:3001 (or `PORT` env var)

## API

- `GET /api/stats` — returns `{ today: { date, count }, max: { date, count } }`
- `POST /api/press` — increments today's count, returns the updated stats

## Deploying the app to the OKD cluster

Assumes that

- you are already logged in with the `oc` command line tool to the correct OKD cluster and the correct project (`oc project <namespace>`).
- the project has been pushed successfully to GitHub and a Docker image has been built from it, and that image is public. Verify this on GitHub, on the repository's Packages tab (Package settings → Change visibility → Public).

Before the first deployment to the cluster, edit the following parts of `kustomization.yaml` to match your own project:

- `namespace` — the OKD project the app is deployed to.
- `images.newName` — the address of your own Docker image, which the GitHub Actions workflow pushes the built image to. GitHub Actions generates the repository name automatically, so the address is of the form `ghcr.io/<username>/<repo-name>`.
- the `value` of the Route patch under `patches` — the app's public address. This must be unique across the whole cluster, and of the form `route-<project>.ext.okd-cs-test-0.k8s.cs.helsinki.fi`.

This app has no secrets, so unlike a typical boilerplate there's no `secret.env` step to set up.

The app is deployed (or updated) on the cluster with [Kustomize](https://kustomize.io/) using the command:

```sh
oc apply -k .
```

The command creates/updates all the Kubernetes resources defined in `kustomization.yaml` on the OKD cluster.

If everything goes well, the app starts at http://route-\<project\>.ext.okd-cs-test-0.k8s.cs.helsinki.fi
