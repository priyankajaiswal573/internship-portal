"use client"

import { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { submitApplication, clearSubmitSuccess } from "../store/slices/applicationSlice"
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

const ApplicationForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { internships } = useSelector((state) => state.internships)
  const { submitSuccess } = useSelector((state) => state.applications)

  const internship = internships.find((intern) => intern.id === Number.parseInt(id))

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    graduationYear: "",
    gpa: "",
    coverLetter: "",
    resume: null,
    linkedinUrl: "",
    portfolioUrl: "",
    availability: "",
    experience: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (submitSuccess) {
      // Clear success state after showing success message
      const timer = setTimeout(() => {
        dispatch(clearSubmitSuccess())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitSuccess, dispatch])

  if (!internship) {
    return <Navigate to="/internships" replace />
  }

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields validation
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "university",
      "major",
      "graduationYear",
      "coverLetter",
    ]
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-$$$$]+$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // GPA validation
    if (formData.gpa && (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 4)) {
      newErrors.gpa = "GPA must be a number between 0 and 4"
    }

    // Graduation year validation
    const currentYear = new Date().getFullYear()
    if (
      formData.graduationYear &&
      (isNaN(formData.graduationYear) ||
        formData.graduationYear < currentYear ||
        formData.graduationYear > currentYear + 10)
    ) {
      newErrors.graduationYear = "Please enter a valid graduation year"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      dispatch(
        submitApplication({
          internshipId: Number.parseInt(id),
          formData: formData,
        }),
      )
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for applying to the {internship.title} position at {internship.company}. We'll review your
            application and get back to you soon.
          </p>
          <div className="space-y-4">
            <Link
              to={`/internship/${id}`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View Internship Details
            </Link>
            <br />
            <Link to="/internships" className="inline-block text-blue-600 hover:text-blue-800">
              Browse More Internships
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to={`/internship/${id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          Back to Internship Details
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Apply for Internship</h1>
          <p className="text-blue-100">
            {internship.title} at {internship.company}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <section aria-labelledby="personal-info-heading">
            <h2 id="personal-info-heading" className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Education Information */}
          <section aria-labelledby="education-info-heading">
            <h2 id="education-info-heading" className="text-xl font-semibold text-gray-900 mb-4">
              Education Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                  University/College *
                </label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.university ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.university ? "university-error" : undefined}
                />
                {errors.university && (
                  <p id="university-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.university}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                  Major/Field of Study *
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.major ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.major ? "major-error" : undefined}
                />
                {errors.major && (
                  <p id="major-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.major}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Graduation Year *
                </label>
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 10}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.graduationYear ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.graduationYear ? "graduationYear-error" : undefined}
                />
                {errors.graduationYear && (
                  <p id="graduationYear-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.graduationYear}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
                  GPA (Optional)
                </label>
                <input
                  type="number"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  max="4"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.gpa ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.gpa ? "gpa-error" : undefined}
                />
                {errors.gpa && (
                  <p id="gpa-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.gpa}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section aria-labelledby="additional-info-heading">
            <h2 id="additional-info-heading" className="text-xl font-semibold text-gray-900 mb-4">
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio/Website URL
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select availability</option>
                  <option value="immediately">Immediately</option>
                  <option value="2-weeks">2 weeks notice</option>
                  <option value="1-month">1 month notice</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe any relevant work experience, projects, or skills..."
                />
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.coverLetter ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us why you're interested in this internship and what makes you a great candidate..."
                  aria-describedby={errors.coverLetter ? "coverLetter-error" : undefined}
                />
                {errors.coverLetter && (
                  <p id="coverLetter-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.coverLetter}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                  Resume (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default ApplicationForm
