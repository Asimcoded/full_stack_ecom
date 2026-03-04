import { redirect } from "react-router"
export async function roleProtectedLoader() {
    // @ts-ignore
   let userDate=  JSON.parse(localStorage.getItem("userData"))
   
  if (userDate[0].role == "admin" || userDate[0].role == "superadmin") {
    return null
  }
  return redirect("/")
} 