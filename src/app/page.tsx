import { Terminal } from '@/components/Terminal'
import { ProfileData } from '@/types/profile'

const profileData: ProfileData = {
  name: 'cateiru',
  birthday: '2004年1月1日',
  affiliation: '大学生',
  blogUrl: 'https://blog.cateiru.com',
  xUrl: 'https://x.com/cateiru'
}

export default function Home() {
  return (
    <div>
      <Terminal profile={profileData} />
    </div>
  )
}
