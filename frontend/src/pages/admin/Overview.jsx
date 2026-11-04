import StatCard from "../../components/ui/StatCard";

export default function Overview() {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/overview.jpg')" }}
    >
      {/* Overlay container for readability */}
      <div className="bg-black bg-opacity-60 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold text-white">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Staff" value="2" hint="No change from last month" />
          <StatCard title="Total Customers" value="2" hint="+12 from last month" />
          <StatCard title="Active Bookings" value="2" hint="+5 from last week" />
          <StatCard title="Pending Tasks" value="1" hint="Need attention" tone="warning" />
          <StatCard
            title="Total Revenue"
            value="$3,070"
            hint="+$1,200 from last month"
            tone="success"
          />
          <StatCard title="Total Bookings" value="3" hint="+8 from last week" tone="info" />
        </div>

        <div className="bg-white bg-opacity-90 border rounded p-4">
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-700 mt-2">
            No recent activity to display. Activity will appear here as users interact with system.
          </p>
        </div>
      </div>
    </div>
  );
}

