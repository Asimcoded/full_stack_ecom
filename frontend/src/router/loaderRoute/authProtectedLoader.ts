import { redirect } from "react-router"

export async function authProtectedLoader() {
    // @ts-ignore
   let user =  localStorage.getItem("userData")
  if (user) {
    return redirect("/")
  }
  return null
}