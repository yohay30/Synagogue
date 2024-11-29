router.post("/add", (req, res) => {
  console.log("req.body -", req.body);

  const {
    first_name,
    last_name,
    phone,
    email,
    address,
    password,
    is_admin,
    id_number,
    chair_number,
  } = req.body;

  // בדוק אם כל השדות הנדרשים קיימים
  if (!first_name || !last_name || !phone || !email || !id_number) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO community_members2 
    (first_name, last_name, phone, email, address, password, is_admin, id_number, chair_number) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    first_name,
    last_name,
    phone,
    email,
    address || null, // אם אין כתובת, הכנס null
    password,
    is_admin ? 1 : 0, // ודא שהשדה is_admin הוא 0 או 1
    id_number,
    chair_number || null, // אם אין מספר כיסא, הכנס null
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error adding member" });
    }

    console.log("Member added successfully:", result);
    res.status(201).json({
      id: result.insertId,
      first_name,
      last_name,
      message: "Member added successfully",
    });
  });
});
