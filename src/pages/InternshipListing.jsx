"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setFilters, clearFilters } from "../store/slices/internshipSlice"
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"

const InternshipListing = () => {
  const dispatch = useDispatch()
  const { filteredInternships, filters } = useSelector((state) => state.internships)
  const [searchTerm, setSearchTerm] = useState(filters.search)

  useEffect(() => {
    // Update search filter when searchTerm changes
    if (searchTerm !== filters.search) {
      dispatch(setFilters({ search: searchTerm }))
    }
  }, [searchTerm, dispatch, filters.search])

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }))
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    dispatch(clearFilters())
  }

  const categories = ["Technology", "Marketing", "Design", "Finance"]
  const types = ["Remote", "On-site", "Hybrid"]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Internship</h1>
        <p className="text-gray-600">Discover opportunities that match your interests and career goals</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <label htmlFor="search" className="sr-only">
              Search internships
            </label>
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search"
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="sr-only">
              Filter by category
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label htmlFor="type" className="sr-only">
              Filter by work type
            </label>
            <select
              id="type"
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label htmlFor="location" className="sr-only">
              Filter by location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.category || filters.type || filters.location || filters.search) && (
          <button onClick={handleClearFilters} className="text-blue-600 hover:text-blue-800 font-medium">
            Clear all filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredInternships.length} internship{filteredInternships.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Internship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((internship) => (
            <article
              key={internship.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{internship.title}</h2>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
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

                <p className="text-gray-700 font-medium mb-2">{internship.company}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPinIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                    {internship.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <BriefcaseIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                    {internship.category}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <CurrencyDollarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                    {internship.stipend}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{internship.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {internship.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {req}
                    </span>
                  ))}
                  {internship.requirements.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{internship.requirements.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/internship/${internship.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/apply/${internship.id}`}
                    className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <BriefcaseIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <button onClick={handleClearFilters} className="text-blue-600 hover:text-blue-800 font-medium">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default InternshipListing
