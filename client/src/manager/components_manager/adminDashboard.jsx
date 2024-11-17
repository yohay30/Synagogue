import React from 'react';
import NavbarManager from './navbarManager';
import '../../assets/styles/styleManager/styleComponents_manager/adminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header>
      <NavbarManager />
      </header>
      <div className="content">
        
          <h1>שלום, מנהל לוח בית הכנסת</h1>
        
        <main>
          <h2> קיצורים</h2>
          <div className="quick-actions">
            <button>הוסף תפילה</button>
            <button>הוסף שיעור</button>
            <button>הוסף אירוע</button>
            <button>הוסף חבר</button>
          </div>
          <section className="schedule">
            <h3>לוח זמנים</h3>
            {/* כאן תופיע רשימת התפילות והשיעורים */}
          </section>
          <section className="announcements">
            <h3>הודעות קריטיות</h3>
            {/* הודעות חשובות למנהל */}
          </section>
        </main>
      </div>
    </div>
  );
}
export default AdminDashboard;