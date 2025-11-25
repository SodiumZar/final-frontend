// Profile Page Component
import UserStats from "../components/features/UserStats";
import ChangePasswordForm from "../components/features/ChangePasswordForm";

export default function ProfilePage() {
  return (
    <>
    <div className="px-25 pb-6 pt-10 gap-6">
        <div className="py-10 space-y-10 flex gap-6">
            <img className="rounded-full w-32 h-32 mt-7" src="Ellipse 14.png"/>
            <div className="mt-7">
                <h1 className="text-3xl font-bold">Mataheru, Clio Marco</h1>
                <div className="mt-4">
                    <div className="bg-purple-600 text-white font-semibold w-40 px-4 py-2 rounded-full text-center">Student</div>
                </div>
                <div className="text-purple-800 mt-3 text-sm font-medium opacity-50">Member Since 2025</div>
            </div>
            <button className="font-semibold ml-auto bg-red-600 text-white px-5 rounded-full h-10 mt-7 flex items-center gap-2">
                <img src="Vector.svg" alt="icon" className="w-6 h-6"/>
                Log Out
            </button>
        </div>
        <p className="text-gray-500 text-sm font-medium opacity-50">Email</p>
        <div className="bg-gray-50 mt-1 rounded-full px-4 mb-10 flex items-center h-12 gap-3 w-85 shadow-sm">
            <img src="Vector-3.svg" alt="icon" className="w-6 h-6"/>
            <p className="text-gray-600">clio.mataheru@example.com</p>
        </div>
        <p className="text-gray-500 text-sm font-medium opacity-50">Phone Number</p>
        <div className="bg-gray-50 mt-1 rounded-full px-4 mb-10 flex items-center h-12 gap-3 w-85 shadow-sm">
            <img src="Vector-1.svg" alt="icon" className="w-6 h-6"/>
            <p className="text-gray-600">+62-812-xxx-xxxx</p>
        </div>
        <ChangePasswordForm />
        <div className="mt-10">
        <h1 className="mt-10 text-xl font-semibold mb-4">Statistic</h1>
        <UserStats />
    </div>
        
    </div>
    
    </>
  );
}