import React from "react";
import { useAdminDashboard } from "./useAdminDashboard";
import {
  Users, BookOpen, UserCheck, Activity,
  TrendingUp, LogOut, Code, Star, LayoutDashboard
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserCountGraph from "./UserCountGraph";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-[url(/card_background.png)] bg-cover bg-green-50 dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700
                  flex flex-col justify-between items-center p-6 h-50 
                  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
    {/* Icon Section */}
    <div className={`p-3 rounded-full ${color.bg} dark:bg-opacity-20 flex items-center justify-center`}>
      <Icon size={28} className={color.text} />
    </div>

    {/* Title */}
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center mt-3">
      {title}
    </p>

    {/* Value */}
    <p className="text-3xl font-bold text-gray-900 dark:text-white text-center mt-1">
      {value ?? 0}
    </p>
  </div>
);


function AdminDashboard() {
  const { user, handleLogout, dashboardData, loading, error } = useAdminDashboard();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
          Loading dashboard...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );

  const statCards = [
    { title: "Total Users", value: dashboardData?.total_users, icon: Users, color: { text: "text-blue-600", bg: "bg-blue-100" } },
    { title: "Active Users (Month)", value: dashboardData?.active_users_month, icon: Activity, color: { text: "text-green-600", bg: "bg-green-100" } },
    { title: "New Signups (Week)", value: dashboardData?.new_signups_week, icon: TrendingUp, color: { text: "text-amber-600", bg: "bg-amber-100" } },
    { title: "Total Courses", value: dashboardData?.total_courses, icon: BookOpen, color: { text: "text-purple-600", bg: "bg-purple-100" }, nav: "/admin/courses" },
    { title: "Registered Coaches", value: dashboardData?.total_coaches, icon: UserCheck, color: { text: "text-pink-600", bg: "bg-pink-100" }, nav: "/admin/coaches" },
    { title: "Total Domains", value: dashboardData?.total_domains, icon: Code, color: { text: "text-gray-600", bg: "bg-gray-100" }, nav: "/admin/domains" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="lg:text-2xl font-bold tracking-tight flex items-center gap-2 text-lg">
            <LayoutDashboard className="text-indigo-600 dark:text-indigo-400 w-7 h-7" />
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300 text-xs lg:text-xl">
              Welcome, <span className="font-semibold">{user?.name || "Admin"}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-12">
        {/* Stats Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {statCards.map((card, i) => (
              <div key={i} onClick={() => card.nav && navigate(card.nav)} className={`${card.nav ? "cursor-pointer" : "cursor-not-allowed"}`}>
                <StatCard {...card} />
              </div>
            ))}
          </div>
        </section>

        {/* Top Courses */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-6">🏆 Top Courses by Enrollment</h2>

          {dashboardData?.top_courses?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.top_courses.map((course) => (
                <div
                  key={course.course_id}
                  className="bg-[url(/card_background.png)] bg-cover bg-green-50 dark:bg-gray-900 p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div>
                    <h3 className="text-lg font-bold truncate">{course.course_name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Enrollments: {course.total_enrollments}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm font-medium">
                    <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" /> Top Ranked
                    </span>
                    <span className="text-gray-400 hover:text-gray-600 dark:text-gray-300">
                      View Details
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No top courses found.
            </p>
          )}

          <UserCountGraph />
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;