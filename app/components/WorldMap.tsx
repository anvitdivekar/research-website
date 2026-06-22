"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const LOCATIONS = [
  // United States
  { name: "Columbia, SC",          lat: 34.00,  lon: -81.03  },
  { name: "Jersey City, NJ",       lat: 40.72,  lon: -74.04  },
  { name: "Cumming, GA",           lat: 34.21,  lon: -84.14  },
  { name: "New York City, NY",     lat: 40.71,  lon: -74.01  },
  { name: "Greensboro, NC",        lat: 36.07,  lon: -79.79  },
  { name: "San Ramon, CA",         lat: 37.78,  lon: -121.98 },
  { name: "Allendale, NJ",         lat: 41.03,  lon: -74.13  },
  { name: "Dublin, OH",            lat: 40.11,  lon: -83.11  },
  { name: "Abington, PA",          lat: 40.12,  lon: -75.12  },
  { name: "Los Altos, CA",         lat: 37.39,  lon: -122.11 },
  { name: "Houston, TX",           lat: 29.76,  lon: -95.37  },
  { name: "Northville, MI",        lat: 42.43,  lon: -83.48  },
  { name: "Shelby Township, MI",   lat: 42.67,  lon: -83.02  },
  { name: "Brooklyn, NY",          lat: 40.68,  lon: -73.94  },
  { name: "Powell, OH",            lat: 40.16,  lon: -83.07  },
  { name: "Frisco, TX",            lat: 33.15,  lon: -96.82  },
  { name: "Lathrop, CA",           lat: 37.82,  lon: -121.28 },
  { name: "Jacksonville, FL",      lat: 30.33,  lon: -81.66  },
  { name: "Plain City, OH",        lat: 40.11,  lon: -83.27  },
  { name: "Greenwood, IN",         lat: 39.61,  lon: -86.11  },
  { name: "Providence, RI",        lat: 41.82,  lon: -71.41  },
  { name: "Hamtramck, MI",         lat: 42.40,  lon: -83.05  },
  { name: "North Grafton, MA",     lat: 42.22,  lon: -71.69  },
  { name: "Cleveland, OH",         lat: 41.50,  lon: -81.69  },
  { name: "Cypress, TX",           lat: 29.97,  lon: -95.70  },
  { name: "Danville, CA",          lat: 37.82,  lon: -122.00 },
  { name: "Atlanta, GA",           lat: 33.75,  lon: -84.39  },
  { name: "Hackensack, NJ",        lat: 40.89,  lon: -74.04  },
  { name: "Harrisonburg, VA",      lat: 38.45,  lon: -78.87  },
  { name: "Fullerton, CA",         lat: 33.87,  lon: -117.93 },
  { name: "Waxhaw, NC",            lat: 34.92,  lon: -80.74  },
  { name: "Redmond, WA",           lat: 47.67,  lon: -122.12 },
  { name: "Winter Park, FL",       lat: 28.59,  lon: -81.34  },
  { name: "Fremont, CA",           lat: 37.55,  lon: -121.99 },
  { name: "San Francisco, CA",     lat: 37.77,  lon: -122.42 },
  { name: "Granite Bay, CA",       lat: 38.76,  lon: -121.17 },
  { name: "Robbinsville, NJ",      lat: 40.21,  lon: -74.59  },
  { name: "Nashua, NH",            lat: 42.77,  lon: -71.47  },
  { name: "Bedford, NH",           lat: 42.95,  lon: -71.52  },
  { name: "Allen, TX",             lat: 33.10,  lon: -96.67  },
  { name: "Melissa, TX",           lat: 33.29,  lon: -96.57  },
  { name: "Irvington, NY",         lat: 41.04,  lon: -73.87  },
  { name: "Irvine, CA",            lat: 33.68,  lon: -117.83 },
  { name: "Denver, CO",            lat: 39.74,  lon: -104.99 },
  { name: "McKinney, TX",          lat: 33.20,  lon: -96.64  },
  { name: "Dublin, CA",            lat: 37.70,  lon: -121.94 },
  { name: "Hollywood, FL",         lat: 26.01,  lon: -80.15  },
  { name: "Princeton, NJ",         lat: 40.36,  lon: -74.67  },
  { name: "Leander, TX",           lat: 30.58,  lon: -97.85  },
  { name: "Closter, NJ",           lat: 40.98,  lon: -73.96  },
  { name: "Hillsborough, NJ",      lat: 40.51,  lon: -74.65  },
  { name: "Woodstock, GA",         lat: 34.10,  lon: -84.52  },
  { name: "Bronx, NY",             lat: 40.84,  lon: -73.86  },
  // India
  { name: "Chennai",               lat: 13.08,  lon: 80.27   },
  { name: "Bhubaneswar",           lat: 20.30,  lon: 85.82   },
  { name: "Malda, West Bengal",    lat: 25.00,  lon: 88.14   },
  { name: "Bangalore",             lat: 12.97,  lon: 77.59   },
  { name: "Jaipur",                lat: 26.91,  lon: 75.79   },
  { name: "Rourkela",              lat: 22.23,  lon: 84.86   },
  { name: "New Delhi",             lat: 28.61,  lon: 77.21   },
  { name: "Gandhinagar",           lat: 23.22,  lon: 72.64   },
  // Pakistan
  { name: "Islamabad",             lat: 33.68,  lon: 73.05   },
  { name: "Lahore",                lat: 31.52,  lon: 74.36   },
  { name: "Karachi",               lat: 24.86,  lon: 67.00   },
  { name: "Quetta",                lat: 30.18,  lon: 66.98   },
  { name: "Dera Ismail Khan",      lat: 31.83,  lon: 70.90   },
  { name: "Swat",                  lat: 35.22,  lon: 72.43   },
  // Canada
  { name: "Brampton, ON",          lat: 43.73,  lon: -79.76  },
  { name: "London, ON",            lat: 42.98,  lon: -81.25  },
  { name: "Whitby, ON",            lat: 43.90,  lon: -78.94  },
  // Middle East
  { name: "Riyadh, Saudi Arabia",  lat: 24.71,  lon: 46.68   },
  { name: "Dubai, UAE",            lat: 25.20,  lon: 55.27   },
  // Africa
  { name: "Monrovia, Liberia",     lat: 6.30,   lon: -10.80  },
  { name: "Ogbomosho, Nigeria",    lat: 8.13,   lon: 4.24    },
  { name: "Owerri, Nigeria",       lat: 5.48,   lon: 7.01    },
  { name: "Addis Ababa, Ethiopia", lat: 9.03,   lon: 38.75   },
  // Egypt
  { name: "Berket El Sabaa",       lat: 30.68,  lon: 30.98   },
  { name: "Giza",                  lat: 30.01,  lon: 31.21   },
  { name: "Zagazig",               lat: 30.59,  lon: 31.50   },
  // Asia
  { name: "Changshu, China",       lat: 31.65,  lon: 120.75  },
  { name: "Dhaka, Bangladesh",     lat: 23.81,  lon: 90.41   },
  { name: "Mymensingh, Bangladesh",lat: 24.75,  lon: 90.42   },
  { name: "South Jakarta",         lat: -6.26,  lon: 106.81  },
  { name: "Konya, Turkey",         lat: 37.87,  lon: 32.48   },
  // Australia
  { name: "Sydney, NSW",           lat: -33.87, lon: 151.21  },
  { name: "Laylor Park, NSW",      lat: -33.75, lon: 150.85  },
  // Europe
  { name: "Cambridge, UK",         lat: 52.21,  lon: 0.12    },
  { name: "Calabria, Italy",       lat: 38.90,  lon: 16.59   },
];

export default function WorldMap() {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoNaturalEarth1"
        style={{ width: "100%", height: "100%" }}
        projectionConfig={{ scale: 145 }}
      >
        <ZoomableGroup center={[0, 10]} zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(14,165,233,0.08)"
                  stroke="rgba(56,189,248,0.25)"
                  strokeWidth={0.4}
                  style={{
                    default:  { outline: "none" },
                    hover:    { outline: "none", fill: "rgba(14,165,233,0.18)" },
                    pressed:  { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {LOCATIONS.map((loc) => (
            <Marker
              key={loc.name}
              coordinates={[loc.lon, loc.lat]}
              onMouseEnter={() => setTooltip(loc.name)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Outer pulse ring */}
              <circle r={3.5} fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.4)" strokeWidth={0.5} />
              {/* Inner bright dot */}
              <circle r={1.8} fill="#38bdf8" opacity={0.9} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs text-white/80 tracking-wide pointer-events-none"
          style={{ background: "rgba(6,6,22,0.85)", border: "1px solid rgba(56,189,248,0.3)" }}>
          {tooltip}
        </div>
      )}
    </div>
  );
}
