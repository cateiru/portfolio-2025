import { ProfileData } from '@/types/profile'

interface ProfileCardProps {
  profile: ProfileData
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-subtitle">ポートフォリオ</p>
      </div>
      
      <div className="profile-info">
        <div className="info-item">
          <span className="info-label">誕生日</span>
          <span className="info-value">{profile.birthday}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">所属</span>
          <span className="info-value">{profile.affiliation}</span>
        </div>
      </div>
    </div>
  )
}