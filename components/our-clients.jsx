"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, X } from "lucide-react"

const allPartners = [
  // Power Sector
  {
    name: "NTPC Limited",
    category: "Power Generation",
    logo: "/static/clients/NTPC.png"
  },
  {
    name: "Tata Power",
    category: "Power Generation",
    logo: "/static/clients/Tata-Power.png"
  },
  {
    name: "Adani Power",
    category: "Power Generation",
    logo: "/static/clients/adani-power.webp"
  },
  {
    name: "TSGENCO",
    category: "Power Generation",
    logo: "/static/clients/TSGENCO.png"
  },
  {
    name: "SJVN Limited",
    category: "Power Generation",
    logo: "/static/clients/SJVN.png"
  },
  {
    name: "BHEL",
    category: "Power Equipment",
    logo: "/static/clients/BHEL.png"
  },
  {
    name: "Thermax",
    category: "Power Equipment",
    logo: "/static/clients/Thermax.png"
  },
  {
    name: "Alstom",
    category: "Power Equipment",
    logo: "/static/clients/Alstom.png"
  },

  // Oil & Gas Sector
  {
    name: "Indian Oil Corporation",
    category: "Oil & Gas",
    logo: "/static/clients/Indian-Oil.png"
  },
  {
    name: "ONGC",
    category: "Oil & Gas",
    logo: "/static/clients/ONGC.png"
  },
  {
    name: "HPCL",
    category: "Oil & Gas",
    logo: "/static/clients/HP-Petro.png"
  },
  {
    name: "MRPL",
    category: "Oil & Gas",
    logo: "/static/clients/MRPL.png"
  },
  {
    name: "Reliance Industries",
    category: "Oil & Gas",
    logo: "/static/clients/Reliance.jpg"
  },

  // Infrastructure & Construction
  {
    name: "Larsen & Toubro",
    category: "Infrastructure",
    logo: "/static/clients/larsen-toubro.png"
  },
  {
    name: "Shapoorji Pallonji",
    category: "Infrastructure",
    logo: "/static/clients/Shapoorji-Pallonji.png"
  },
  {
    name: "Simplex Infrastructure",
    category: "Infrastructure",
    logo: "/static/clients/Simplex-Infrastructures-Ltd.png"
  },
  {
    name: "Patel Engineering",
    category: "Infrastructure",
    logo: "/static/clients/patel-engineering.png"
  },
  {
    name: "Punj Lloyd",
    category: "Infrastructure",
    logo: "/static/clients/punj-lloyd.jpg"
  },
  {
    name: "NHAI",
    category: "Infrastructure",
    logo: "/static/clients/NHAI.png"
  },
  {
    name: "RITES",
    category: "Infrastructure",
    logo: "/static/clients/RITES.png"
  },

  // Engineering & Technology
  {
    name: "EIL",
    category: "Engineering",
    logo: "/static/clients/EIL.png"
  },
  {
    name: "PDIL",
    category: "Engineering",
    logo: "/static/clients/PDIL.jpg"
  },
  {
    name: "Development Consultants",
    category: "Engineering",
    logo: "/static/clients/Developemt-Consultants.jpg"
  },
  {
    name: "BGR Energy",
    category: "Engineering",
    logo: "/static/clients/BGR.png"
  },
  {
    name: "Wipro",
    category: "Technology",
    logo: "/static/clients/Wipro.png"
  },
  {
    name: "Toshiba",
    category: "Technology",
    logo: "/static/clients/Toshiba.webp"
  },

  // Water & Environment
  {
    name: "Ion Exchange",
    category: "Water Treatment",
    logo: "/static/clients/ion-exchange.png"
  },
  {
    name: "WABAG",
    category: "Water Treatment",
    logo: "/static/clients/wabag.webp"
  },
  {
    name: "TAHAL",
    category: "Water Treatment",
    logo: "/static/clients/TAHAL.png"
  },

  // Railways
  {
    name: "North Western Railway",
    category: "Railways",
    logo: "/static/clients/north-western-railway.jpeg"
  },
  {
    name: "RSRDC",
    category: "Railways",
    logo: "/static/clients/RSRDC.jpeg"
  },

  // Paper & Manufacturing
  {
    name: "JK Paper",
    category: "Manufacturing",
    logo: "/static/clients/JK-Paper.jpg"
  },
  {
    name: "West Coast Paper Mills",
    category: "Manufacturing",
    logo: "/static/clients/west-cost-paper-mills.jpg"
  },
  {
    name: "Vedanta",
    category: "Manufacturing",
    logo: "/static/clients/Vedanta.jpg"
  }
];


