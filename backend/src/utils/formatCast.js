const IMAGE_BASE = "https://image.tmdb.org/t/p"

const formatCast = (actor) => {

  return {
    id: actor.id,
    name: actor.name,
    character: actor.character,

    profile: actor.profile_path
      ? `${IMAGE_BASE}/w300${actor.profile_path}`
      : null
  }

}

module.exports = formatCast