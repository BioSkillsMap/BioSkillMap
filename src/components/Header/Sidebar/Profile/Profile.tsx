import profile__style from './profile.module.css';

const Profile = () => {
  return (
      <div className={profile__style.container}>
        <div className={profile__style.profile_photo}></div>
        <div className={profile__style.profile_info}>
          <div>Numele Utilizatorului</div>
          <button className={profile__style.option}>Profilul tău</button>
        </div>
      </div>
  )
}

export default Profile