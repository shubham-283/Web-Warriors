"use client"

import { useState, useEffect } from "react"
import { db } from "../firebase-config.js"
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { useAuth0 } from "@auth0/auth0-react"

const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancellingOrder, setCancellingOrder] = useState(null)
  const { user, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (isLoading) return

      if (!isAuthenticated) {
        console.error("User is not authenticated")
        setLoading(false)
        return
      }

      if (!user || !user.email) {
        console.error("User object is missing or email is not available:", user)
        setLoading(false)
        return
      }

      try {
        const ordersRef = collection(db, "orders")
        const q = query(ordersRef, where("shippingAddress.email", "==", user.email))
        const querySnapshot = await getDocs(q)
        const userOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        }))

        userOrders.sort((a, b) => b.createdAt - a.createdAt)
        setOrders(userOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserOrders()
  }, [isAuthenticated, user, isLoading])

  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingOrder(orderId)
      const orderRef = doc(db, "orders", orderId)
      await updateDoc(orderRef, {
        status: 'cancelled',
        cancelledAt: new Date(),
      })
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled', cancelledAt: new Date() }
          : order
      ))
    } catch (error) {
      console.error("Error cancelling order:", error)
      alert("Failed to cancel order. Please try again.")
    } finally {
      setCancellingOrder(null)
    }
  }

  const canCancelOrder = (order) => {
    if (order.status === 'cancelled') return false
    
    const orderTime = order.createdAt.getTime()
    const currentTime = new Date().getTime()
    const hoursDifference = (currentTime - orderTime) / (1000 * 60 * 60)
    
    return hoursDifference <= 36
  }

  if (isLoading) {
    return <LoadingSpinner message="Authenticating..." />
  }

  if (!isAuthenticated) {
    return <NotAuthenticated />
  }

  if (loading) {
    return <LoadingSpinner message="Fetching orders..." />
  }

  const groupedOrders = orders.reduce((acc, order) => {
    const dateKey = order.createdAt.toLocaleDateString()
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(order)
    return acc
  }, {})

  const sortedDates = Object.keys(groupedOrders).sort((a, b) => {
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateB - dateA
  })

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h2>
      {orders.length === 0 ? (
        <EmptyOrdersMessage />
      ) : (
        sortedDates.map((date) => (
          <OrderGroup 
            key={date} 
            date={date} 
            orders={groupedOrders[date]} 
            onCancelOrder={handleCancelOrder}
            canCancelOrder={canCancelOrder}
            cancellingOrder={cancellingOrder}
          />
        ))
      )}
    </div>
  )
}

const LoadingSpinner = ({ message }) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0">
        <div className="w-full h-full border-4 border-t-pink-500 border-r-pink-400 border-b-pink-300 border-l-pink-200 rounded-full animate-spin-custom"></div>
      </div>
      <div className="absolute inset-2">
        <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 rounded-full animate-pulse"></div>
      </div>
    </div>
    <p className="mt-4 text-gray-700 font-medium text-sm tracking-wide animate-pulse">{message}</p>
    <style>{`
      @keyframes spin-custom {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin-custom {
        animation: spin-custom 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      }
    `}</style>
  </div>
)

const NotAuthenticated = () => (
  <div className="container mx-auto px-4 py-8 mt-24">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">My Orders</h2>
    <div className="bg-pink-100 border-l-4 border-pink-500 text-pink-700 p-4 rounded" role="alert">
      <p className="font-bold">Authentication Required</p>
      <p>Please log in to view your orders.</p>
    </div>
  </div>
)

const EmptyOrdersMessage = () => (
  <div className="bg-pink-50 rounded-lg p-6 text-center">
    <svg
      className="mx-auto h-12 w-12 text-pink-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
    <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
  </div>
)

const OrderGroup = ({ date, orders, onCancelOrder, canCancelOrder, cancellingOrder }) => (
  <div className="mb-10">
    <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b border-pink-200 pb-2">{date}</h3>
    {orders.map((order) => (
      <OrderCard 
        key={order.id} 
        order={order} 
        onCancelOrder={onCancelOrder}
        canCancel={canCancelOrder(order)}
        isCancelling={cancellingOrder === order.id}
      />
    ))}
  </div>
)

const OrderCard = ({ order, onCancelOrder, canCancel, isCancelling }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-xl border border-pink-100">
    <div className="bg-pink-50 px-4 py-3 border-b border-pink-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-800">Order ID: {order.orderId}</span>
          {order.status === 'cancelled' && (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              Cancelled
            </span>
          )}
        </div>
        <span className="text-sm text-gray-600">{order.createdAt.toLocaleString()}</span>
      </div>
    </div>
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {order.cartItems.map((item) => (
          <OrderItem key={item.name} item={item} />
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-pink-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Total</span>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-pink-600">₹{order.totalPrice.toFixed(2)}</span>
            {canCancel && (
              <button
                onClick={() => onCancelOrder(order.id)}
                disabled={isCancelling}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white 
                  ${isCancelling 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600 transition-colors'
                  }`}
              >
                {isCancelling ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cancelling...
                  </span>
                ) : (
                  'Cancel Order'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const OrderItem = ({ item }) => (
  <div className="flex items-center space-x-4">
    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-cover rounded-md shadow" />
    <div>
      <h3 className="font-medium text-gray-800">{item.name}</h3>
      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
      <p className="text-sm font-medium text-pink-700">Price: ₹{item.price}</p>
    </div>
  </div>
)

export default UserOrders