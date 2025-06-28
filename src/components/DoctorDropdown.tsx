"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface Doctor {
  name: string
  specialization: string
  image: string
  branches: string[] // Changed from branch?: string to branches: string[]
}

interface DoctorDropdownProps {
  doctors: Doctor[]
  selectedBranch: string
  selectedDoctor?: string
  onChange: (doctorName: string) => void
  disabled?: boolean
}

export default function DoctorDropdown({
  doctors,
  selectedBranch,
  selectedDoctor = "",
  onChange,
  disabled = false,
}: DoctorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])

  // Filter doctors when branch changes
  useEffect(() => {
    if (!selectedBranch) {
      setFilteredDoctors(doctors)
    } else {
      const filtered = doctors.filter((doctor) => doctor.branches.includes(selectedBranch))
      setFilteredDoctors(filtered)
    }
  }, [selectedBranch, doctors])

  const handleSelectDoctor = (doctor: Doctor) => {
    onChange(doctor.name)
    setIsOpen(false)
  }

  if (!filteredDoctors || filteredDoctors.length === 0) {
    return (
      <div className="w-full relative group z-[111]">
        <label
          htmlFor="doctor"
          className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
        >
          اختر الطبيب
        </label>
        <div className="relative">
          <button
            type="button"
            disabled={true}
            className="w-full text-right text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent opacity-50 cursor-not-allowed"
          >
            لا يوجد أطباء في هذا الفرع
          </button>
        </div>
        <input type="hidden" name="doctor" value="" />
      </div>
    )
  }

  return (
    <div className="w-full relative group">
      <label
        htmlFor="doctor"
        className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
      >
        اختر الطبيب
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-full text-right text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedDoctor || "اختر الطبيب"}
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <ChevronDown className="w-5 h-5 text-white/70" />
          </div>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60  focus:outline-none text-right"
            tabIndex={-1}
            role="listbox"
                        style={{ zIndex: 9999 }}

          >
            {filteredDoctors.map((doctor, index) => (
              <li
                key={index}
                className="cursor-pointer select-none relative py-2 px-4 hover:bg-gray-100 text-gray-900 flex items-center gap-3"
                onClick={() => handleSelectDoctor(doctor)}
              >
                <img
                  src={doctor.image || "/placeholder.svg?height=40&width=40"}
                  alt={doctor.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{doctor.name}</div>
                  <div className="text-sm text-gray-500">{doctor.specialization}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <input type="hidden" name="doctor" value={selectedDoctor} />
    </div>
  )
}
