import { React, useState, useEffect } from "react";
import NavbarManager from '../components_manager/navbarManager';

const Memorials_manager = () => {
    const [memorials, setMemorials] = useState([]);

    useEffect(() => {
        const fetchMemorials = async () => {
            try {
                const response = await fetch("http://localhost:5000/memorials-manager");
                const data = await response.json();
                console.log(data);
                setMemorials(data);
            } catch (error) {
                console.error("Error fetching memorials:", error);
            }
        };
        fetchMemorials();
    }, []);
    console.log(memorials);

    return (
        <div dir="rtl"> 
            <NavbarManager />
            <div style={{ height: "150px" }}></div>
            <div>
          <h1>לוח אזכרות </h1>
          <div>
            <button>הוסף נפטר/ת</button>
          </div>
        </div>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>שם המנוח</th>
                        <th>תאריך עברי</th>
                        <th>תאריך לועזי</th>
                        <th>הערות</th>
                    </tr>
                </thead>
                <tbody>
                    {memorials.map((memorial, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{memorial.deceased_name}</td>
                            <td>{memorial.hebrew_date}</td>
                            <td>{memorial.date}</td>
                            <td>{memorial.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Memorials_manager;
