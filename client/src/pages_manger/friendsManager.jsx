import { React, useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import "../assets/styles/stylePages_manager/friendsManager.css";
const Friends_manager = () => {
  const [members, setMembers] = useState([]);
  console.log(members);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/friends-manager");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <header>
        <NavbarManager />
      </header>

      <div className="friends_manager" dir="rtl">
        <h1>חברים בקהילה</h1>

        {members.map((member,idx) => (  
          <div className="member" key={idx}>
            <img src={member.image} alt={member.name} />    
            <h2>{member.name}</h2>
          </div>
            
        ))}
      </div>
    </div>
  );
};
export default Friends_manager;
