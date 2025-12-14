import { useEffect, useState } from 'react'
import { getUserProfile } from '../services/api'
import './ProfileMenu.css'

function ProfileMenu({ email, onLogout }) {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getUserProfile(email).then(setProfile)
  }, [email])

  const firstLetter = email.charAt(0).toUpperCase()

  return (
    <div className="profile-wrapper">
      <div className="profile-avatar" onClick={() => setOpen(!open)}>
        {firstLetter}
      </div>

      {open && profile && (
        <div className="profile-dropdown">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.isAdmin ? 'Admin' : 'User'}</p>
          <p><strong>Joined:</strong> {new Date(profile.createdAt).toDateString()}</p>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
