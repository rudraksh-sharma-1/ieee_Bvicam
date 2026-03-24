import { notFound } from "next/navigation";
import { getEventBySlug, getEventsByType, eventDetails } from "@/lib/event-details";
import Navbar from "@/components/navbar";
import EventSubNav from "@/components/EventSubNav";
import EventTimeline from "@/components/EventTimeline";
import EventHeroTitle from "@/components/EventHeroTitle";
import EventHeroParticles from "@/components/Eventheroparticles";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";

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

      <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-950 to-slate-950 pt-18">
        {/* Hero Section */}
        <div className="relative border-b border-blue-800/30 bg-gradient-to-b from-blue-800/30 to-blue-950/50 overflow-hidden">
          {/* Particles background */}
          <EventHeroParticles />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/40 backdrop-blur-sm border border-blue-600/40">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-medium text-blue-200/90 uppercase tracking-wider">
                  {event.type === "past" ? "Past Event" : "Upcoming Event"}
                </span>
              </div>

              <EventHeroTitle eventName={event.eventName} />

      
              <p className="text-lg text-blue-100/80">
                {event.duration || event.date}
              </p>

       
              <p className="text-blue-50/85 leading-relaxed max-w-3xl">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {isUpcomingPlaceholder ? (
          <UpcomingEventsSection />
        ) : (
          <EventTimeline days={event.days} />
        )}
      </main>
    </>
  );
}

