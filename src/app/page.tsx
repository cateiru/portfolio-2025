import { Terminal } from "@/components/Terminal"
import type { ProfileData } from "@/types/profile"

const profileData: ProfileData = {
  name: "cateiru",
  birthday: "2000年10月1日",
  affiliation: "株式会社はてな",
  blogUrl: "https://blog.cateiru.com",
  xUrl: "https://x.com/cateiru",
  githubUrl: "https://github.com/cateiru",
  connpassUrl: "https://connpass.com/user/cateiru/",
  linkedinUrl: "https://www.linkedin.com/in/cateiru",
  nintendoUrl: "https://lounge.nintendo.com/friendcode/4296-8596-2984/C0qZ7TM6Rk",
  steamUrl: "https://steamcommunity.com/id/cateiru/",
  gitlabUrl: "https://gitlab.com/cateiru",
  niconicoUrl: "https://www.nicovideo.jp/user/56247011",
  mixi2Url: "https://mixi.social/@cateiru",
  misskeyUrl: "https://misskey.io/@cateiru",
  blueskyUrl: "https://cateiru.com/#:~:text=Misskey.io-,bsky.social,-mstdn.jp",
  mastodonUrl: "https://mstdn.jp/@cateiru",
  annictUrl: "https://annict.com/@cateiru",
}

export default function Home() {
  return (
    <div>
      <Terminal profile={profileData} />
    </div>
  )
}
