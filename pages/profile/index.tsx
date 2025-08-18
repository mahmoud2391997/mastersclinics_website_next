"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, User, Phone, Mail, Edit, Save, X, Trash2, Loader2 } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faLaptopMedical, faGift } from '@fortawesome/free-solid-svg-icons'
import Navbar from "@/helpers/components/Navbar/Navbar"
import Footer from "@/helpers/components/footer/Footer"
import getImageUrl from "@/utilies/getImageUrl"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import Scrollbar from "@/helpers/components/scrollbar/scrollbar"

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
}

interface DeviceWishlistItem {
  id: number
  name: string
  branches_ids: string
  available_times: string
  image_url: string
  is_active: number
  created_at: string
  updated_at: string
  priority: number
  typee:string;
  type: "device"
}

type WishlistItem = DoctorWishlistItem | OfferWishlistItem | DeviceWishlistItem

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
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const searchParams = useSearchParams()
  const router = useRouter()

  const getClientId = (): number | null => {
    try {
      const clientInfo = localStorage.getItem("clientInfo")
      if (!clientInfo) return null
      const parsed = JSON.parse(clientInfo)
      return parsed.id || null
    } catch (e) {
      console.error("Error parsing clientInfo:", e)
      return null
    }
  }

  const activeTab = searchParams.get('tab') === 'wishlist' ? 'wishlist' : 'info'

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const clientId = getClientId()
      
      if (!clientId) {
        console.error("Authentication failed - missing clientId or token")
        router.push("/")
        return
      }

      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/client-auth/profile/${clientId}`,
        {
          method: "GET",
  
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
console.log("profile",data);

      if (!data.client) {
        throw new Error("Invalid response format: missing client data")
      }

      setClientInfo(data.client)
      localStorage.setItem("clientInfo", JSON.stringify(data.client))

     // Replace the wishlist transformation code with this:

// First define interfaces for the raw API data
interface RawDoctorWishlistItem {
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
}

interface RawOfferWishlistItem {
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
}

interface RawDeviceWishlistItem {
  id: number
  name: string
  branches_ids: string
  available_times: string
  image_url: string
  is_active: number
  created_at: string
  updated_at: string
  priority: number
  typee: string
}

type RawWishlistItem = RawDoctorWishlistItem | RawOfferWishlistItem | RawDeviceWishlistItem

// Then update the transformation logic
const transformedWishlist = (data.wishlist || [])
  .filter((item: RawWishlistItem) => item !== null)
  .map((item: RawWishlistItem) => {
    if ('title' in item) {
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
    } else if ('specialty' in item) {
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
    } else if ('image_url' in item) {
      return {
        id: item.id,
        name: item.name,
        typee: item.typee,
        branches_ids: item.branches_ids,
        available_times: item.available_times,
        image_url: item.image_url,
        is_active: item.is_active,
        created_at: item.created_at,
        updated_at: item.updated_at,
        priority: item.priority,
        type: "device"
      } as DeviceWishlistItem
    }
    return null
  })
  .filter((item: RawWishlistItem): item is WishlistItem => item !== null)

      setWishlist(transformedWishlist)
    } catch (err) {
      console.error("Failed to load profile:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      
      // Retry up to 3 times
      if (retryCount < 3) {
        setTimeout(() => setRetryCount(c => c + 1), 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [retryCount])

  // Timeout after 10 seconds if still loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setError("Request timed out. Please check your connection.")
        setLoading(false)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [loading])

  const removeFromWishlist = async (item: WishlistItem) => {
    try {
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      // Optimistic update
      setWishlist(prev => prev.filter(i => i.id !== item.id))

      const response = await fetch(
        "https://www.ss.mastersclinics.com/api/wishlist",
        {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            client_id: clientId,
            item_type: item.type,
            item_id: item.id,
          }),
        }
      )

      if (!response.ok) throw new Error(`Failed with status ${response.status}`)

      toast.success(`تمت إزالة ${item.type === "doctor" ? "الطبيب" : item.type === "offer" ? "العرض" : "الجهاز"} من المفضلة`)
    } catch (err) {
      console.error("Remove failed:", err)
      toast.error("فشلت عملية الإزالة. يرجى المحاولة مرة أخرى")
      fetchProfileData() // Refresh data
    }
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
    if (!clientInfo) return

    const errors = validateFields(editState.tempData)
    if (Object.keys(errors).length > 0) {
      setEditState(prev => ({ ...prev, errors }))
      return
    }

    setEditState(prev => ({ ...prev, isLoading: true }))

    try {
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      const response = await fetch(
        "https://www.ss.mastersclinics.com/api/client-auth/edit-client",
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            clientId,
            first_name: editState.tempData.first_name || clientInfo.first_name,
            last_name: editState.tempData.last_name || clientInfo.last_name,
            phone_number: editState.tempData.phone_number || clientInfo.phone_number
          })
        }
      )

      if (!response.ok) throw new Error(`Failed with status ${response.status}`)

      const data = await response.json()
      setClientInfo(data.client)
      localStorage.setItem("clientInfo", JSON.stringify(data.client))
      
      setEditState({
        isEditing: false,
        isLoading: false,
        errors: {},
        tempData: {}
      })

      toast.success("تم تحديث البيانات بنجاح")
    } catch (err) {
      console.error("Update failed:", err)
      toast.error("فشل التحديث. يرجى المحاولة مرة أخرى")
      setEditState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const handleCancelEdit = () => {
    if (Object.keys(editState.tempData).length > 0 && 
        !window.confirm("هل تريد تجاهل التغييرات؟")) return
        
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
      tempData: { ...prev.tempData, [field]: value },
      errors: { ...prev.errors, [field]: "" }
    }))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "doctor": return <FontAwesomeIcon icon={faUserDoctor} className="text-[#CBA853] text-xl" />
      case "offer": return <FontAwesomeIcon icon={faGift} className="text-[#CBA853] text-xl" />
      case "device": return <FontAwesomeIcon icon={faLaptopMedical} className="text-[#CBA853] text-xl" />
      default: return <FontAwesomeIcon icon={faGift} className="text-gray-500 text-xl" />
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ar-SA')
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-[#CBA853]" />
            <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500">محاولة {retryCount} من 3</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
              <p className="font-medium">حدث خطأ</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
            <Button 
              onClick={() => {
                setRetryCount(0)
                setLoading(true)
                setError(null)
              }}
              className="mt-6 bg-[#CBA853] hover:bg-[#A58532]"
            >
              إعادة المحاولة
            </Button>
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
            <p className="text-gray-600">لا توجد بيانات متاحة</p>
            <Button 
              onClick={() => router.push("/")}
              className="mt-4 bg-[#CBA853] hover:bg-[#A58532]"
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen " >
      <Navbar nav={true} />
      <div className="container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">الملف الشخصي</h1>

          <Tabs value={activeTab} className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger 
                value="info" 
                className="flex items-center gap-2"
                onClick={() => router.push('/profile')}
              >
                <User className="w-4 h-4" />
                المعلومات الشخصية
              </TabsTrigger>
              <TabsTrigger 
                value="wishlist" 
                className="flex items-center gap-2"
                onClick={() => router.push('/profile?tab=wishlist')}
              >
                <Heart className="w-4 h-4" />
                قائمة الأمنيات ({wishlist.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
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
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map(item => (
                        <div 
                          key={`${item.type}-${item.id}`}
                          className="border rounded-lg p-4 relative hover:shadow-md transition-shadow"
                        >
                          <div className="absolute top-2 left-2">
                            {getTypeIcon(item.type)}
                          </div>
                          <Button
                            onClick={() => removeFromWishlist(item)}
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-red-600 hover:text-red-700 p-1 h-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          
                          {/* Doctor Item */}
                          {item.type === "doctor" && (
                            <>
                              <h3 className="font-semibold text-lg mt-6">{item.name}</h3>
                              <p className="text-[#CBA853] text-sm">{item.specialty}</p>
                              <div className="mt-2 text-sm text-gray-600 line-clamp-3">
                                {item.services}
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
                          )}

                          {/* Offer Item */}
                          {item.type === "offer" && (
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

                          {/* Device Item */}
                       {/* Device Item */}
{item.type === "device" && (
  <>
    <h3 className="font-semibold text-lg mt-6">{item.name}</h3>
    <p className="text-[#CBA853] text-sm">{item.typee}</p>
    
    {/* Display available times if they exist */}
    {item.available_times && item.available_times !== "null" && (
      <div className="mt-2">
        <Label className="text-sm text-gray-600">مواعيد العمل:</Label>
        <p className="text-sm text-gray-600">
          {(() => {
            try {
              // First try to parse as JSON
              const times = JSON.parse(item.available_times);
              return Array.isArray(times) ? times.join(", ") : times;
            } catch {
  return item.available_times.replace(/^"|"$/g, '');
}

          })()}
        </p>
      </div>
    )}
    
    {item.image_url && (
      <div className="mt-4">
        <img 
          src={getImageUrl(item.image_url)} 
          alt={item.name}
          className="w-full h-40 object-cover rounded"
        />
      </div>
    )}
    
    <div className="mt-4 flex justify-between items-center">
      <div className="text-xs text-gray-500">
        أضيف في: {formatDate(item.created_at)}
      </div>
      <Button
        onClick={() => router.push(`/devices/${item.id}`)}
        variant="outline"
        size="sm"
        className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
      >
        عرض التفاصيل
      </Button>
    </div>
  </>
)}

                     
                        </div>
                      ))}
                    </div>
                  ) : (
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
      <Footer hclass={'wpo-site-footer'}/>
      <Scrollbar/>
    </div>
  )
}