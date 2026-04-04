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