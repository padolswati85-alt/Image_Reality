import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDestinations } from "../services/api";

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [summary, setSummary] = useState("");
  const [wikiUrl, setWikiUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchDestinations();
      const found = data.find((p) => String(p.id) === id);
      setPlace(found);

      if (found) {
        const query = `${found.name} ${found.taluka?.name || "Nashik"} Maharashtra`;

        try {
          const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
              query
            )}`
          );

          if (!res.ok) throw new Error();

          const wiki = await res.json();
          setSummary(wiki.extract);
          setWikiUrl(wiki.content_urls?.desktop?.page);
        } catch {
          setSummary("No Wikipedia article found for this place.");
          setWikiUrl(
            `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(
              query
            )}`
          );
        }
      }
    };
    load();
  }, [id]);

  if (!place) return <div className="p-10">Loading details...</div>;

  const mapQuery = `${place.name} ${place.taluka?.name || "Nashik"} Maharashtra`;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">{place.name}</h1>

      <img
        src={place.image}
        alt={place.name}
        className="w-full h-80 object-cover rounded-xl"
      />

      {/* ABOUT */}
      <section>
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700">{summary}</p>

        <a
          href={wikiUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-3 text-blue-600 hover:underline"
        >
          Read more on Wikipedia →
        </a>
      </section>

      {/* MAP */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Location</h2>
        <iframe
          title="map"
          className="w-full h-72 rounded-lg"
          loading="lazy"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            mapQuery
          )}&output=embed`}
        />
      </section>

      {/* NEARBY */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Nearby</h2>
        <div className="flex gap-4 flex-wrap">
          <a
            href={`https://www.google.com/maps/search/hotels+near+${encodeURIComponent(
              mapQuery
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Hotels
          </a>

          <a
            href={`https://www.google.com/maps/search/attractions+near+${encodeURIComponent(
              mapQuery
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Attractions
          </a>

          <a
            href={`https://www.google.com/maps/search/restaurants+near+${encodeURIComponent(
              mapQuery
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            Restaurants
          </a>
        </div>
      </section>
    </div>
  );
}
