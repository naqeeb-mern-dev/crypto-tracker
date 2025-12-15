import React from "react";

export default function DashboardUserCrudModals({
  modal,
  onUserRegisteration,
  onUserUpdate,
  onUserDelete,
  getData,
  formData,
  setError,
  error,
  setMessage,
  message,
  userInsert,
  userUpdate,
  userDelete,
  loadUsers,
  closeModal,
  show,
  setShow,
  MessageBox,
}) {
  return (
    <>
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 capitalize">
              {modal.type} User
            </h2>

            {/* VIEW DATA */}
            {modal.type === "view" && (
              <div className="text-gray-700 space-y-2">
                <p>
                  <strong>Name:</strong> {modal.data.uFullName}
                </p>
                <p>
                  <strong>Email:</strong> {modal.data.uEmail}
                </p>
                <p>
                  <strong>Role:</strong> {modal.data.role}
                </p>
                <p>
                  <strong>Status:</strong> {modal.data.uStatus}
                </p>
                <p>
                  <strong>Joined:</strong>{" "}
                  {new Date(modal.data.createdAt).toLocaleString()}
                </p>
              </div>
            )}

            {/* INSERT DATA FORM */}
            {modal.type === "insert" && (
              <form
                className="space-y-4"
                onSubmit={(e) =>
                  onUserRegisteration(e, {
                    setError,
                    userInsert,
                    formData,
                    setMessage,
                    MessageBox,
                    loadUsers,
                    closeModal,
                  })
                }
              >
                <input
                  autoComplete="new-name"
                  onChange={getData}
                  required
                  name="uFullName"
                  type="text"
                  value={formData.uFullName}
                  placeholder="Full Name"
                  className="w-full border p-2 rounded"
                />
                {error.uFullName && (
                  <p className="text-red-500 text-sm mt-1">{error.uFullName}</p>
                )}

                <input
                  autoComplete="new-email"
                  onChange={getData}
                  required
                  name="uEmail"
                  type="email"
                  value={formData.uEmail}
                  placeholder="Your Email Address"
                  className="w-full border p-2 rounded"
                />
                {error.uEmail && (
                  <p className="text-red-500 text-sm mt-1">{error.uEmail}</p>
                )}

                <input
                  autoComplete="new-password"
                  onChange={getData}
                  required
                  name="uPassword"
                  type="password"
                  value={formData.uPassword}
                  placeholder="Your Password"
                  className="w-full border p-2 rounded"
                />
                {error.uPassword && (
                  <p className="text-red-500 text-sm mt-1">{error.uPassword}</p>
                )}

                <select
                  autoComplete="new-role"
                  onChange={getData}
                  required
                  name="role"
                  value={formData.role}
                  className="w-full border p-2 rounded"
                >
                  <option>Select Option</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <select
                  autoComplete="new-status"
                  onChange={getData}
                  required
                  name="uStatus"
                  value={formData.uStatus}
                  className="w-full border p-2 rounded"
                >
                  <option>Select Option</option>
                  <option value="Active">Active</option>
                  <option value="InActive">In Active</option>
                </select>

                <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                  Register User
                </button>
                {message}
              </form>
            )}

            {/* EDIT FORM */}
            {modal.type === "edit" && (
              <form
                className="space-y-4"
                onSubmit={(e) =>
                  onUserUpdate(e, {
                    setError,
                    formData,
                    userUpdate,
                    setMessage,
                    MessageBox,
                    loadUsers,
                    closeModal,
                  })
                }
              >
                <input
                  onChange={getData}
                  required
                  name="uFullName"
                  type="text"
                  value={formData.uFullName}
                  placeholder="Full Name"
                  className="w-full border p-2 rounded"
                />
                {error.uFullName && (
                  <p className="text-red-500 text-sm mt-1">{error.uFullName}</p>
                )}

                <input
                  onChange={getData}
                  required
                  name="uEmail"
                  type="email"
                  value={formData.uEmail}
                  placeholder="Your Email Address"
                  className="w-full border p-2 rounded"
                />
                {error.uEmail && (
                  <p className="text-red-500 text-sm mt-1">{error.uEmail}</p>
                )}

                <div className="relative w-full">
                  <input
                    autoComplete="new-password"
                    onChange={getData}
                    name="uPassword"
                    type={show ? "text" : "password"}
                    value={formData.uPassword || ""}
                    placeholder="Enter new password (optional)"
                    className="w-full border p-2 pr-10 rounded"
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {show ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.065 7.03 19 12 19c1.592 0 3.105-.293 4.49-.832M6.228 6.228A10.45 10.45 0 0112 5c4.97 0 8.773 2.935 10.065 7a10.528 10.528 0 01-4.293 5.262M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.879 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {error.uPassword && (
                  <p className="text-red-500 text-sm mt-1">{error.uPassword}</p>
                )}

                <select
                  onChange={getData}
                  required
                  name="role"
                  value={formData.role}
                  className="w-full border p-2 rounded"
                >
                  <option>Select Option</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <select
                  onChange={getData}
                  required
                  name="uStatus"
                  value={formData.uStatus}
                  className="w-full border p-2 rounded"
                >
                  <option>Select Option</option>
                  <option value="Active">Active</option>
                  <option value="InActive">In Active</option>
                </select>

                <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                  Update User
                </button>
                {message}
              </form>
            )}

            {/* DELETE CONFIRMATION */}
            {modal.type === "delete" && (
              <>
                <div className="text-gray-700">
                  Are you sure you want to delete{" "}
                  <strong>{modal.data.uFullName}</strong>?
                </div>
                <button
                  onClick={() =>
                    onUserDelete(modal.data._id, {
                      userDelete,
                      setMessage,
                      MessageBox,
                      loadUsers,
                      closeModal,
                    })
                  }
                  className="mt-5 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  Delete
                </button>
                <button
                  onClick={closeModal}
                  className="mt-4 w-full border py-2 rounded hover:bg-gray-100"
                >
                  Close
                </button>
                {message}
              </>
            )}

            {/* CLOSE BUTTON */}
            {modal.type !== "delete" && (
              <button
                onClick={closeModal}
                className="mt-4 w-full border py-2 rounded hover:bg-gray-100"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
