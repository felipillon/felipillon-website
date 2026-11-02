# Backend deployment on Render

Create a Render Blueprint from the repository's `render.yaml`, or create a
Docker web service with these settings:

- Runtime: Docker
- Root directory: `backend`
- Dockerfile path: `./Dockerfile`
- Docker build context: `.`
- Docker command: leave blank to use the Dockerfile's command
- Health check path: `/api/health`

The Docker image installs the Python dependencies and checks that Uvicorn is
available during the build. Set the environment variables described below in
Render. A service still running `yarn` must be switched to Docker, or replaced
with a new Docker web service. Pushing these files alone does not reconfigure a
manually managed Node service.

Alternatively, a native Python web service can use these settings:

- Runtime: Python 3
- Root directory: `backend`
- Build command: `python -m pip install -r requirements.txt`
- Start command: `python -m uvicorn server:app --host 0.0.0.0 --port $PORT`
- Health check path: `/api/health`

The `.python-version` file selects Python 3.11 for the pinned dependencies.
Remove any conflicting `PYTHON_VERSION` environment variable in Render.

Set environment variables using `.env.example` as a reference. `DATABASE_URL`
must use the `postgresql+asyncpg://` scheme. Set `CORS_ORIGINS` to the frontend
origin (comma-separated for multiple origins). Supply email and Manatal settings
for those integrations. Do not commit secret values.

Adding `render.yaml` does not automatically change an existing service unless
it is managed by a synced Blueprint. For a manually configured service, update
the runtime and commands in Render before redeploying.

If the build logs show Yarn instead of pip, the service is still configured to
build Node dependencies. Uvicorn is already listed in `requirements.txt`; the
Python build command installs it.
