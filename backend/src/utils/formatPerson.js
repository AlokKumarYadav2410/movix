const IMAGE_BASE = "https://image.tmdb.org/t/p";

const formatPerson = (person) => {
  const knownFor = (person.known_for || [])
    .map((item) => item?.title || item?.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return {
    id: person.id,
    title: person.name || "Unknown person",
    description: knownFor ? `Known for: ${knownFor}` : "Popular personality",
    rating: null,
    releaseDate: null,
    poster: person.profile_path ? `${IMAGE_BASE}/w500${person.profile_path}` : null,
    backdrop: null,
    mediaType: "person"
  };
};

module.exports = formatPerson;
