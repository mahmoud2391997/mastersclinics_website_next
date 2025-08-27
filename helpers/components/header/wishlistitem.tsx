// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { Trash2, Eye, UserCheck, Gift, MonitorSpeaker } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { getImageUrl } from "@/helpers/hooks/imageUrl";

// // Types
// interface BaseWishlistItem {
//   id: number;
//   created_at: string;
//   updated_at: string;
//   priority: number;
//   is_active: number;
// }

// export interface DoctorWishlistItem extends BaseWishlistItem {
//   type: "doctor";
//   name: string;
//   specialty: string;
//   branch_id: number;
//   department_id: number;
//   services: string;
//   image: string | null;
// }

// export interface OfferWishlistItem extends BaseWishlistItem {
//   type: "offer";
//   title: string;
//   description: string;
//   image: string;
//   priceBefore: string;
//   priceAfter: string;
//   discountPercentage: string;
//   branches: string;
//   services_ids: string;
//   doctors_ids: string;
// }

// export interface DeviceWishlistItem extends BaseWishlistItem {
//   type: "device";
//   name: string;
//   typee: string;
//   branches_ids: string;
//   available_times: string;
//   image_url: string;
// }

// export type WishlistItem = DoctorWishlistItem | OfferWishlistItem | DeviceWishlistItem;

// // Type guards
// export const isDoctor = (item: WishlistItem | undefined | null): item is DoctorWishlistItem => 
//   item !== undefined && item !== null && item.type === "doctor";

// export const isOffer = (item: WishlistItem | undefined | null): item is OfferWishlistItem => 
//   item !== undefined && item !== null && item.type === "offer";

// export const isDevice = (item: WishlistItem | undefined | null): item is DeviceWishlistItem => 
//   item !== undefined && item !== null && item.type === "device";

// // Props interface
// interface WishlistItemProps {
//   item: WishlistItem | undefined | null;
//   onRemove: (item: WishlistItem) => void;
//   variant?: "card" | "compact";
//   showDetailsButton?: boolean;
//   className?: string;
// }

// // Utility functions
// const getTypeIcon = (type: string) => {
//   switch (type) {
//     case "doctor":
//       return <UserCheck className="text-[#CBA853] w-5 h-5" />;
//     case "offer":
//       return <Gift className="text-[#CBA853] w-5 h-5" />;
//     case "device":
//       return <MonitorSpeaker className="text-[#CBA853] w-5 h-5" />;
//     default:
//       return <Gift className="text-[#CBA853] w-5 h-5" />;
//   }
// };

// const formatDate = (dateString: string) => {
//   try {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   } catch {
//     return dateString;
//   }
// };

// const parseAvailableTimes = (availableTimes: string | undefined) => {
//   if (!availableTimes || availableTimes === "null") return "";
  
//   try {
//     const times = JSON.parse(availableTimes);
//     return Array.isArray(times) ? times.join(", ") : times;
//   } catch {
//     return availableTimes.replace(/^"|"$/g, "");
//   }
// };

// // Main component
// export function WishlistItemComponent({ 
//   item, 
//   onRemove, 
//   variant = "card", 
//   showDetailsButton = true,
//   className = "" 
// }: WishlistItemProps) {
//   const router = useRouter();

//   // Handle null/undefined item
//   if (!item) {
//     return (
//       <div className={`border rounded-lg p-4 relative bg-gray-100 ${className}`}>
//         <p className="text-gray-500 text-center">عنصر غير متوفر</p>
//       </div>
//     );
//   }

//   const handleDetailsClick = () => {
//     let route = "";
//     switch (item.type) {
//       case "doctor":
//         route = `/doctors/${item.id}`;
//         break;
//       case "offer":
//         route = `/offers/${item.id}`;
//         break;
//       case "device":
//         route = `/devices/${item.id}`;
//         break;
//     }
    
//     if (route) {
//       router.push(route);
//     }
//   };

//   const baseClasses = variant === "compact" 
//     ? "border rounded-lg p-3 relative hover:shadow-md transition-shadow bg-white"
//     : "border rounded-lg p-4 relative hover:shadow-md transition-shadow bg-white";

//   return (
//     <div className={`${baseClasses} ${className}`}>
//       {/* Header with type icon and delete button */}
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center gap-2">
//           {getTypeIcon(item.type)}
//           <Badge variant="secondary" className="text-xs capitalize">
//             {item.type === "doctor" && "طبيب"}
//             {item.type === "offer" && "عرض"}
//             {item.type === "device" && "جهاز"}
//           </Badge>
//         </div>

