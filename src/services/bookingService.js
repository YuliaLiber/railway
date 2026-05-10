export function saveBooking(data) {
  const existing = JSON.parse(localStorage.getItem("bookings")) || [];
  existing.push(data);
  localStorage.setItem("bookings", JSON.stringify(existing));
}

export function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || [];
}