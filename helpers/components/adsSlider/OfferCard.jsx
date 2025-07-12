"use client"

import React, { memo } from "react"
import { useRouter } from "next/navigation"
import { getImageUrl } from "@/helpers/hooks/imageUrl"

const TourCard = memo(({ image, name, priceBefore, priceAfter, id, description, branches = [], onSelect }) => {
  const getBranchName = (branchName) => {
    const branchMap = {
      "فرع العوالي": "فرع العوالي",
      "فرع الخالدية": "فرع الخالدية",
      "فرع الشاطئ": "فرع الشاطئ",
      "فرع البساتين": "فرع البساتين",
      "ابحر الشمالية": "ابحر الشمالية",
      "فرع الطائف": "فرع الطائف",
    }
    return branchMap[branchName] || branchName
  }

  const router = useRouter()

  const handleOfferSelect = () => {
    if (onSelect) {
      onSelect({
        offer: name,
        priceBefore,
        priceAfter,
        description,
        image,
        branches,
      })
    }
  }

  const handleCardClick = () => {
    router.push(`/offers/${id}`)
  }

  const imageUrl = typeof image === "string" ? image : "/placeholder.svg"

  return (
    <div className="tour-card group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="aspect-w-4 aspect-h-3 w-full">
          <img
            src={getImageUrl(imageUrl) || "/download.png"}
            alt={name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            style={{ aspectRatio: "3/4", objectFit: "cover" }}
            loading="lazy"
            onError={(e) => {
              e.target.src = "/download.png"
            }}
          />
        </div>
        {branches.length > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
            {branches.length === 1
              ? getBranchName(branches[0].name)
              : `${branches.length} فروع`}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex flex-row-reverse items-start mb-2">
          {/* Price block on right */}
          <div className="flex flex-col items-center ml-3">
            <div className="gradient text-white w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-md p-1">
              <span className="text-xs line-through opacity-80">{priceBefore}</span>
              <span className="font-bold text-white text-sm">{priceAfter}</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">سعر للشخص</div>
          </div>

          {/* Name and description block */}
          <div className="flex-1 text-right">
            <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-2">{name}</h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-1">{description || "لا يوجد وصف"}</p>
          </div>
        </div>

        {/* Branches */}
        {branches.length > 0 && (
          <div className="mb-4 text-right">
            <p className="text-xs text-gray-500 mb-2">متوفر في:</p>
            <div className="flex flex-wrap gap-1 justify-start">
              {branches.map((branch, index) => (
                <span
                  key={index}
                  className="inline-block bg-gradient-to-r from-[#dec06a]/10 to-[#d4b45c]/10 text-[#dec06a] text-xs px-2 py-1 rounded-full border border-[#dec06a]/20"
                >
                  {getBranchName(branch.name)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={handleCardClick}
            className="w-full py-2 gradient text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#dec06a]/50"
            aria-label={`احجز العرض: ${name}`}
            style={{ borderRadius: "12px" }}
          >
            احجزي الآن
          </button>
        </div>
      </div>
    </div>
  )
})

TourCard.displayName = "TourCard"

export default TourCard