//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-red-500 hover:text-red-700 p-1 h-auto"
//             >
//               <Trash2 className="w-4 h-4" />
//             </Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent dir="rtl">
//             <AlertDialogHeader>
//               <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
//               <AlertDialogDescription>
//                 هل أنت متأكد من إزالة هذا العنصر من قائمة الأمنيات؟
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>إلغاء</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => onRemove(item)}
//                 className="bg-red-600 hover:bg-red-700"
//               >
//                 حذف
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>

//       {/* Doctor Item */}
//       {isDoctor(item) && (
//         <div className="space-y-3">
//           <div>
//             <h3 className={`font-semibold text-gray-900 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
//               {item.name}
//             </h3>
//             <p className="text-[#CBA853] text-sm font-medium">{item.specialty}</p>
//           </div>
          
//           {item.services && (
//             <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
//               {item.services}
//             </p>
//           )}
          
//           {item.image && variant === "card" && (
//             <div className="rounded-lg overflow-hidden">
//               <img
//                 src={getImageUrl(item.image) || "/placeholder.svg"}
//                 alt={item.name}
//                 className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = "/placeholder.svg";
//                 }}
//               />
//             </div>
//           )}
          
//           <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//             <div className="text-xs text-gray-500">
//               أضيف في: {formatDate(item.created_at)}
//             </div>
//             {showDetailsButton && (
//               <Button
//                 onClick={handleDetailsClick}
//                 variant="outline"
//                 size="sm"
//                 className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
//               >
//                 <Eye className="w-3 h-3 ml-1" />
//                 التفاصيل
//               </Button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Offer Item */}
//       {isOffer(item) && (
//         <div className="space-y-3">
//           <div>
//             <h3 className={`font-semibold text-gray-900 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
//               {item.title}
//             </h3>
//             {item.description && (
//               <p className="text-sm text-gray-600 line-clamp-2 mt-1">
//                 {item.description}
//               </p>
//             )}
//           </div>

//           <div className="flex items-center gap-3 flex-wrap">
//             {item.priceBefore && (
//               <span className="text-gray-500 line-through text-sm">
//                 {item.priceBefore} ج.م
//               </span>
//             )}
//             {item.priceAfter && (
//               <span className="text-[#CBA853] font-bold text-lg">
//                 {item.priceAfter} ج.م
//               </span>
//             )}
//             {item.discountPercentage && (
//               <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
//                 خصم {item.discountPercentage}%
//               </Badge>
//             )}
//           </div>

//           {item.image && variant === "card" && (
//             <div className="rounded-lg overflow-hidden">
//               <img
//                 src={getImageUrl(item.image) || "/placeholder.svg"}
//                 alt={item.title}
//                 className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = "/placeholder.svg";
//                 }}
//               />
//             </div>
//           )}

//           <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//             <div className="text-xs text-gray-500">
//               أضيف في: {formatDate(item.created_at)}
//             </div>
//             {showDetailsButton && (
//               <Button
//                 onClick={handleDetailsClick}
//                 variant="outline"
//                 size="sm"
//                 className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
//               >
//                 <Eye className="w-3 h-3 ml-1" />
//                 التفاصيل
//               </Button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Device Item */}
//       {isDevice(item) && (
//         <div className="space-y-3">
//           <div>
//             <h3 className={`font-semibold text-gray-900 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
//               {item.name}
//             </h3>
//             {item.typee && (
//               <p className="text-[#CBA853] text-sm font-medium">{item.typee}</p>
//             )}
//           </div>

//           {parseAvailableTimes(item.available_times) && (
//             <div>
//               <Label className="text-sm font-medium text-gray-700">مواعيد العمل:</Label>
//               <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">
//                 {parseAvailableTimes(item.available_times)}
//               </p>
//             </div>
//           )}

//           {item.image_url && variant === "card" && (
//             <div className="rounded-lg overflow-hidden">
//               <img
//                 src={getImageUrl(item.image_url) || "/placeholder.svg"}
//                 alt={item.name}
//                 className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = "/placeholder.svg";
//                 }}
//               />
//             </div>
//           )}

//           <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//             <div className="text-xs text-gray-500">
//               أضيف في: {formatDate(item.created_at)}
//             </div>
//             {showDetailsButton && (
//               <Button
//                 onClick={handleDetailsClick}
//                 variant="outline"
//                 size="sm"
//                 className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
//               >
//                 <Eye className="w-3 h-3 ml-1" />
//                 التفاصيل
//               </Button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default WishlistItemComponent;