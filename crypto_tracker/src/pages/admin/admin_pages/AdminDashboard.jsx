import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  userDelete,
  userInsert,
  userList,
  userUpdate,
} from "../admin_utils/UserApi";
import MessageBox from "../../../components/MessageBox";
import {
  onUserDelete,
  onUserRegisteration,
  onUserUpdate,
  TopCards,
} from "../admin_utils/adminHelpers";
import AdminHeader from "../admin_components/AdminHeader";
import DashboardTopCards from "../admin_components/DashboardTopCards";
import DashboardUserCrudModals from "../admin_components/DashboardUserCrudModals";

export default function AdminHomeUI() {
  const [modal, setModal] = useState({ open: false, type: "", data: null });
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    uid: "",
    uFullName: "",
    uEmail: "",
    uPassword: "",
    role: "",
    uStatus: "",
  });

  let [error, setError] = useState({});

  const getData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let [userData, setUserData] = useState([]);
  const cards = TopCards({ userData });

  console.log(userData);
  const loadUsers = () => {
    userList().then((data) => {
      if (data?.status == "1") {
        setUserData(data?.data);
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // you can change

  // SEARCH FILTER
  const filteredUsers = userData.filter(
    (u) =>
      u.uFullName.toLowerCase().includes(search.toLowerCase()) ||
      u.uEmail.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const paginatedUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  // Total Pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  let [message, setMessage] = useState("");
  const openModal = (type, data) => {
    setModal({ open: true, type, data });
    if (type == "insert") {
      setFormData({
        uid: data._id,
        uFullName: "",
        uEmail: "",
        uPassword: "",
        role: "",
        uStatus: "",
      });
    }
    if (type == "edit") {
      setFormData({
        uid: data._id,
        uFullName: data.uFullName,
        uEmail: data.uEmail,
        uPassword: "",
        role: data.role,
        uStatus: data.uStatus,
      });
    }
    if (type == "delete") {
      setFormData({
        uid: data._id,
        uFullName: data.uFullName,
        uEmail: data.uEmail,
        uPassword: "",
        role: data.role,
        uStatus: data.uStatus,
      });
    }
  };

  const closeModal = () => {
    setModal({ open: false, type: "", data: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <AdminHeader />

      {/* TOP CARDS */}
      <DashboardTopCards cards={cards} search={search} setSearc={setSearch} setCurrentPage={setCurrentPage} openModal={openModal} paginatedUsers={paginatedUsers} currentPage={currentPage} itemsPerPage={itemsPerPage} totalPages={totalPages}/>

      {/* MODAL OVERLAY */}
      <DashboardUserCrudModals
        modal={modal}
        onUserRegisteration={onUserRegisteration}
        onUserUpdate={onUserUpdate}
        onUserDelete={onUserDelete}
        getData={getData}
        formData={formData}
        setError={setError}
        error={error}
        setMessage={setMessage}
        message={message}
        userInsert={userInsert}
        userUpdate={userUpdate}
        userDelete={userDelete}
        loadUsers={loadUsers}
        closeModal={closeModal}
        show={show}
        setShow={setShow}
        MessageBox={MessageBox}
      />
 
    </div>
  );
}
