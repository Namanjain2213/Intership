"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Star, Calendar, Filter, Eye, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for artist submissions
const mockSubmissions = [
  {
    id: 1,
    name: "Sarah Johnson",
    category: "Singer",
    location: "Mumbai",
    feeRange: "₹15,000 - ₹25,000",
    status: "pending",
    submittedDate: "2024-01-15",
    rating: 4.9,
    languages: ["English", "Hindi"],
    bio: "Professional vocalist with 10+ years experience in Bollywood and Western music.",
    phone: "+91 9876543210",
    email: "sarah.johnson@email.com",
  },
  {
    id: 2,
    name: "Raj Patel",
    category: "DJ",
    location: "Delhi",
    feeRange: "₹20,000 - ₹35,000",
    status: "approved",
    submittedDate: "2024-01-12",
    rating: 4.8,
    languages: ["Hindi", "English", "Gujarati"],
    bio: "Electronic music producer and DJ specializing in wedding and corporate events.",
    phone: "+91 9876543211",
    email: "raj.patel@email.com",
  },
  {
    id: 3,
    name: "Priya Sharma",
    category: "Dancer",
    location: "Bangalore",
    feeRange: "₹12,000 - ₹20,000",
    status: "approved",
    submittedDate: "2024-01-10",
    rating: 4.9,
    languages: ["English", "Hindi", "Kannada"],
    bio: "Classical and contemporary dance performer with expertise in Bharatanatyam and modern dance.",
    phone: "+91 9876543212",
    email: "priya.sharma@email.com",
  },
  {
    id: 4,
    name: "Michael Brown",
    category: "Speaker",
    location: "Mumbai",
    feeRange: "₹25,000 - ₹40,000",
    status: "rejected",
    submittedDate: "2024-01-08",
    rating: 4.7,
    languages: ["English"],
    bio: "Motivational speaker and business coach with 15+ years of corporate experience.",
    phone: "+91 9876543213",
    email: "michael.brown@email.com",
  },
  {
    id: 5,
    name: "Anita Desai",
    category: "Singer",
    location: "Chennai",
    feeRange: "₹18,000 - ₹28,000",
    status: "pending",
    submittedDate: "2024-01-14",
    rating: 4.8,
    languages: ["Tamil", "Hindi", "English"],
    bio: "Carnatic and Bollywood vocalist with a unique blend of traditional and contemporary styles.",
    phone: "+91 9876543214",
    email: "anita.desai@email.com",
  },
]

const stats = [
  {
    title: "Total Artists",
    value: "156",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Pending Reviews",
    value: "23",
    change: "+5%",
    icon: Calendar,
    color: "text-orange-600",
  },
  {
    title: "Approved Artists",
    value: "128",
    change: "+8%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Average Rating",
    value: "4.7",
    change: "+0.2",
    icon: Star,
    color: "text-yellow-600",
  },
]

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions)
  const [filteredSubmissions, setFilteredSubmissions] = useState(mockSubmissions)
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    search: "",
  })
  const [selectedArtist, setSelectedArtist] = useState(null)
  const { toast } = useToast()

  // Filter submissions
  const applyFilters = () => {
    let filtered = submissions

    if (filters.search) {
      filtered = filtered.filter(
        (submission) =>
          submission.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          submission.location.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((submission) => submission.status === filters.status)
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((submission) => submission.category === filters.category)
    }

    setFilteredSubmissions(filtered)
  }

  // Apply filters whenever filter state changes
  useState(() => {
    applyFilters()
  }, [filters, submissions])

  const handleStatusChange = (id, newStatus) => {
    setSubmissions((prev) =>
      prev.map((submission) => (submission.id === id ? { ...submission, status: newStatus } : submission)),
    )

    const artist = submissions.find((s) => s.id === id)
    toast({
      title: `Artist ${newStatus}`,
      description: `${artist?.name} has been ${newStatus}.`,
    })
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "secondary", label: "Pending" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
    }

    const config = statusConfig[status] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Manager Dashboard</h1>
        <p className="text-gray-600 text-lg">Manage artist applications and monitor platform performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <Input
                placeholder="Search by name or location..."
                value={filters.search}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                  applyFilters()
                }}
                className="w-full"
              />
            </div>

            {/* Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value) => {
                setFilters((prev) => ({ ...prev, status: value }))
                applyFilters()
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={filters.category}
              onValueChange={(value) => {
                setFilters((prev) => ({ ...prev, category: value }))
                applyFilters()
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Singer">Singer</SelectItem>
                <SelectItem value="Dancer">Dancer</SelectItem>
                <SelectItem value="Speaker">Speaker</SelectItem>
                <SelectItem value="DJ">DJ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Artist Applications</CardTitle>
          <CardDescription>Review and manage artist registration submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Fee Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{submission.category}</Badge>
                    </TableCell>
                    <TableCell>{submission.location}</TableCell>
                    <TableCell>{submission.feeRange}</TableCell>
                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    <TableCell>{new Date(submission.submittedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedArtist(submission)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{selectedArtist?.name}</DialogTitle>
                              <DialogDescription>Artist Application Details</DialogDescription>
                            </DialogHeader>
                            {selectedArtist && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>Category:</strong> {selectedArtist.category}
                                  </div>
                                  <div>
                                    <strong>Location:</strong> {selectedArtist.location}
                                  </div>
                                  <div>
                                    <strong>Fee Range:</strong> {selectedArtist.feeRange}
                                  </div>
                                  <div>
                                    <strong>Rating:</strong> ⭐ {selectedArtist.rating}
                                  </div>
                                </div>
                                <div>
                                  <strong>Languages:</strong>
                                  <div className="flex gap-2 mt-1">
                                    {selectedArtist.languages.map((lang) => (
                                      <Badge key={lang} variant="secondary">
                                        {lang}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <strong>Bio:</strong>
                                  <p className="mt-1 text-gray-600">{selectedArtist.bio}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>Phone:</strong> {selectedArtist.phone}
                                  </div>
                                  <div>
                                    <strong>Email:</strong> {selectedArtist.email}
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Button
                                    onClick={() => handleStatusChange(selectedArtist.id, "approved")}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleStatusChange(selectedArtist.id, "rejected")}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {submission.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(submission.id, "approved")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(submission.id, "rejected")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8 text-gray-500">No applications found matching your criteria</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
