import { cryptoHighLightsDelete } from "../../user/user_utils/CryptoApi";

export const validateForm = (formData) => {
  const errors = {};

  if (!formData.uFullName.trim()) {
    errors.uFullName = "Full Name is required";
  } else if (formData.uFullName.trim().length < 3) {
    errors.uFullName = "Full Name must be at least 3 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.uEmail.trim()) {
    errors.uEmail = "Email is required";
  } else if (!emailRegex.test(formData.uEmail)) {
    errors.uEmail = "Enter a valid email address";
  }

  if (formData.uPassword.trim().length > 0 && formData.uPassword.length < 6) {
    errors.uPassword = "Password must be at least 6 characters";
  }  

  return errors;
};

export let onUserUpdate = (e, { setError, formData, userUpdate, setMessage, MessageBox, loadUsers, closeModal }) => {
  e.preventDefault();
  const errors = validateForm(formData);
  setError(errors);
  if (Object.keys(errors).length > 0) return;

  const sendData = { 
    uFullName: formData.uFullName,
    uEmail: formData.uEmail,
    role: formData.role,
    uStatus: formData.uStatus
  };

  if (formData.uPassword.trim() !== "") {
    sendData.uPassword = formData.uPassword;
  }

  userUpdate(sendData, formData.uid)
    .then(data => {
      if (data?.status == "1") {
        setMessage(<MessageBox status={data?.status} message={data?.message} />);
        setTimeout(() => {
          setMessage("");
          loadUsers();
          closeModal();
        }, 500);
      }
    })
    .catch(err => {
      console.log("Error Update:", err);
      setMessage(<MessageBox status={err.status || 500} message={err.data?.message || "Something went wrong"} />);
      setTimeout(() => setMessage(""), 1000);
    });
};

export let onUserRegisteration = (e, { setError, userInsert, formData, setMessage, MessageBox, loadUsers, closeModal }) => {
  e.preventDefault();
  const errors = validateForm(formData);
  setError(errors);
  if (Object.keys(errors).length > 0) return;

  userInsert(formData)
    .then(data => {
      if (data?.status == "1") {
        setMessage(<MessageBox status={data?.status} message={data?.message} />);
        setTimeout(() => {
          setMessage("");
          loadUsers();
          closeModal();
        }, 500);
      }
    })
    .catch(err => {
      console.log("Error Insert:", err);
      setMessage(<MessageBox status={err.status || 500} message={err.data?.message || "Something went wrong"} />);
      setTimeout(() => setMessage(""), 3500);
    });
};

// export let onUserDelete = (id, { userDelete, setMessage, MessageBox, loadUsers, closeModal }) => {
//   userDelete(id)
//     .then(data => {
//       if (data?.status == "1") {
//         setMessage(<MessageBox status={data?.status} message={data?.message} />);
       
//         setTimeout(() => {
//           setMessage("");
//           loadUsers();
//           closeModal();
//         }, 500);
//       }
//     })
//     .catch(err => {
//       console.log("Error Delete:", err);
//       setMessage(<MessageBox status={err.status || 500} message={err.data?.message || "Something went wrong"} />);
//       setTimeout(() => setMessage(""), 3500);
//     });
// };

export let onUserDelete = async (
  id,
  { userDelete, setMessage, MessageBox, loadUsers, closeModal }
) => {
  try {
    const data = await userDelete(id);

    if (data?.status == "1") {

      // Show success message
      setMessage(<MessageBox status={data?.status} message={data?.message} />);

      // DELETE related crypto highlights
      try {
        await cryptoHighLightsDelete(id);
      } catch (err) {
        console.log("cryptoHighLightsDelete Error:", err);
      }

      setTimeout(() => {
        setMessage("");
        loadUsers();
        closeModal();
      }, 500);
    }
  } catch (err) {
    console.log("Error Delete:", err);
    setMessage(
      <MessageBox
        status={err.status || 500}
        message={err.data?.message || "Something went wrong"}
      />
    );
    setTimeout(() => setMessage(""), 3500);
  }
};


export let TopCards = ({userData})=>{
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    
    const totalUsers = userData.filter(u => u.role === "user").length;
    
    const activeUsers = userData.filter(
      u => u.uStatus === "Active" && u.role === "user"
    ).length;
    
    // First day of current month
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Last day of current month
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    // Count new signups this month (ONLY users)
    const newUsersThisMonth = userData.filter(u => {
      const created = new Date(u.createdAt);
      return (
        u.role === "user" &&
        created >= firstDayOfMonth &&
        created <= lastDayOfMonth
      );
    }).length;
    
    const newUsersThisWeek = userData.filter(u => {
      const created = new Date(u.createdAt);
      return (
        u.role === "user" && 
        created >= sevenDaysAgo && 
        created <= now
      );
    }).length;
    
    const activeRate = totalUsers > 0 
      ? Math.round((activeUsers / totalUsers) * 100) 
      : 0;
     
  return {
    totalUsers,
    activeUsers,
    newUsersThisMonth,
    newUsersThisWeek,
    activeRate
  };
}