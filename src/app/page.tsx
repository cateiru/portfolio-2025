import { Terminal } from "@/components/Terminal"
import type { ProfileData } from "@/types/profile"

const profileData: ProfileData = {
  name: "cateiru",
  birthday: "2000年10月1日",
  affiliation: "株式会社はてな",
  blogUrl: "https://blog.cateiru.com",
  xUrl: "https://x.com/cateiru",
}

export default function Home() {
  return (
    <div>
      <Terminal profile={profileData} />
    </div>
  )
}
