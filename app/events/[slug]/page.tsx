import { notFound } from "next/navigation";
import { getEventBySlug, getEventsByType, eventDetails } from "@/lib/event-details";
import Navbar from "@/components/navbar";
import EventSubNav from "@/components/EventSubNav";
import EventTimeline from "@/components/EventTimeline";
import EventHeroTitle from "@/components/EventHeroTitle";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all events (App Router optimization)
export function generateStaticParams() {
  return eventDetails.map((event) => ({
    slug: event.slug,
  }));
}

// Metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  
  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.eventName} | IEEE BVICAM`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Get all events of the same type for sub-navigation
  const sameTypeEvents = getEventsByType(event.type);

  // Special handling for upcoming events placeholder
  const isUpcomingPlaceholder = event.slug === "upcoming";

  return (
    <>
      <Navbar />
      
      {/* Sub-navigation for switching between events of same type */}
      {!isUpcomingPlaceholder && (
        <EventSubNav 
          currentEventSlug={event.slug} 
          events={sameTypeEvents}
          type={event.type}
        />
      )}

      <main className="min-h-screen bg-zinc-950 pt-18">
        {/* Hero Section */}
        <div className="relative border-b border-zinc-800/50 bg-gradient-to-b from-zinc-900 to-zinc-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  {event.type === "past" ? "Past Event" : "Upcoming Event"}
                </span>
              </div>

              <EventHeroTitle eventName={event.eventName} />

      
              <p className="text-lg text-zinc-400">
                {event.duration || event.date}
              </p>

       
              <p className="text-zinc-300 leading-relaxed max-w-3xl">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {isUpcomingPlaceholder ? (
          <UpcomingPlaceholder />
        ) : (
          <EventTimeline days={event.days} />
        )}
      </main>
    </>
  );
}

// Placeholder component for upcoming events
function UpcomingPlaceholder() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <div className="space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-800/50 border-2 border-zinc-700">
          <svg 
            className="w-10 h-10 text-zinc-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-zinc-100">Coming Soon</h2>
        <p className="text-zinc-400 max-w-md mx-auto">
          Exciting new events are being planned. Check back soon for updates on our upcoming activities!
        </p>
      </div>
    </div>
  );
}