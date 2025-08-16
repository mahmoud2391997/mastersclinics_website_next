"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, User, Phone, Mail, Edit, Save, X, Trash2, Loader2 } from "lucide-react"
import Header from "@/helpers/components/header/Header"
import Scrollbar from "@/helpers/components/scrollbar/scrollbar"
import Navbar from "@/helpers/components/Navbar/Navbar"
import Footer from "@/helpers/components/footer/Footer"
import getImageUrl from "@/utilies/getImageUrl"

interface ClientInfo {
  id: number
  unique_number: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  created_at: string
}

interface DoctorWishlistItem {
  id: number
  name: string
  specialty: string
  branch_id: number
  department_id: number
  services: string
  image: string | null
  created_at: string
  updated_at: string
  priority: number
  is_active: number
  type: "doctor"
  title?: never
  description?: never
  priceBefore?: never
  priceAfter?: never
  discountPercentage?: never
}

interface OfferWishlistItem {
  id: number
  title: string
  description: string
  image: string
  priceBefore: string
  priceAfter: string
  discountPercentage: string
  branches: string
  services_ids: string
  doctors_ids: string
  created_at: string
  updated_at: string
  is_active: number
  priority: number
  type: "offer"
  name?: never
  specialty?: never
  branch_id?: never
  department_id?: never
  services?: never
}

type WishlistItem = DoctorWishlistItem | OfferWishlistItem

