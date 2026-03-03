import { redirect } from "react-router"
import { verifyTokenAPI } from "@/apis/auth.api"

export async function tokenProtectedLoader({ params }: any) {
  const token = params.token

  if (!token) {
    return redirect("/failed")
  }

  try {
    // const res = await api.post("/auth/verify-token", { token })
    const res = await verifyTokenAPI(token)
    // return data to the page
    return {
      userId: res.data.userId,
      message: res.data.message,
    }
  } catch (error) {
    return redirect("/failed")
  }
}