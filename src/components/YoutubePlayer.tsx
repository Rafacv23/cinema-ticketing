"use client"

import YouTube from "react-youtube"

export default function YouTubePlayer({
  movieTrailer,
}: {
  movieTrailer: string
}) {
  return <YouTube videoId={movieTrailer} />
}
