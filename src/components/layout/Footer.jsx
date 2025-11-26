// Footer Component
export default function Footer() {
  return (
    <>
    <div className="bg-[#6F42C1] py-4 mt-10 h-100 flex justify-between px-50">
        <div className="mt-17">
            <div className="flex items-center">
                <img src="image-removebg-preview (9) 1.png" alt="Logo" className="w-25 h-25 mr-2"/>
                <h1 className="text-white text-4xl font-bold">UK Guard</h1>
            </div>
            <div className="mt-2">
                <p className="text-white w-96">Your safety is our priority. With UK Guard, you can easily report issues, stay informed, and help keep your community secure. Together, we ensure a safer environment for everyone.</p>
            </div>
        </div>
        <div className="mt-23">
            <h2 className="text-white text-2xl font-bold mb-4">Pages</h2>
            <p className="text-white mb-2">Home</p>
            <p className="text-white mb-2">Add Report</p>
            <p className="text-white mb-2">Profile</p>
        </div>
    </div>
    <footer className="bg-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-[#6F42C1]">&copy; {new Date().getFullYear()} UK-Guard. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}