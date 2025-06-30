// "use client"

// import { useState } from "react"
// import { ChevronDown } from "lucide-react"

// interface Offer {
//   offer: string
//   price: string
//   description?: string
//   image: string 
//   branches: string[]
// }

// interface OfferDropdownProps {
//   offers: Offer[]
//   selectedBranch: string
//   selectedOffer?: string
//   onChange: (offerName: string) => void
//   disabled?: boolean
// }

// export default function OfferDropdown({
//   offers,
//   selectedBranch,
//   selectedOffer = "",
//   onChange,
//   disabled = false,
// }: OfferDropdownProps) {
//   const [isOpen, setIsOpen] = useState(false)

//   const filteredOffers = selectedBranch ? offers.filter((offer) => offer.branches.includes(selectedBranch)) : offers

//   const handleSelectOffer = (offer: Offer) => {
//     onChange(offer.offer)
//     setIsOpen(false)
//   }

//   if (!filteredOffers || filteredOffers.length === 0) {
//     return (
//       <div className="w-full relative group z-[111]">
//         <label
//           htmlFor="offer"
//           className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
//         >
//           اختر العرض
//         </label>
//         <div className="relative">
//           <button
//             type="button"
//             disabled={true}
//             className="w-full text-right text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent opacity-50 cursor-not-allowed"
//           >
//             لا توجد عروض في هذا الفرع
//           </button>
//         </div>
//         <input type="hidden" name="offer" value="" />
//       </div>
//     )
//   }

//   return (
//     <div className="w-full relative group z-10">
//       <label
//         htmlFor="offer"
//         className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
//       >
//         اختر العرض
//       </label>
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           disabled={disabled}
//           className="w-full text-right text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
//           aria-haspopup="listbox"
//           aria-expanded={isOpen}
//         >
//           {selectedOffer || "اختر العرض"}
//           <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//             <ChevronDown className="w-5 h-5 text-white/70" />
//           </div>
//         </button>

//         {isOpen && (
//           <ul
//             className="absolute z-[999] mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none text-right"
//             tabIndex={-1}
//             role="listbox"
//                         style={{ zIndex: 9999 }}

//           >
//             {filteredOffers.map((offer, index) => (
//               <li
//                 key={index}
//                 className="cursor-pointer select-none relative py-2 px-4 hover:bg-gray-100 text-gray-900"
//                 onClick={() => handleSelectOffer(offer)}
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={offer.image || "/placeholder.svg?height=48&width=48"}
//                     alt={offer.offer}
//                     className="w-12 h-12 rounded object-cover"
//                   />
//                   <div>
//                     <div className="font-medium">{offer.offer}</div>
//                     <div className="text-sm text-gray-500">{offer.price}</div>
//                     {offer.description && <div className="text-xs text-gray-400 line-clamp-1">{offer.description}</div>}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <input type="hidden" name="offer" value={selectedOffer} />
//     </div>
//   )
// }
