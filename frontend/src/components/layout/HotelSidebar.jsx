export default function HotelSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav className="space-y-2">
        <a href="/customer" className="block">Book Room</a>
        <a href="/customer/hall" className="block">Book Hall</a>
        <a href="/customer/buffet" className="block">Book Buffet</a>
        <a href="/customer/history" className="block">Booking History</a>
      </nav>
    </aside>
  );
}
