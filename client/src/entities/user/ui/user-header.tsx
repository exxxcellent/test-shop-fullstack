import { useAuthStore } from '@store/useAuthStore';
import userProfile from '@icons/user.svg';

export default function UserHeader() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="px-5 py-3 rounded-[20px] bg-white flex items-center gap-5">
            <img src={userProfile} />
            <div className="text-xl text-text-secondary word-wrap">
                {user ? user.email : 'none'}
            </div>
        </div>
    );
}
