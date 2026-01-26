from supabase import create_client
from app.config import SUPABASE_KEY, SUPABASE_URL

print(SUPABASE_KEY)

supabase = create_client(str(SUPABASE_URL),supabase_key=str(SUPABASE_KEY))

def fetch_crisis_by_id(crisis_id: str):
    response = (
        supabase
        .table("incidents")
        .select("*")
        .eq("id", crisis_id)
        .single()
        .execute()
    )
    print("supabase ",response.data)
    return response.data