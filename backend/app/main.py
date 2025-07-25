from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.models import User, UserCreate, UserGroup
from app.dependencies import SessionDep, InitDep
from app.utils import get_password_hash
from app.routers import users, messages


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/init", status_code=204, tags=["init"])
def init(session: SessionDep, init: InitDep, user_create: UserCreate) -> None:
    if init:
        raise HTTPException(status_code=400, detail="Application has been initialized")

    admin_user = User(
        name=user_create.name,
        hashed_password=get_password_hash(user_create.password),
        user_group=UserGroup.ADMIN,
    )
    session.add(admin_user)
    session.commit()


app.include_router(users.router)
app.include_router(messages.router)
