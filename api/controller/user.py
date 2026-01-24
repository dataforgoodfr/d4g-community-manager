from fastapi import APIRouter

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.get("/")
def list_users():
    return [{"user": "Alice"}, {"user": "Bob"}]

@router.get("/{id}")
def get_user(id: int):
    return {"id": id, "name": "Alice"}