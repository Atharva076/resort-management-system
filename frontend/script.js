const bookingForm = document.getElementById('bookingForm');
const bookingTableBody = document.getElementById('bookingTableBody');
const searchBooking = document.getElementById('searchBooking');

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const guestName = document.getElementById('guestName').value.trim();
const roomNumber = document.getElementById('roomNumber').value;
const checkIn = document.getElementById('checkIn').value;
const checkOut = document.getElementById('checkOut').value;

if (!guestName || !roomNumber || !checkIn || !checkOut) {
  alert('Please fill all fields');
  return;
}

if (new Date(checkOut) < new Date(checkIn)) {
  alert('Check-out date cannot be before check-in date');
  return;
}

const bookingData = {
  guestName,
  roomNumber,
  checkIn,
  checkOut
};

        try {
            await fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            bookingForm.reset();
            loadBookings();
        } catch (error) {
            console.log('Error adding booking:', error);
        }
    });
}

async function loadBookings() {
    try {
        const response = await fetch('http://localhost:5000/bookings');
        const bookings = await response.json();

        if (bookingTableBody) {
            bookingTableBody.innerHTML = '';

            const filteredBookings = bookings.filter((booking) => {
                if (!searchBooking) return true;

                return booking.guest_name
                    .toLowerCase()
                    .includes(searchBooking.value.toLowerCase());
            });

            filteredBookings.forEach((booking) => {
                bookingTableBody.innerHTML += `
          <tr>
            <td>${booking.id}</td>
            <td>${booking.guest_name}</td>
            <td>${booking.room_number}</td>
            <td>${booking.check_in}</td>
            <td>${booking.check_out}</td>
            <td>
            <span class="booking-status confirmed">Confirmed</span>
            </td>
            <td>
              <button onclick="editBooking(
                ${booking.id},
                '${booking.guest_name}',
                '${booking.room_number}',
                '${booking.check_in}',
                '${booking.check_out}'
              )">Edit</button>

              <button onclick="deleteBooking(${booking.id})">Delete</button>
            </td>
          </tr>
        `;
            });
        }
    } catch (error) {
        console.log('Error loading bookings:', error);
    }
}

async function deleteBooking(id) {
  const confirmDelete = confirm('Are you sure you want to delete this booking?');

  if (!confirmDelete) {
    return;
  }

  try {
    await fetch(`http://localhost:5000/bookings/${id}`, {
      method: 'DELETE'
    });

    loadBookings();
  } catch (error) {
    console.log('Error deleting booking:', error);
  }
}

async function editBooking(id, guestName, roomNumber, checkIn, checkOut) {
    const newGuestName = prompt('Enter new guest name:', guestName);
    const newRoomNumber = prompt('Enter new room number:', roomNumber);
    const newCheckIn = prompt('Enter new check-in date:', checkIn);
    const newCheckOut = prompt('Enter new check-out date:', checkOut);

    if (!newGuestName || !newRoomNumber || !newCheckIn || !newCheckOut) {
        return;
    }

    try {
        await fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                guestName: newGuestName,
                roomNumber: newRoomNumber,
                checkIn: newCheckIn,
                checkOut: newCheckOut
            })
        });

        loadBookings();
    } catch (error) {
        console.log('Error updating booking:', error);
    }
}

loadBookings();

if (searchBooking) {
  searchBooking.addEventListener('input', loadBookings);
}