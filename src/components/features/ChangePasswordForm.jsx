// Change Password Form 
import { useState } from "react";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");

  const updatePassword = async () => {
    await userService.updatePassword(password);
    alert("Password updated!");
  };

  return (
    <div className="max-w-md">
      <h2 className="font-semibold mb-3">Change Password</h2>
      <input type="password" placeholder="New Password" className="border p-3 rounded w-100 mb-3" onChange={e => setPassword(e.target.value)}/>
      <button onClick={updatePassword} className="bg-purple-600 text-white px-5 py-2 rounded">
        Update
      </button>
    </div>
  );
}
