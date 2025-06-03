import { createSlice } from "@reduxjs/toolkit"

const mockInternships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Remote",
    category: "Technology",
    duration: "3 months",
    stipend: "$1500/month",
    description:
      "Join our frontend team to work on cutting-edge web applications using React and modern JavaScript frameworks.",
    requirements: ["React.js", "JavaScript", "HTML/CSS", "Git"],
    posted: "2024-01-15",
    deadline: "2024-02-15",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Marketing Intern",
    company: "Creative Agency",
    location: "New York, NY",
    type: "On-site",
    category: "Marketing",
    duration: "6 months",
    stipend: "$1200/month",
    description: "Help develop and execute marketing campaigns for our diverse client portfolio.",
    requirements: ["Social Media", "Content Creation", "Analytics", "Communication"],
    posted: "2024-01-10",
    deadline: "2024-02-10",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "DataTech Solutions",
    location: "Austin, TX",
    type: "Hybrid",
    category: "Technology",
    duration: "4 months",
    stipend: "$1800/month",
    description: "Work with our data science team to analyze large datasets and build predictive models.",
    requirements: ["Python", "SQL", "Machine Learning", "Statistics"],
    posted: "2024-01-12",
    deadline: "2024-02-20",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "UX Design Intern",
    company: "Design Studio",
    location: "Los Angeles, CA",
    type: "Remote",
    category: "Design",
    duration: "3 months",
    stipend: "$1400/month",
    description: "Create user-centered designs and prototypes for mobile and web applications.",
    requirements: ["Figma", "User Research", "Prototyping", "Design Thinking"],
    posted: "2024-01-08",
    deadline: "2024-02-08",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Finance Intern",
    company: "Investment Group",
    location: "Chicago, IL",
    type: "On-site",
    category: "Finance",
    duration: "6 months",
    stipend: "$2000/month",
    description: "Support financial analysis and investment research for our portfolio companies.",
    requirements: ["Excel", "Financial Modeling", "Analysis", "Bloomberg Terminal"],
    posted: "2024-01-14",
    deadline: "2024-02-25",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Content Writer Intern",
    company: "Media Company",
    location: "Seattle, WA",
    type: "Remote",
    category: "Marketing",
    duration: "4 months",
    stipend: "$1100/month",
    description: "Create engaging content for blogs, social media, and marketing materials.",
    requirements: ["Writing", "SEO", "Content Strategy", "WordPress"],
    posted: "2024-01-11",
    deadline: "2024-02-18",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const initialState = {
  internships: mockInternships,
  filteredInternships: mockInternships,
  filters: {
    category: "",
    location: "",
    type: "",
    search: "",
  },
  loading: false,
  error: null,
}

const internshipSlice = createSlice({
  name: "internships",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }

      // Apply filters
      let filtered = state.internships

      if (state.filters.category) {
        filtered = filtered.filter(
          (internship) => internship.category.toLowerCase() === state.filters.category.toLowerCase(),
        )
      }

      if (state.filters.location) {
        filtered = filtered.filter((internship) =>
          internship.location.toLowerCase().includes(state.filters.location.toLowerCase()),
        )
      }

      if (state.filters.type) {
        filtered = filtered.filter((internship) => internship.type.toLowerCase() === state.filters.type.toLowerCase())
      }

      if (state.filters.search) {
        filtered = filtered.filter(
          (internship) =>
            internship.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
            internship.company.toLowerCase().includes(state.filters.search.toLowerCase()),
        )
      }

      state.filteredInternships = filtered
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        location: "",
        type: "",
        search: "",
      }
      state.filteredInternships = state.internships
    },
  },
})

export const { setFilters, clearFilters } = internshipSlice.actions
export default internshipSlice.reducer
