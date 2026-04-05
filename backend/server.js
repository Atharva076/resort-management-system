const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/bookings', (req, res) => {
  db.query('SELECT * FROM bookings', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/bookings', (req, res) => {
  const { guestName, roomNumber, checkIn, checkOut } = req.body;

  const sql = `
    INSERT INTO bookings (guest_name, room_number, check_in, check_out)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [guestName, roomNumber, checkIn, checkOut],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ message: 'Booking added successfully' });
      }
    }
  );
});

app.put('/bookings/:id', (req, res) => {
  const bookingId = req.params.id;
  const { guestName, roomNumber, checkIn, checkOut } = req.body;

  const sql = `
    UPDATE bookings
    SET guest_name = ?, room_number = ?, check_in = ?, check_out = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [guestName, roomNumber, checkIn, checkOut, bookingId],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ message: 'Booking updated successfully' });
      }
    }
  );
});

app.delete('/bookings/:id', (req, res) => {
  const bookingId = req.params.id;

  db.query(
    'DELETE FROM bookings WHERE id = ?',
    [bookingId],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ message: 'Booking deleted successfully' });
      }
    }
  );
});

app.get('/rooms', (req, res) => {
  db.query('SELECT * FROM rooms', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

app.get('/guests', (req, res) => {
  db.query('SELECT * FROM guests', (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/guests', (req, res) => {
  const { full_name, age, guest_id, address, email } = req.body;

  const sql = `
    INSERT INTO guests (full_name, age, guest_id, address, email)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [full_name, age, guest_id, address, email], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: 'Guest added successfully' });
    }
  });
});

app.get('/payments', (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/payments', (req, res) => {
  const { booking_id, amount, method, status } = req.body;

  const sql = `
    INSERT INTO payments (booking_id, amount, method, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [booking_id, amount, method, status], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: 'Payment added successfully' });
    }
  });
});

app.get('/staff', (req, res) => {
  db.query('SELECT * FROM staff', (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/staff', (req, res) => {
  const { full_name, department, shift_time } = req.body;

  const sql = `
    INSERT INTO staff (full_name, department, shift_time)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [full_name, department, shift_time], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: 'Staff added successfully' });
    }
  });
});

app.get('/reviews', (req, res) => {
  db.query('SELECT * FROM reviews', (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/reviews', (req, res) => {
  const { user_id, room_id, rating, comment } = req.body;

  const sql = `
    INSERT INTO reviews (user_id, room_id, rating, comment)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [user_id, room_id, rating, comment], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: 'Review added successfully' });
    }
  });
});