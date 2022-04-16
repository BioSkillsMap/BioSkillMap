import profile__style from './profile.module.css';

const Profile = () => {
  return (
      <div className={profile__style.container}>
        <div className={profile__style.profile_photo}></div>
        <div className={profile__style.profile_info}>
          <div>Username</div>
          <button className={profile__style.option}>Your Profile</button>
        </div>
      </div>
  )
}

export default Profile