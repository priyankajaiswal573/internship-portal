"use client"
import { useParams, Link, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  MapPinIcon,
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline"

const InternshipDetail = () => {
  const { id } = useParams()
  const { internships } = useSelector((state) => state.internships)

  const internship = internships.find((intern) => intern.id === Number.parseInt(id))

  if (!internship) {
    return <Navigate to="/internships" replace />
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/internships" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
          <ArrowLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          Back to Internships
        </Link>
      </div>

      

        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{internship.title}</h1>
              <p className="text-xl text-gray-700 font-medium mb-4">{internship.company}</p>

              {/* Key Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BriefcaseIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                  <span>{internship.category}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CurrencyDollarIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                  <span>{internship.stipend}</span>
                </div>
              </div>

              {/* Type Badge */}
              <div className="mb-6">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    internship.type === "Remote"
                      ? "bg-green-100 text-green-800"
                      : internship.type === "Hybrid"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {internship.type}
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="lg:ml-8 mt-6 lg:mt-0">
              <Link
                to={`/apply/${internship.id}`}
                className="w-full lg:w-auto inline-flex justify-center items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Apply for this Internship
              </Link>
            </div>
          </div>

          {/* Description */}
          <section className="mb-8" aria-labelledby="description-heading">
            <h2 id="description-heading" className="text-2xl font-semibold text-gray-900 mb-4">
              About this Internship
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{internship.description}</p>
          </section>

          {/* Requirements */}
          <section className="mb-8" aria-labelledby="requirements-heading">
            <h2 id="requirements-heading" className="text-2xl font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <div className="flex flex-wrap gap-3">
              {internship.requirements.map((requirement, index) => (
                <span key={index} className="px-4 py-2 bg-blue-50 text-blue-800 rounded-lg font-medium">
                  {requirement}
                </span>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-8" aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="text-2xl font-semibold text-gray-900 mb-4">
              Important Dates
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-3" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-gray-900">Posted</p>
                    <p className="text-gray-600">{new Date(internship.posted).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-500 mr-3" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-gray-900">Application Deadline</p>
                    <p className="text-gray-600">{new Date(internship.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Apply?</h3>
            <p className="text-gray-600 mb-4">
              Don't miss out on this opportunity. Apply now and take the next step in your career.
            </p>
            <Link
              to={`/apply/${internship.id}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Now
            </Link>
          </div>
        </div>
      
    </main>
  )
}

export default InternshipDetail
