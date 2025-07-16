FROM python:3.11-alpine
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
WORKDIR /app
COPY ./pyproject.toml ./uv.lock ./
RUN uv sync --frozen --no-cache
ENV PATH="/app/.venv/bin:$PATH"
COPY ./ ./
EXPOSE 8000
CMD ["fastapi", "run", "app/main.py"]