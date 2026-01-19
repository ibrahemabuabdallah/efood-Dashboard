import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [salesData, setSalesData] = useState(null)
  const [productsData, setProductsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes, reportsRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/orders?limit=5'),
        axios.get('/api/admin/reports')
      ])

      setStats(statsRes.data)
      setRecentOrders(ordersRes.data.orders || [])

      // Prepare charts data
      const monthlySales = reportsRes.data.monthlySales || []
      setSalesData({
        labels: monthlySales.map(m => `${m._id.year}/${m._id.month}`),
        datasets: [{
          label: 'المبيعات',
          data: monthlySales.map(m => m.total),
          borderColor: '#D4A574',
          backgroundColor: 'rgba(212, 165, 116, 0.1)',
          tension: 0.4,
          fill: true
        }]
      })

      const topProducts = reportsRes.data.topProducts || []
      setProductsData({
        labels: topProducts.map(p => p.product[0]?.nameAr || 'غير معروف'),
        datasets: [{
          label: 'المبيعات',
          data: topProducts.map(p => p.totalSold),
          backgroundColor: [
            'rgba(212, 165, 116, 0.8)',
            'rgba(10, 77, 60, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(201, 203, 207, 0.8)'
          ]
        }]
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-amber-900">جاري التحميل...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-white shadow-sm p-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-amber-900">لوحة التحكم</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">مرحباً، {user?.name || 'المدير'}</span>
            <button
              onClick={() => navigate('/')}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              العودة للموقع
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">إجمالي المبيعات</h3>
              <div className="p-3 bg-blue-100 rounded-lg">💰</div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalSales || 0} ريال</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">الطلبات الجديدة</h3>
              <div className="p-3 bg-green-100 rounded-lg">📦</div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats?.newOrdersCount || 0}</p>
            <p className="text-sm text-green-600">طلب قيد المعالجة</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">إجمالي المنتجات</h3>
              <div className="p-3 bg-yellow-100 rounded-lg">🍯</div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalProducts || 0}</p>
            <p className="text-sm text-yellow-600">{stats?.lowStockProducts || 0} منتج قليل المخزون</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-r-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">العملاء</h3>
              <div className="p-3 bg-purple-100 rounded-lg">👥</div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalCustomers || 0}</p>
            <p className="text-sm text-purple-600">{stats?.newCustomers || 0} عميل جديد هذا الأسبوع</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {salesData && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">إحصائيات المبيعات الشهرية</h3>
              <Line data={salesData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
          )}

          {productsData && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">المنتجات الأكثر مبيعاً</h3>
              <Bar data={productsData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">الطلبات الأخيرة</h3>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              عرض الكل →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4 font-medium text-gray-700">رقم الطلب</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">العميل</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">المبلغ</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">#{order._id.slice(-6)}</td>
                    <td className="py-3 px-4">{order.user?.name || order.user?.phone || 'غير معروف'}</td>
                    <td className="py-3 px-4 font-bold text-amber-600">{order.totalAmount} ريال</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.orderStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.orderStatus === 'delivered' ? 'تم التوصيل' :
                         order.orderStatus === 'processing' ? 'قيد المعالجة' :
                         order.orderStatus === 'pending' ? 'قيد الانتظار' :
                         'ملغي'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
