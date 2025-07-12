import Image from 'next/image';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'View and manage your profile on Notehub. Update your personal information, account settings, and review your activity.',
  openGraph: {
    title: 'Profile',
    description:
      'View and manage your profile on Notehub. Update your personal information, account settings, and review your activity.',
    url: '',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile - Notehub',
      },
    ],
  },
};

const Profile = async () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a className={css.editProfileButton}>Edit Profile</a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="/no-photo.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
