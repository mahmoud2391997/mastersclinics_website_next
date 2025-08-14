"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Heart, User, Phone, Mail, Edit, Save, X, Plus, Trash2 } from "lucide-react"
import Header from "@/helpers/components/header/Header"

interface ClientInfo {
  unique_number: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  created_at: string
}

interface Appointment {
  id: string
  date: string
  time: string
  service: string
  doctor: string
  status: "upcoming" | "completed" | "cancelled"
  branch: string
}

interface WishlistItem {
  id: string
  name: string
  type: "service" | "offer" | "product"
  price?: string
  description: string
  addedAt: string
}

export default function ProfilePage() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedInfo, setEditedInfo] = useState<Partial<ClientInfo>>({})
  const [newWishlistItem, setNewWishlistItem] = useState({ name: "", description: "", type: "service" as const })
  const [isAddingWishlistItem, setIsAddingWishlistItem] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail")
    const savedAuthState = localStorage.getItem("isAuthenticated")
    const savedClientInfo = localStorage.getItem("clientInfo")

    if (!savedEmail || savedAuthState !== "true") {
      router.push("/")
      return
    }

    if (savedClientInfo) {
      const parsedClientInfo = JSON.parse(savedClientInfo)
      console.log("Fetched client info:", {
        clientData: parsedClientInfo,
        timestamp: new Date().toISOString(),
        source: "localStorage",
      })
      setClientInfo(parsedClientInfo)
    } else {
      fetchClientInfo(savedEmail)
    }

    // Load mock data for appointments and wishlist
    loadMockData()
  }, [router])

  const fetchClientInfo = async (email: string) => {
    try {
      const response = await fetch(`https://www.ss.mastersclinics.com/api/client-info?email=${email}`)
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched client info from API:", {
          clientData: data,
          timestamp: new Date().toISOString(),
          source: "API",
        })
        setClientInfo(data)
        localStorage.setItem("clientInfo", JSON.stringify(data))
      }
    } catch (error) {
      console.error("Error fetching client info:", error)
    }
  }

  const loadMockData = () => {
    // Mock appointments data
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        date: "2024-01-15",
        time: "10:00",
        service: "استشارة جلدية",
        doctor: "د. أحمد محمد",
        status: "upcoming",
        branch: "فرع الرياض الرئيسي",
      },
      {
        id: "2",
        date: "2024-01-10",
        time: "14:30",
        service: "تنظيف أسنان",
        doctor: "د. فاطمة علي",
        status: "completed",
        branch: "فرع جدة",
      },
      {
        id: "3",
        date: "2024-01-20",
        time: "09:00",
        service: "فحص عام",
        doctor: "د. محمد السعد",
        status: "upcoming",
        branch: "فرع الدمام",
      },
    ]

    // Mock wishlist data
    const mockWishlist: WishlistItem[] = [
      {
        id: "1",
        name: "جلسة ليزر للوجه",
        type: "service",
        price: "500 ريال",
        description: "جلسة ليزر متقدمة لتجديد البشرة",
        addedAt: "2024-01-05",
      },
      {
        id: "2",
        name: "عرض تبييض الأسنان",
        type: "offer",
        price: "800 ريال",
        description: "عرض خاص لتبييض الأسنان بالليزر",
        addedAt: "2024-01-08",
      },
      {
        id: "3",
        name: "كريم مرطب طبي",
        type: "product",
        price: "120 ريال",
        description: "كريم مرطب للبشرة الحساسة",
        addedAt: "2024-01-12",
      },
    ]

    setAppointments(mockAppointments)
    setWishlist(mockWishlist)
  }

  const handleEditProfile = () => {
    setIsEditing(true)
    setEditedInfo(clientInfo || {})
  }

  const handleSaveProfile = async () => {
    if (!clientInfo) return

    try {
      const response = await fetch("https://www.ss.mastersclinics.com/api/update-client", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedInfo),
      })

      if (response.ok) {
        const updatedInfo = { ...clientInfo, ...editedInfo }
        setClientInfo(updatedInfo)
        localStorage.setItem("clientInfo", JSON.stringify(updatedInfo))
        console.log("Updated client info:", {
          updatedData: updatedInfo,
          timestamp: new Date().toISOString(),
        })
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedInfo({})
  }

  const addToWishlist = () => {
    if (!newWishlistItem.name.trim()) return

    const newItem: WishlistItem = {
      id: Date.now().toString(),
      ...newWishlistItem,
      addedAt: new Date().toISOString().split("T")[0],
    }

    setWishlist((prev) => [newItem, ...prev])
    setNewWishlistItem({ name: "", description: "", type: "service" })
    setIsAddingWishlistItem(false)
  }

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "قادم"
      case "completed":
        return "مكتمل"
      case "cancelled":
        return "ملغي"
      default:
        return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "service":
        return "🏥"
      case "offer":
        return "🎯"
      case "product":
        return "🛍️"
      default:
        return "📋"
    }
  }

  if (!clientInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA853] mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header nav={true} />
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">الملف الشخصي</h1>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8" dir="rtl">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                المعلومات الشخصية
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                المواعيد
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                قائمة الأمنيات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" dir="rtl">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#CBA853]" />
                    المعلومات الشخصية
                  </CardTitle>
                  {!isEditing ? (
                    <Button onClick={handleEditProfile} variant="outline" size="sm">
                      <Edit className="w-4 h-4 ml-2" />
                      تعديل
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} size="sm" className="bg-[#CBA853] hover:bg-[#A58532]">
                        <Save className="w-4 h-4 ml-2" />
                        حفظ
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm">
                        <X className="w-4 h-4 ml-2" />
                        إلغاء
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={editedInfo.first_name || ""}
                          onChange={(e) => setEditedInfo((prev) => ({ ...prev, first_name: e.target.value }))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-gray-50 rounded">{clientInfo.first_name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={editedInfo.last_name || ""}
                          onChange={(e) => setEditedInfo((prev) => ({ ...prev, last_name: e.target.value }))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-gray-50 rounded">{clientInfo.last_name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <div className="mt-1 p-2 bg-gray-50 rounded flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {clientInfo.email}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedInfo.phone_number || ""}
                          onChange={(e) => setEditedInfo((prev) => ({ ...prev, phone_number: e.target.value }))}
                          className="mt-1"
                        />
                      ) : (
                        <div className="mt-1 p-2 bg-gray-50 rounded flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {clientInfo.phone_number}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        رقم العضوية: <strong className="text-[#CBA853]">{clientInfo.unique_number}</strong>
                      </span>
                      <span>تاريخ التسجيل: {new Date(clientInfo.created_at).toLocaleDateString("ar-SA")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#CBA853]" />
                    جدول المواعيد
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{appointment.service}</h3>
                              <Badge className={getStatusColor(appointment.status)}>
                                {getStatusText(appointment.status)}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(appointment.date).toLocaleDateString("ar-SA")}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{appointment.doctor}</span>
                              </div>
                              <div className="text-sm text-gray-500">{appointment.branch}</div>
                            </div>
                          </div>
                          {appointment.status === "upcoming" && (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                تعديل
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                إلغاء
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full bg-[#CBA853] hover:bg-[#A58532]">
                      <Plus className="w-4 h-4 ml-2" />
                      حجز موعد جديد
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#CBA853]" />
                    قائمة الأمنيات
                  </CardTitle>
                  <Button
                    onClick={() => setIsAddingWishlistItem(true)}
                    className="bg-[#CBA853] hover:bg-[#A58532]"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة عنصر
                  </Button>
                </CardHeader>
                <CardContent>
                  {isAddingWishlistItem && (
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-semibold mb-4">إضافة عنصر جديد</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="itemName">اسم العنصر</Label>
                          <Input
                            id="itemName"
                            value={newWishlistItem.name}
                            onChange={(e) => setNewWishlistItem((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="أدخل اسم الخدمة أو المنتج"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="itemDescription">الوصف</Label>
                          <Textarea
                            id="itemDescription"
                            value={newWishlistItem.description}
                            onChange={(e) => setNewWishlistItem((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="وصف مختصر للعنصر"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="itemType">النوع</Label>
                          <select
                            id="itemType"
                            value={newWishlistItem.type}
                            // onChange={(e) =>
                            //   setNewWishlistItem((prev) => ({
                            //     ...prev,
                            //     type: e.target.value as "service" | "offer" | "product",
                            //   }))
                            // }
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="service">خدمة</option>
                            <option value="offer">عرض</option>
                            <option value="product">منتج</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addToWishlist} className="bg-[#CBA853] hover:bg-[#A58532]">
                            إضافة
                          </Button>
                          <Button onClick={() => setIsAddingWishlistItem(false)} variant="outline">
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{getTypeIcon(item.type)}</span>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              {item.price && (
                                <Badge variant="secondary" className="bg-[#CBA853] text-white">
                                  {item.price}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">{item.description}</p>
                            <div className="text-sm text-gray-500">
                              أضيف في: {new Date(item.addedAt).toLocaleDateString("ar-SA")}
                            </div>
                          </div>
                          <Button
                            onClick={() => removeFromWishlist(item.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {wishlist.length === 0 && !isAddingWishlistItem && (
                      <div className="text-center py-8 text-gray-500">
                        <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>قائمة الأمنيات فارغة</p>
                        <p className="text-sm">أضف الخدمات والمنتجات التي تهمك</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
