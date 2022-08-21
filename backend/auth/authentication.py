from fastapi import APIRouter, HTTPException, status
from fastapi.param_functions import Depends
from sqlalchemy.orm.session import Session
from database import get_db
from schemas import GetUser
import table_define
from auth import oauth2
from crud import get_user_table
from hashing import Hash


router = APIRouter(tags=["authentication"])


@router.post("/getuser")
def get_token(request: GetUser, db: Session = Depends(get_db)):
    user = (
        db.query(table_define.DbUser)
        .filter(table_define.DbUser.userid == request.username)
        .first()
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials"
        )
    if not Hash.verify(user.password, request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect password"
        )
    get_user_table(user.userid)
    access_token = oauth2.create_access_token(
        data={"sub": user.name, "pas": request.password}
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "username": user.name,
    }