// Function to shuffle array
function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Distribute partners into three rows
const row1Partners = shuffleArray(allPartners).slice(0, 4)
const row2Partners = shuffleArray(allPartners.filter((p) => !row1Partners.includes(p))).slice(0, 4)
const row3Partners = shuffleArray(allPartners.filter((p) => !row1Partners.includes(p) && !row2Partners.includes(p)))

export function OurClients() {
  const scrollRef1 = useRef(null)
  const scrollRef2 = useRef(null)
  const scrollRef3 = useRef(null)
  const [showAllPartners, setShowAllPartners] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return // Don't run animation on mobile

    const scrollContainers = [scrollRef1.current, scrollRef2.current, scrollRef3.current]
    const speeds = [0.05, -0.05, 0.05]

    const animations = scrollContainers.map((container, index) => {
      if (!container) return null

      let animationId
      let lastTime = 0
      const speed = speeds[index]

      const scroll = (timestamp) => {
        if (!lastTime) lastTime = timestamp
        const elapsed = timestamp - lastTime
        lastTime = timestamp

        container.scrollLeft += speed * elapsed

        if (speed > 0 && container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0
        } else if (speed < 0 && container.scrollLeft <= 0) {
          container.scrollLeft = container.scrollWidth - container.clientWidth
        }

        animationId = requestAnimationFrame(scroll)
      }

      animationId = requestAnimationFrame(scroll)
      return () => cancelAnimationFrame(animationId)
    })

    return () => {
      animations.forEach((cleanup) => cleanup && cleanup())
    }
  }, [isMobile])

  // Effect to prevent body scrolling when modal is open
  useEffect(() => {
    if (showAllPartners) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showAllPartners])

  const renderPartnerRow = (partners, ref, className = "") => (
    <div
      ref={ref}
      className={`hidden md:flex gap-4 overflow-x-auto py-2 px-2 scrollbar-hide ${className}`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {[...partners, ...partners].map((partner, index) => (
        <div
          key={`${partner.name}-${index}`}
          className="flex-shrink-0 w-[280px] bg-white rounded-xl shadow-md p-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50">
              <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain p-2" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{partner.name}</h3>
              <p className="text-sm text-gray-500">{partner.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="py-10 bg-gradient-to-b from-blue-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 mb-10 lg:mb-0 lg:pr-12 text-center lg:text-left rounded-2xl overflow-hidden">
            <div className="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#1d4ed8] via-[#1e40af] to-[#111827] p-8 rounded-2xl">
              <div className="inline-block rounded-lg bg-white/20 px-4 py-2 text-sm text-white mb-4 backdrop-blur-sm">
               Clients who Trust us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Clients</h2>
              <p className="text-gray-200 text-lg mb-6">
              We work with respected brands across engineering, construction, and protection services.
              </p>
              <button
                onClick={() => setShowAllPartners(true)}
                className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-[1.02] inline-flex items-center justify-center"
              >
                View Our Clients
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Content - Scrolling Partners (Hidden on Mobile) */}
          <div className="hidden lg:block lg:w-2/3 relative overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-blue-950 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-blue-950 to-transparent pointer-events-none"></div>

            {/* Three Rows of Scrolling Partners */}
            <div className="space-y-4">
              {renderPartnerRow(row1Partners, scrollRef1)}
              {renderPartnerRow(row2Partners, scrollRef2)}
              {renderPartnerRow(row3Partners, scrollRef3)}
            </div>
          </div>
        </div>
      </div>

      {/* All Partners Popup Modal */}
      {showAllPartners && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">Our Clients</h3>
              <button
                onClick={() => setShowAllPartners(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content - Partners Grid */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allPartners.map((partner, index) => (
                  <div
                    key={`grid-${partner.name}-${index}`}
                    className="bg-[#5DD1D1]/20 rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white mb-3 flex items-center justify-center p-3">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        width={80}
                        height={80}
                        className="object-contain max-h-full"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 text-center line-clamp-1">{partner.name}</h4>
                    <p className="text-xs text-gray-500 text-center">{partner.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
