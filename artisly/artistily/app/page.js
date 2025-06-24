import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Users, Mic, Headphones, Star, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: 1,
    name: "Singers",
    icon: Mic,
    description: "Professional vocalists for all occasions",
    count: "150+ Artists",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Dancers",
    icon: Users,
    description: "Choreographers and dance performers",
    count: "200+ Artists",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Speakers",
    icon: Headphones,
    description: "Motivational and keynote speakers",
    count: "80+ Artists",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "DJs",
    icon: Music,
    description: "Professional DJs and music producers",
    count: "120+ Artists",
    color: "bg-orange-500",
  },
]

const featuredArtists = [
  {
    id: 1,
    name: "Sarah Johnson",
    category: "Singer",
    location: "Mumbai, India",
    rating: 4.9,
    price: "₹15,000 - ₹25,000",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Raj Patel",
    category: "DJ",
    location: "Delhi, India",
    rating: 4.8,
    price: "₹20,000 - ₹35,000",
    image: "/placeholder.svg"
,
  },
  {
    id: 3,
    name: "Priya Sharma",
    category: "Dancer",
    location: "Bangalore, India",
    rating: 4.9,
    price: "₹12,000 - ₹20,000",
    image: "/placeholder.svg"
,
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Perfect Artists for Your Events</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with talented performers, musicians, speakers, and entertainers. Book the perfect artist for your
            next event with Artistly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/artists">
                <Users className="mr-2 h-5 w-5" />
                Browse Artists
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/onboard">
                <Star className="mr-2 h-5 w-5" />
                Join as Artist
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover talented artists across different categories for your events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary">{category.count}</Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Artists</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Meet some of our top-rated performers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{artist.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {artist.location}
                      </CardDescription>
                    </div>
                    <Badge>{artist.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{artist.rating}</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">{artist.price}</span>
                  </div>
                  <Button className="w-full">Ask for Quote</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/artists">View All Artists</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xl">Talented Artists</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-xl">Events Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Perfect Artist?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of event planners who trust Artistly for their entertainment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/artists">
                <Calendar className="mr-2 h-5 w-5" />
                Start Booking
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Link href="/dashboard">
                <Users className="mr-2 h-5 w-5" />
                Manager Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
