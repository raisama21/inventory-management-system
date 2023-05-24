export default function Profile() {
  return (
    <section className="w-full">
      <div className="max-w-[480px] mx-auto mt-8 mb-12">
        <div className="mb-12 py-8 px-6 border border-b-black/10 shadow-2xl rounded-2xl">
          <h2 className="mb-6">Profile</h2>

          <form>
            <div className="flex gap-6 mb-4">
              <div>
                <label htmlFor="firstName" className="profile-label">
                  First name
                </label>
                <input type="text" id="firstName" className="input-style" />
              </div>

              <div>
                <label htmlFor="lastName" className="profile-label">
                  Last name
                </label>
                <input type="text" id="lastName" className="input-style" />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="profile-label">
                User name
              </label>
              <input type="text" id="username" className="input-style" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="profile-label">
                Email
              </label>
              <input type="text" id="email" className="input-style" />
            </div>

            <div className="mb-8">
              <label htmlFor="phoneNumber" className="profile-label">
                Phone number
              </label>
              <input type="text" id="phoneNumber" className="input-style" />
            </div>

            <button className="w-full py-2 px-4 bg-green-800 text-white font-medium text-sm rounded-lg">
              Edit Profile
            </button>
          </form>
        </div>

        <div className="py-8 px-6 border border-b-black/10 shadow-2xl rounded-2xl">
          <h2>Delete Account</h2>

          <p className="my-4 font-medium text-sm">
            You will lose access to your IVNM's account once your deletion
            request has been submitted.
          </p>

          <button className="py-2 px-4 bg-red-600 text-white font-medium text-sm rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}
