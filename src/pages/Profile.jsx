import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const u = data.find((u) => u.id === Number(userId));
        setUser(u);
      });
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <button onClick={() => navigate("/")} className="back-btn">← Welcome, {user.name}</button>
      <div className="profile-card">
        <div className="avatar">
          <div className="circle">{user.name.split(" ").map(n => n[0]).join("")}</div>
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="grid">
  <div className="grid-item">
    <label>User ID</label>
    <div className="value-box">{user.id}</div>
  </div>
  <div className="grid-item">
    <label>Name</label>
    <div className="value-box">{user.name}</div>
  </div>
  <div className="grid-item">
    <label>Email ID</label>
    <div className="value-box">{user.email}</div>
  </div>
  <div className="grid-item">
    <label>Address</label>
    <div className="value-box">{user.address?.street}</div>
  </div>
  <div className="grid-item">
    <label>Phone</label>
    <div className="value-box">{user.phone}</div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Profile;
