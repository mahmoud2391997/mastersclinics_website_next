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
import { Calendar, Clock, Heart, User, Phone, Mail, Edit, Save, X, Plus, Trash2, Loader2 } from "lucide-react"
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
  const [editState, setEditState] = useState({
    isEditing: false,
    isLoading: false,
    errors: {} as Record<string, string>,
    tempData: {} as Partial<ClientInfo>
  })
  const [newWishlistItem, setNewWishlistItem] = useState({ name: "", description: "", type: "service" as const })
  const [isAddingWishlistItem, setIsAddingWishlistItem] = useState(false)
  const router = useRouter()
useEffect(() => {
  const loadData = async () => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedAuthState = localStorage.getItem("isAuthenticated");
    const savedClientInfo = localStorage.getItem("clientInfo");

    if (!savedEmail || savedAuthState !== "true") {
      router.push("/");
      return;
    }

    try {
      // Always try to get fresh data first
      const response = await fetch("/api/client-auth/get-client", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("clientInfo", JSON.stringify(data.client));
        setClientInfo(data.client);
      } else {
        // Fallback to localStorage if API fails
        if (savedClientInfo) {
          setClientInfo(JSON.parse(savedClientInfo));
        }
      }
    } catch (error) {
      console.error("Failed to fetch fresh data:", error);
      if (savedClientInfo) {
        setClientInfo(JSON.parse(savedClientInfo));
      }
    }

    loadMockData(); // Your existing mock data loader
  };

  loadData();
}, [router]);

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

  const validateFields = (data: Partial<ClientInfo>) => {
    const errors: Record<string, string> = {}
    
    if (data.first_name && data.first_name.length < 2) {
      errors.first_name = "يجب أن يكون الاسم الأول أكثر من حرفين"
    }
    
    if (data.last_name && data.last_name.length < 2) {
      errors.last_name = "يجب أن يكون الاسم الأخير أكثر من حرفين"
    }
    
    if (data.phone_number && !/^\+?\d{10,15}$/.test(data.phone_number)) {
      errors.phone_number = "رقم الهاتف غير صحيح"
    }
    
    return errors
  }

  const handleEditProfile = () => {
    if (!clientInfo) return
    
    setEditState({
      isEditing: true,
      isLoading: false,
      errors: {},
      tempData: { ...clientInfo }
    })
  }
const handleSaveProfile = async () => {
  if (!clientInfo) return;

  const errors = validateFields(editState.tempData);
  if (Object.keys(errors).length > 0) {
    setEditState(prev => ({ ...prev, errors }));
    return;
  }

  setEditState(prev => ({ ...prev, isLoading: true }));

  try {
    const payload = {
      email: clientInfo.email,
      firstName: editState.tempData.first_name || undefined,
      lastName: editState.tempData.last_name || undefined,
      phoneNumber: editState.tempData.phone_number || undefined,
    };

    // Remove unchanged fields
    Object.keys(payload).forEach(key => {
      if (key !== 'email' && (
        payload[key as keyof typeof payload] === undefined || 
        payload[key as keyof typeof payload] === clientInfo[key as keyof ClientInfo]
      )) {
        delete payload[key as keyof typeof payload];
      }
    });

    if (Object.keys(payload).length <= 1) {
      setEditState(prev => ({ ...prev, isLoading: false }));
      alert("⚠️ لم يتم تغيير أي بيانات");
      return;
    }

    const response = await fetch(
      "https://www.ss.mastersclinics.com/api/client-auth/edit-client",
      {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "فشل تحديث بيانات العميل");
    }

    // ✅ CRITICAL: Update localStorage with the EXACT server response
    localStorage.setItem("clientInfo", JSON.stringify(data.client));
    
    // Update React state
    setClientInfo(data.client);
    setEditState({
      isEditing: false,
      isLoading: false,
      errors: {},
      tempData: {}
    });

    alert("✅ تم تحديث البيانات بنجاح");
    
  } catch (error) {
    console.error("Update error:", error);
    alert(error instanceof Error ? error.message : "حدث خطأ أثناء التحديث");
    setEditState(prev => ({ ...prev, isLoading: false }));
  }
};


  const handleCancelEdit = () => {
    if (Object.keys(editState.tempData).length > 0) {
      const confirm = window.confirm("هل تريد بالتأكيد تجاهل التغييرات؟")
      if (!confirm) return
    }
    
    setEditState({
      isEditing: false,
      isLoading: false,
      errors: {},
      tempData: {}
    })
  }

  const handleFieldChange = (field: keyof ClientInfo, value: string) => {
    setEditState(prev => ({
      ...prev,
      tempData: {
        ...prev.tempData,
        [field]: value
      },
      errors: {
        ...prev.errors,
        [field]: ""
      }
    }))
  }

  const addToWishlist = () => {
    if (!newWishlistItem.name.trim()) return

    const newItem: WishlistItem = {
      id: Date.now().toString(),
      ...newWishlistItem,
      addedAt: new Date().toISOString().split("T")[0],
    }

    setWishlist(prev => [newItem, ...prev])
    setNewWishlistItem({ name: "", description: "", type: "service" })
    setIsAddingWishlistItem(false)
  }

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
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
                  {!editState.isEditing ? (
                    <Button onClick={handleEditProfile} variant="outline" size="sm">
                      <Edit className="w-4 h-4 ml-2" />
                      تعديل
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSaveProfile} 
                        size="sm" 
                        className="bg-[#CBA853] hover:bg-[#A58532]"
                        disabled={editState.isLoading}
                      >
                        {editState.isLoading ? (
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 ml-2" />
                        )}
                        حفظ
                      </Button>
                      <Button 
                        onClick={handleCancelEdit} 
                        variant="outline" 
                        size="sm"
                        disabled={editState.isLoading}
                      >
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
                      {editState.isEditing ? (
                        <div>
                          <Input
                            id="firstName"
                            value={editState.tempData.first_name || ""}
                            onChange={(e) => handleFieldChange("first_name", e.target.value)}
                            className="mt-1"
                          />
                          {editState.errors.first_name && (
                            <p className="mt-1 text-sm text-red-600">{editState.errors.first_name}</p>
                          )}
                        </div>
                      ) : (
                        <p className="mt-1 p-2 bg-gray-50 rounded">{clientInfo.first_name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      {editState.isEditing ? (
                        <div>
                          <Input
                            id="lastName"
                            value={editState.tempData.last_name || ""}
                            onChange={(e) => handleFieldChange("last_name", e.target.value)}
                            className="mt-1"
                          />
                          {editState.errors.last_name && (
                            <p className="mt-1 text-sm text-red-600">{editState.errors.last_name}</p>
                          )}
                        </div>
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
                      {editState.isEditing ? (
                        <div>
                          <Input
                            id="phone"
                            value={editState.tempData.phone_number || ""}
                            onChange={(e) => handleFieldChange("phone_number", e.target.value)}
                            className="mt-1"
                          />
                          {editState.errors.phone_number && (
                            <p className="mt-1 text-sm text-red-600">{editState.errors.phone_number}</p>
                          )}
                        </div>
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
