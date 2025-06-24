"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Filter, Grid, List } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

// Mock data for artists
const mockArtists = [
  {
    id: 1,
    name: "Sarah Johnson",
    category: "Singer",
    location: "Mumbai",
    priceRange: "15000-25000",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Professional vocalist with 10+ years experience",
    languages: ["English", "Hindi"],
  },
  {
    id: 2,
    name: "Raj Patel",
    category: "DJ",
    location: "Delhi",
    priceRange: "20000-35000",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Electronic music producer and DJ",
    languages: ["Hindi", "English", "Gujarati"],
  },
  {
    id: 3,
    name: "Priya Sharma",
    category: "Dancer",
    location: "Bangalore",
    priceRange: "12000-20000",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Classical and contemporary dance performer",
    languages: ["English", "Hindi", "Kannada"],
  },
  {
    id: 4,
    name: "Michael Brown",
    category: "Speaker",
    location: "Mumbai",
    priceRange: "25000-40000",
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Motivational speaker and business coach",
    languages: ["English"],
  },
  {
    id: 5,
    name: "Anita Desai",
    category: "Singer",
    location: "Chennai",
    priceRange: "18000-28000",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Carnatic and Bollywood vocalist",
    languages: ["Tamil", "Hindi", "English"],
  },
  {
    id: 6,
    name: "DJ Arjun",
    category: "DJ",
    location: "Pune",
    priceRange: "15000-25000",
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Wedding and party specialist DJ",
    languages: ["Hindi", "Marathi", "English"],
  },
]

const categories = ["All", "Singer", "Dancer", "Speaker", "DJ"]
const locations = ["All", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"]
const priceRanges = [
  { label: "All", value: "all" },
  { label: "₹10,000 - ₹20,000", value: "10000-20000" },
  { label: "₹15,000 - ₹25,000", value: "15000-25000" },
  { label: "₹20,000 - ₹35,000", value: "20000-35000" },
  { label: "₹25,000 - ₹40,000", value: "25000-40000" },
]

export default function ArtistsPage() {
  const [artists, setArtists] = useState(mockArtists)
  const [filteredArtists, setFilteredArtists] = useState(mockArtists)
  const [filters, setFilters] = useState({
    category: "All",
    location: "All",
    priceRange: "all",
    search: "",
  })
  const [viewMode, setViewMode] = useState("grid")
  const { toast } = useToast()

  // Filter logic
  useEffect(() => {
    let filtered = artists

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (artist) =>
          artist.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          artist.bio.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Category filter
    if (filters.category !== "All") {
      filtered = filtered.filter((artist) => artist.category === filters.category)
    }

    // Location filter
    if (filters.location !== "All") {
      filtered = filtered.filter((artist) => artist.location === filters.location)
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      filtered = filtered.filter((artist) => artist.priceRange === filters.priceRange)
    }

    setFilteredArtists(filtered)
  }, [filters, artists])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleQuoteRequest = (artistName) => {
    toast({
      title: "Quote Request Sent!",
      description: `Your quote request for ${artistName} has been sent successfully.`,
    })
  }

  const formatPriceRange = (priceRange) => {
    const [min, max] = priceRange.split("-")
    return `₹${Number.parseInt(min).toLocaleString()} - ₹${Number.parseInt(max).toLocaleString()}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Artists</h1>
        <p className="text-gray-600 text-lg">Discover and book talented performers for your events</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <Input
              placeholder="Search artists..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* View Toggle and Results Count */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          Showing {filteredArtists.length} of {artists.length} artists
        </div>
        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Artists Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredArtists.map((artist) => (
          <Card
            key={artist.id}
            className={`overflow-hidden hover:shadow-lg transition-shadow ${
              viewMode === "list" ? "flex flex-row" : ""
            }`}
          >
            <div className={`relative ${viewMode === "list" ? "w-48 h-48" : "h-64"}`}>
              <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{artist.name}</CardTitle>
                    <div className="flex items-center mt-1 text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {artist.location}
                    </div>
                  </div>
                  <Badge>{artist.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">{artist.bio}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {artist.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{artist.rating}</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">{formatPriceRange(artist.priceRange)}</span>
                </div>
                <Button className="w-full" onClick={() => handleQuoteRequest(artist.name)}>
                  Ask for Quote
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredArtists.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No artists found matching your criteria</div>
          <Button onClick={() => setFilters({ category: "All", location: "All", priceRange: "all", search: "" })}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
