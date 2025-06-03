import { Link } from "react-router-dom"
import { ArrowRightIcon, BriefcaseIcon, UserGroupIcon, TrophyIcon } from "@heroicons/react/24/outline"

const LandingPage = () => {
  const features = [
    {
      icon: BriefcaseIcon,
      title: "Quality Internships",
      description: "Discover internships from top companies across various industries and locations.",
    },
    {
      icon: UserGroupIcon,
      title: "Easy Application",
      description: "Apply to multiple internships with our streamlined application process.",
    },
    {
      icon: TrophyIcon,
      title: "Career Growth",
      description: "Build your professional network and gain valuable work experience.",
    },
  ]

  const stats = [
    { number: "500+", label: "Active Internships" },
    { number: "50+", label: "Partner Companies" },
    { number: "1000+", label: "Successful Placements" },
    { number: "95%", label: "Satisfaction Rate" },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-32"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Dream
              <span className="block text-yellow-300">Internship</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              Connect with top companies and kickstart your career with meaningful internship opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/internships"
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                aria-label="Browse available internships"
              >
                Browse Internships
                <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose InternHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and apply for internships that match your career goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6 mx-auto">
                  <feature.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have found their perfect internship through our platform
          </p>
          <Link
            to="/internships"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            Get Started Today
            <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