export default function ProfilePage() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [editState, setEditState] = useState({
    isEditing: false,
    isLoading: false,
    errors: {} as Record<string, string>,
    tempData: {} as Partial<ClientInfo>
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const getClientId = (): number | null => {
    const clientInfo = localStorage.getItem("clientInfo")
    if (!clientInfo) return null
    try {
      const parsed = JSON.parse(clientInfo)
      return parsed.id || null
    } catch {
      return null
    }
  }

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      
      // Check authentication
      const savedEmail = localStorage.getItem("userEmail")
      const savedAuthState = localStorage.getItem("isAuthenticated")
      const clientId = getClientId()

      if (!savedEmail || savedAuthState !== "true" || !clientId) {
        router.push("/")
        return
      }

      // Fetch profile data from API
      const token = localStorage.getItem("token")
      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/client-auth/profile/${clientId}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`)
      }

      const data = await response.json()

      // Update state with fetched data
      setClientInfo(data.client)
      
      // Update localStorage with fresh data
      localStorage.setItem("clientInfo", JSON.stringify(data.client))

      // Transform wishlist
      const transformedWishlist = data.wishlist.map((item: any) => {
        if ("title" in item) {
          return {
            id: item.id,
            title: item.title,
            description: item.description || "",
            image: item.image,
            priceBefore: item.priceBefore,
            priceAfter: item.priceAfter,
            discountPercentage: item.discountPercentage,
            branches: item.branches,
            services_ids: item.services_ids,
            doctors_ids: item.doctors_ids,
            created_at: item.created_at,
            updated_at: item.updated_at,
            is_active: item.is_active,
            priority: item.priority,
            type: "offer"
          } as OfferWishlistItem
        } else {
          return {
            id: item.id,
            name: item.name,
            specialty: item.specialty,
            branch_id: item.branch_id,
            department_id: item.department_id,
            services: item.services,
            image: item.image,
            created_at: item.created_at,
            updated_at: item.updated_at,
            priority: item.priority,
            is_active: item.is_active,
            type: "doctor"
          } as DoctorWishlistItem
        }
      })

      setWishlist(transformedWishlist)
    } catch (error) {
      console.error("Failed to load profile data:", error)
      // If API fails, check if we have cached data
      const storedClient = localStorage.getItem("clientInfo")
      if (storedClient) {
        try {
          setClientInfo(JSON.parse(storedClient))
        } catch (e) {
          console.error("Failed to parse stored client info", e)
        }
      }
      // Show error to user
      alert("حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

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
    if (!clientInfo) return

    const errors = validateFields(editState.tempData)
    if (Object.keys(errors).length > 0) {
      setEditState(prev => ({ ...prev, errors }))
      return
    }

    setEditState(prev => ({ ...prev, isLoading: true }))

    try {
      const clientId = getClientId()
      
      if (!clientId) {
        throw new Error("Authentication required")
      }

      // Prepare update data
      const updateData = {
        first_name: editState.tempData.first_name || clientInfo.first_name,
        last_name: editState.tempData.last_name || clientInfo.last_name,
        phone_number: editState.tempData.phone_number || clientInfo.phone_number
      }

      // Update profile via API
      const response = await fetch("https://www.ss.mastersclinics.com/api/client-auth/edit-client", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ clientId, ...updateData })
})


      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      const updatedData = await response.json()

      // Update state with fresh data from API
      setClientInfo(updatedData.client)
      
      // Update localStorage
      localStorage.setItem("clientInfo", JSON.stringify(updatedData.client))

      // Reset editing state
      setEditState({
        isEditing: false,
        isLoading: false,
        errors: {},
        tempData: {}
      })

      alert("✅ تم تحديث البيانات بنجاح")
    } catch (error) {
      console.error("Update error:", error)
      alert(error instanceof Error ? error.message : "حدث خطأ أثناء التحديث")
      setEditState(prev => ({ ...prev, isLoading: false }))
    }
  }

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

  const removeFromWishlist = async (id: number) => {
    try {
      const clientId = getClientId()

      if (!clientId) {
        throw new Error("Authentication required")
      }

      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/client-auth/wishlist/${clientId}/${id}`,
        {
          method: "DELETE",
   
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.status}`)
      }

      // Update local state by refetching the wishlist
      await fetchProfileData()
      alert("تمت إزالة العنصر من قائمة الأمنيات بنجاح")
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
      alert(error instanceof Error ? error.message : "حدث خطأ أثناء الإزالة")
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "doctor":
        return "👨‍⚕️"
      case "offer":
        return "🎁"
      default:
        return "📋"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA853] mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!clientInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="mt-4 text-gray-600">حدث خطأ في تحميل البيانات</p>
            <Button 
              onClick={fetchProfileData}
              variant="outline"
              className="mt-4"
            >
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen ">
        <Navbar nav={true} />
      <div className="container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">الملف الشخصي</h1>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8" dir="rtl">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                المعلومات الشخصية
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                قائمة الأمنيات ({wishlist.length})
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
                        <>
                          <Input
                            id="firstName"
                            value={editState.tempData.first_name || ""}
                            onChange={e => handleFieldChange("first_name", e.target.value)}
                            className="mt-1"
                          />
                          {editState.errors.first_name && (
                            <p className="text-red-500 text-sm mt-1">{editState.errors.first_name}</p>
                          )}
                        </>
                      ) : (
                        <p className="mt-1 p-2 bg-gray-50 rounded">{clientInfo.first_name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      {editState.isEditing ? (
                        <>
                          <Input
                            id="lastName"
                            value={editState.tempData.last_name || ""}
                            onChange={e => handleFieldChange("last_name", e.target.value)}
                            className="mt-1"
                          />
                          {editState.errors.last_name && (
                            <p className="text-red-500 text-sm mt-1">{editState.errors.last_name}</p>
                          )}
                        </>
                      ) : (
                        <p className="mt-1 p-2 bg-gray-50 rounded">{clientInfo.last_name}</p>
                      )}
                    </div>
                    <div>
                      <Label>البريد الإلكتروني</Label>
                      <div className="mt-1 p-2 bg-gray-50 rounded flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {clientInfo.email}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      {editState.isEditing ? (
                        <>
                          <Input
                            id="phone"
                            value={editState.tempData.phone_number || ""}
                            onChange={e => handleFieldChange("phone_number", e.target.value)}
                            className="mt-1"
                          />
                          {editState.errors.phone_number && (
                            <p className="text-red-500 text-sm mt-1">{editState.errors.phone_number}</p>
                          )}
                        </>
                      ) : (
                        <div className="mt-1 p-2 bg-gray-50 rounded flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {clientInfo.phone_number}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-4 border-t text-sm text-gray-600 flex gap-4">
                    <span>
                      رقم العضوية: <strong className="text-[#CBA853]">{clientInfo.unique_number}</strong>
                    </span>
                    <span>تاريخ التسجيل: {formatDate(clientInfo.created_at)}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#CBA853]" />
                    قائمة الأمنيات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map(item => (
                      <div key={item.id} className="border rounded-lg p-4 relative hover:shadow-md transition-shadow">
                        <div className="absolute top-2 left-2">
                          <span className="text-2xl">{getTypeIcon(item.type)}</span>
                        </div>
                        <Button
                          onClick={() => removeFromWishlist(item.id)}
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-600 hover:text-red-700 p-1 h-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        
                        {item.type === "doctor" ? (
                          <>
                            <h3 className="font-semibold text-lg mt-6">{item.name}</h3>
                            <p className="text-[#CBA853] text-sm">{item.specialty}</p>
                            <div className="mt-2 text-sm text-gray-600">
                              <p className="line-clamp-3">{item.services}</p>
                            </div>
                            {item.image && (
                              <div className="mt-4">
                                <img 
                                  src={getImageUrl(item.image)} 
                                  alt={item.name}
                                  className="w-full h-40 object-cover rounded"
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <h3 className="font-semibold text-lg mt-6">{item.title}</h3>
                            {item.description && (
                              <p className="text-gray-600 text-sm">{item.description}</p>
                            )}
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-gray-500 line-through">{item.priceBefore} ج.م</span>
                              <span className="text-[#CBA853] font-bold">{item.priceAfter} ج.م</span>
                              {item.discountPercentage && (
                                <Badge variant="outline" className="text-red-600 border-red-600">
                                  خصم {item.discountPercentage}%
                                </Badge>
                              )}
                            </div>
                            {item.image && (
                              <div className="mt-4">
                                <img 
                                  src={getImageUrl(item.image)} 
                                  alt={item.title}
                                  className="w-full h-40 object-cover rounded"
                                />
                              </div>
                            )}
                          </>
                        )}
                        <div className="text-xs text-gray-500 mt-4">
                          أضيف في: {formatDate(item.created_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                  {wishlist.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>قائمة الأمنيات فارغة</p>
                      <p className="text-sm">أضف الخدمات والمنتجات التي تهمك</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
          <Scrollbar/>
          <Footer hclass={'wpo-site-footer'}/>
    </div>
  )
}
