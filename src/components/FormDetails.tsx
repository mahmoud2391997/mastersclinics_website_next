"use client"

import type React from "react"
import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react"
import DoctorDropdown from "@/components/DoctorDropdown"
import OfferDropdown from "@/components/offerDropDown"
import { makeAppointment } from "@/pages/api/content"
import { useParams, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

interface Doctor {
  name: string
  specialization: string
  image: string
  branches: string[]
}

interface Offer {
  offer: string
  price: string
  description?: string
  image: string
  branches: string[]
}

interface FormData {
  name: string
  phone: string
  branch: string
  doctor?: string
  offer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  createdAt: string
  landingPageId?: string
}

interface CtaFormProps {
  doctors?: Doctor[]
  offers?: Offer[]
  onSubmit?: (data: FormData) => Promise<void>
  onBranchChange?: (branch: string, availableDoctors: Doctor[], availableOffers: Offer[]) => void
  onDoctorSelect?: (doctor: Doctor, branch: string) => void
  onOfferSelect?: (offer: Offer, branch: string) => void
}

export interface CtaFormRef {
  selectDoctor: (doctorName: string, branch?: string) => void
  selectOffer: (offerName: string, branch?: string) => void
  focus: () => void
  reset: () => void
  getCurrentSelection: () => { doctor?: string; offer?: string; branch: string }
  resetForm: () => void
}

const CtaForm = forwardRef<CtaFormRef, CtaFormProps>(
  ({ doctors = [], offers = [], onSubmit, onBranchChange, onDoctorSelect, onOfferSelect }, ref) => {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      branch: "",
    })
    const [isLoading] = useState({
      submission: false,
    })
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const [selectedDoctor, setSelectedDoctor] = useState("")
    const [selectedOffer, setSelectedOffer] = useState("")
    const [selectedBranch, setSelectedBranch] = useState("")
    const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>(doctors)
    const [availableOffers, setAvailableOffers] = useState<Offer[]>(offers)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [branchOptions] = useState([
      { value: "فرع العوالي", label: "فرع العوالي" },
      { value: "فرع الخالدية", label: "فرع الخالدية" },
      { value: "فرع الشاطئ", label: "فرع الشاطئ" },
      { value: "فرع البساتين", label: "فرع البساتين" },
      { value: "ابحر الشمالية", label: "ابحر الشمالية" },
      { value: "فرع الطائف", label: "فرع الطائف" },
    ])

    const searchParams = useSearchParams()
    const params = useParams()
    const router = useRouter()

    // Enhanced branch change handler
    const handleBranchChange = useCallback(
      (newBranch: string) => {
        console.log("Branch manually changed to:", newBranch)
        setSelectedBranch(newBranch)

        // Clear doctor and offer selections when branch is manually changed
        setSelectedDoctor("")
        setSelectedOffer("")

        if (!newBranch) {
          // If no branch selected, show all doctors and offers
          setAvailableDoctors(doctors)
          setAvailableOffers(offers)
          return
        }

        // Filter doctors and offers for the selected branch
        const filteredDoctors = doctors.filter((doctor) => doctor.branches.includes(newBranch))
        const filteredOffers = offers.filter((offer) => offer.branches.includes(newBranch))

        setAvailableDoctors(filteredDoctors)
        setAvailableOffers(filteredOffers)

        // Notify parent component about branch change
        if (onBranchChange) {
          onBranchChange(newBranch, filteredDoctors, filteredOffers)
        }
      },
      [doctors, offers, onBranchChange],
    )

    // Enhanced doctor selection handler with automatic branch setting
    const handleDoctorSelection = useCallback(
      (doctorName: string) => {
        console.log("Doctor selected:", doctorName)
        setSelectedDoctor(doctorName)

        // Find the selected doctor object
        const selectedDoctorObj = doctors.find((doctor) => doctor.name === doctorName)
        if (selectedDoctorObj && selectedDoctorObj.branches.length > 0) {
          // If no branch is selected or the current branch doesn't support this doctor, 
          // set to the first available branch for this doctor
          if (!selectedBranch || !selectedDoctorObj.branches.includes(selectedBranch)) {
            const doctorBranch = selectedDoctorObj.branches[0]
            console.log("Setting branch for doctor:", doctorBranch)
            setSelectedBranch(doctorBranch)
            
            // Update available doctors and offers for the new branch
            const filteredDoctors = doctors.filter((doctor) => doctor.branches.includes(doctorBranch))
            const filteredOffers = offers.filter((offer) => offer.branches.includes(doctorBranch))
            setAvailableDoctors(filteredDoctors)
            setAvailableOffers(filteredOffers)
          }

          // Clear offer selection when doctor is selected
          setSelectedOffer("")

          if (onDoctorSelect) {
            onDoctorSelect(selectedDoctorObj, selectedBranch || selectedDoctorObj.branches[0])
          }
        }
      },
      [doctors, offers, selectedBranch, onDoctorSelect],
    )

    // Enhanced offer selection handler with automatic branch setting
    const handleOfferSelection = useCallback(
      (offerName: string) => {
        console.log("Offer selected:", offerName)
        setSelectedOffer(offerName)

        // Find the selected offer object
        const selectedOfferObj = offers.find((offer) => offer.offer === offerName)
        if (selectedOfferObj && selectedOfferObj.branches.length > 0) {
          // If no branch is selected or the current branch doesn't support this offer,
          // set to the first available branch for this offer
          if (!selectedBranch || !selectedOfferObj.branches.includes(selectedBranch)) {
            const offerBranch = selectedOfferObj.branches[0]
            console.log("Setting branch for offer:", offerBranch)
            setSelectedBranch(offerBranch)
            
            // Update available doctors and offers for the new branch
            const filteredDoctors = doctors.filter((doctor) => doctor.branches.includes(offerBranch))
            const filteredOffers = offers.filter((offer) => offer.branches.includes(offerBranch))
            setAvailableDoctors(filteredDoctors)
            setAvailableOffers(filteredOffers)
          }

          // Clear doctor selection when offer is selected
          setSelectedDoctor("")

          if (onOfferSelect) {
            onOfferSelect(selectedOfferObj, selectedBranch || selectedOfferObj.branches[0])
          }
        }
      },
      [offers, doctors, selectedBranch, onOfferSelect],
    )

    // Initialize doctors and offers when props change
    useEffect(() => {
      setAvailableDoctors(doctors)
      setAvailableOffers(offers)
    }, [doctors, offers])

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      selectDoctor: (doctorName: string, branch?: string) => {
        console.log("selectDoctor called with:", doctorName, branch)
        if (branch && branch !== selectedBranch) {
          console.log("Setting branch first:", branch)
          setSelectedBranch(branch)
          // Filter doctors and offers for the new branch
          const filteredDoctors = doctors.filter((doctor) => doctor.branches.includes(branch))
          const filteredOffers = offers.filter((offer) => offer.branches.includes(branch))
          setAvailableDoctors(filteredDoctors)
          setAvailableOffers(filteredOffers)
          // Wait for state to update, then set doctor
          setTimeout(() => {
            handleDoctorSelection(doctorName)
          }, 100)
        } else {
          handleDoctorSelection(doctorName)
        }
      },
      selectOffer: (offerName: string, branch?: string) => {
        console.log("selectOffer called with:", offerName, branch)
        if (branch && branch !== selectedBranch) {
          console.log("Setting branch first:", branch)
          setSelectedBranch(branch)
          // Filter doctors and offers for the new branch
          const filteredDoctors = doctors.filter((doctor) => doctor.branches.includes(branch))
          const filteredOffers = offers.filter((offer) => offer.branches.includes(branch))
          setAvailableDoctors(filteredDoctors)
          setAvailableOffers(filteredOffers)
          // Wait for state to update, then set offer
          setTimeout(() => {
            handleOfferSelection(offerName)
          }, 100)
        } else {
          handleOfferSelection(offerName)
        }
      },
      focus: () => {
        // Focus on the first input field
        const nameInput = document.getElementById("name")
        if (nameInput) {
          nameInput.focus()
        }
      },
      reset: () => {
        // Reset all form state
        setFormData({ name: "", phone: "", branch: "" })
        setSelectedDoctor("")
        setSelectedOffer("")
        setSelectedBranch("")
        setAvailableDoctors([])
        setAvailableOffers([])
        setSubmitStatus("idle")
        setErrorMessage("")
      },
      getCurrentSelection: () => ({
        doctor: selectedDoctor || undefined,
        offer: selectedOffer || undefined,
        branch: selectedBranch,
      }),
      resetForm: () => {
        setFormData({ name: "", phone: "", branch: "" })
        setSelectedDoctor("")
        setSelectedOffer("")
        setSelectedBranch("")
        setAvailableDoctors([])
        setAvailableOffers([])
        setSubmitStatus("idle")
        setErrorMessage("")
      },
    }))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSubmitting(true)
      setSubmitStatus("idle")

      try {
        const form = e.currentTarget
        const formData = new FormData(form)
        const utm_source = searchParams.get("utm_source")

        // Collect form data
        const submissionData: FormData = {
          name: formData.get("name") as string,
          phone: formData.get("phone") as string,
          branch: selectedBranch,
          createdAt: new Date().toISOString(),
        }

        if (utm_source) {
          submissionData.utmSource = utm_source
        }
        if (params?.id) {
          submissionData.landingPageId = params.id as string
        }

        // Add doctor and offer if selected
        if (selectedDoctor) {
          submissionData.doctor = selectedDoctor
        }

        if (selectedOffer) {
          submissionData.offer = selectedOffer
        }

        console.log("Submitting appointment data:", submissionData)

        // Submit the appointment
        if (onSubmit) {
          await onSubmit(submissionData)
        } else {
          await makeAppointment(submissionData)
        }

        setSubmitStatus("success")

        // Redirect to thank you page after successful submission
        setTimeout(() => {
          router.push("/thankyou")
        }, 1500)

        // Reset form after successful submission
        setTimeout(() => {
          if (form) {
            form.reset()
            setSelectedDoctor("")
            setSelectedOffer("")
            setSelectedBranch("")
            setFormData({ name: "", phone: "", branch: "" })
          }
        }, 100)

        // Reset success status after showing message
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 3000)
      } catch (error) {
        console.error("Error submitting appointment:", error)
        setSubmitStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "حدث خطأ غير متوقع")

        // Reset error status after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle")
          setErrorMessage("")
        }, 5000)
      } finally {
        setIsSubmitting(false)
      }
    }

    const showDoctors = availableDoctors.length > 0
    const showOffers = availableOffers.length > 0

    return (
      <div className="w-full" id="booking-form">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 w-full">
          <div className="flex flex-col md:flex-row-reverse md:items-end gap-4 w-full justify-center">
            {/* Name Input */}
            <div className="w-full md:w-1/3 lg:w-1/4 relative group">
              <label
                htmlFor="name"
                className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
              >
                الاسم الكامل*
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                dir="rtl"
                placeholder="الاسم الكامل*"
                required
                disabled={isLoading.submission}
                className="w-full text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/70 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Phone Input */}
            <div className="w-full md:w-1/3 lg:w-1/4 relative group">
              <label
                htmlFor="phone"
                className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
              >
                رقم الهاتف*
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                dir="rtl"
                placeholder="رقم الهاتف*"
                required
                disabled={isLoading.submission}
                className="w-full text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/70 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Branch Select */}
            <div className="w-full md:w-1/3 lg:w-1/4 relative group branch-field">
              <label
                htmlFor="branch"
                className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
              >
                اختر الفرع*
              </label>
              <div className="relative">
                <select
                  id="branch"
                  name="branch"
                  value={selectedBranch}
                  required
                  onChange={(e) => {
                    const newBranch = e.target.value
                    console.log("Branch selection changed:", newBranch)
                    handleBranchChange(newBranch)
                  }}
                  dir="rtl"
                  disabled={isLoading.submission}
                  className="w-full appearance-none text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 pr-10 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">{"اختر الفرع*"}</option>
                  {branchOptions.map((branch) => (
                    <option key={branch.value} value={branch.value} className="text-gray-900">
                      {branch.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Second row - Always shows doctors/offers if available */}
          {(showDoctors || showOffers) && (
            <div className="flex flex-col md:flex-row-reverse md:items-end gap-4 w-full justify-center">
              {/* Doctors Dropdown - Shows if doctors are available */}
              {showDoctors && (
                <div className="w-full md:w-1/2 lg:w-3/8 doctor-field">
                  <DoctorDropdown
                    doctors={availableDoctors}
                    selectedBranch={selectedBranch}
                    selectedDoctor={selectedDoctor}
                    onChange={handleDoctorSelection}
                    disabled={isLoading.submission}
                  />
                </div>
              )}

              {/* Offers Dropdown - Shows if offers are available */}
              {showOffers && (
                <div className="w-full md:w-1/2 lg:w-3/8 offer-field">
                  <OfferDropdown
                    offers={availableOffers}
                    selectedBranch={selectedBranch}
                    selectedOffer={selectedOffer}
                    onChange={handleOfferSelection}
                    disabled={isLoading.submission}
                  />
                </div>
              )}
            </div>
          )}

          {/* Selection Summary - Shows current selections */}
          {(selectedDoctor || selectedOffer) && (
            <div className="w-full md:w-[77%] bg-white/10 rounded-lg p-3 text-white text-sm">
              <div className="text-center">
                {selectedBranch && <span className="font-medium">الفرع: {selectedBranch}</span>}
                {selectedDoctor && (
                  <span className="block mt-1">
                    <span className="font-medium">الطبيب:</span> {selectedDoctor}
                  </span>
                )}
                {selectedOffer && (
                  <span className="block mt-1">
                    <span className="font-medium">العرض:</span> {selectedOffer}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="w-full md:w-[77%] mt-2 md:mt-0">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-live="polite"
              aria-busy={isSubmitting}
              aria-describedby={submitStatus !== "idle" ? "submit-status" : undefined}
              className={`w-full px-8 h-[56px] rounded-xl text-lg font-semibold text-center leading-normal border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 transform shadow-lg ${
                isSubmitting
                  ? "bg-white/50 text-gray-500 cursor-not-allowed"
                  : submitStatus === "success"
                    ? "bg-green-500 text-white border-green-400"
                    : submitStatus === "error"
                      ? "bg-red-500 text-white border-red-400"
                      : "bg-white text-[#D4AF37] hover:text-[#B7950B] hover:border-white/20 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                  جاري الإرسال...
                </div>
              ) : submitStatus === "success" ? (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تم الإرسال بنجاح!
                </div>
              ) : submitStatus === "error" ? (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  حدث خطأ، حاول مرة أخرى
                </div>
              ) : (
                <>
                  <span className="ml-2">←</span>
                  احجزي الآن
                </>
              )}
            </button>
            {submitStatus !== "idle" && (
              <div id="submit-status" className="sr-only">
                {submitStatus === "success" ? "Form submitted successfully" : "Error submitting form"}
              </div>
            )}
          </div>
        </form>

        {submitStatus === "success" && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {errorMessage || "حدث خطأ أثناء إرسال طلب الحجز. يرجى المحاولة مرة أخرى."}
          </div>
        )}
      </div>
    )
  },
)

CtaForm.displayName = "CtaForm"

export default CtaForm
