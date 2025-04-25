"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Plus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Truck,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"

// Sample data for farmer dashboard
const dashboardData = {
  stats: [
    {
      title: "Total Sales",
      value: "$1,245.89",
      change: "+12.5%",
      isPositive: true,
      icon: ShoppingBag,
    },
    {
      title: "Active Products",
      value: "24",
      change: "+3",
      isPositive: true,
      icon: Package,
    },
    {
      title: "Customers",
      value: "156",
      change: "+8.3%",
      isPositive: true,
      icon: Users,
    },
    {
      title: "Avg. Order Value",
      value: "$42.50",
      change: "-2.4%",
      isPositive: false,
      icon: BarChart3,
    },
  ],
  recentOrders: [
    {
      id: "ORD-7652",
      customer: "John Smith",
      date: "2023-12-01",
      amount: "$78.50",
      status: "delivered",
      items: 3,
    },
    {
      id: "ORD-7651",
      customer: "Sarah Johnson",
      date: "2023-11-30",
      amount: "$45.99",
      status: "shipped",
      items: 2,
    },
    {
      id: "ORD-7650",
      customer: "Michael Brown",
      date: "2023-11-29",
      amount: "$124.00",
      status: "processing",
      items: 5,
    },
    {
      id: "ORD-7649",
      customer: "Emily Davis",
      date: "2023-11-28",
      amount: "$32.75",
      status: "delivered",
      items: 1,
    },
  ],
  topProducts: [
    {
      id: 1,
      name: "Organic Tomatoes",
      sold: 78,
      revenue: "$467.22",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Free Range Eggs",
      sold: 65,
      revenue: "$487.50",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Grass-Fed Beef",
      sold: 42,
      revenue: "$965.58",
      image: "/placeholder.svg?height=50&width=50",
    },
  ],
}

export default function FarmerDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not logged in or not a farmer
  if (!user) {
    router.push("/auth/signin")
    return null
  }

  if (user.role !== "farmer") {
    router.push("/")
    return null
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 size={16} className="text-green-500" />
      case "shipped":
        return <Truck size={16} className="text-blue-500" />
      case "processing":
        return <Clock size={16} className="text-orange-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard/add-product" className="btn-primary flex items-center">
              <Plus size={16} className="mr-2" /> Add New Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="bg-lime-100 p-3 rounded-lg">
                  <stat.icon size={20} className="text-lime-500" />
                </div>
              </div>
              <div className={`flex items-center mt-4 text-sm ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                {stat.isPositive ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                <span>{stat.change} from last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recent Orders</h2>
                  <Link href="/dashboard/orders" className="text-lime-500 hover:text-lime-600 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dashboardData.recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link href={`/dashboard/orders/${order.id}`} className="text-lime-500 hover:text-lime-600">
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div>
            <div className="bg-white rounded-lg shadow-md h-full">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Top Products</h2>
                  <Link href="/dashboard/products" className="text-lime-500 hover:text-lime-600 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {dashboardData.topProducts.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-gray-500 text-sm">{product.sold} sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{product.revenue}</p>
                        <p className="text-gray-500 text-xs">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Link
                    href="/dashboard/analytics"
                    className="text-lime-500 hover:text-lime-600 text-sm font-medium flex items-center justify-center"
                  >
                    View Detailed Analytics <ArrowUpRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Harvests */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Upcoming Harvests</h2>
                <Link href="/dashboard/harvests" className="text-lime-500 hover:text-lime-600 text-sm font-medium">
                  Manage Harvests
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="font-medium text-lg mb-2">No upcoming harvests</h3>
                  <p className="text-gray-500 mb-4">
                    Add your upcoming harvests to let customers know when seasonal products will be available.
                  </p>
                  <Link href="/dashboard/add-harvest" className="btn-primary inline-flex items-center">
                    <Plus size={16} className="mr-2" /> Add Harvest Schedule
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
