import { useState } from "react";
import Link from 'next/link'
export default function MovieCard({ movie, type }) {
  const [overview, setoverview] = useState(true);
  const [cast, setcast] = useState(false);
  const [trailer, settrailer] = useState(false);
  const movielinks = [
    {
      link: movie?.streamingInfo?.prime?.us?.link,
      platform: "Prime",
    },
    {
      link: movie?.streamingInfo?.netflix?.us?.link,
      platform: "Netflix",
    },
    {
      link: movie?.streamingInfo?.disney?.us?.link,
      platform: "Disney",
    },
    {
      link: movie?.streamingInfo?.apple?.us?.link,
      platform: " Apple",
    },
    {
      link: movie?.streamingInfo?.paramount?.us?.link,
      platform: "Paramount",
    },
    {
      link: movie?.streamingInfo?.mubi?.us?.link,
      platform: "Mubi",
    },
    {
      link: movie?.streamingInfo?.hulu?.us?.link,
      platform: "HULU",
    },
    {
      link: movie?.streamingInfo?.hbo?.us?.link,
      platform: "HBO,",
    },
    {
      link: movie?.streamingInfo?.starz?.us?.link,
      platform: "Starz",
    },
    {
      link: movie?.streamingInfo?.peacock?.us?.link,
      platform: "Peacock",
    },
    {
      link: movie?.streamingInfo?.showtime?.us?.link,
      platform: "Showtime",
    },
  ];
  return (
    <div className="movie-wrapper">
      <div className="title-wrapper">
        <div>
          <div className="title">{movie?.title}</div>
          <div className="info-wrapper">
            <div className="year">{movie?.year}</div>
            {movie?.runtime && (
              <div className="runtime">
                {(movie?.runtime - (movie?.runtime % 60)) / 60}h{" "}
                {movie?.runtime % 60}m
              </div>
            )}
          </div>
        </div>
        <div
          className="poster-header"
          style={{ backgroundImage: `url(${movie?.posterURLs?.original})` }}
        ></div>
      </div>
      <div className="routes">
        <div
          onClick={() => {
            setoverview(true);
            settrailer(false);
            setcast(false);
          }}
        >
          overview
        </div>
        <div
          onClick={() => {
            setoverview(false);
            settrailer(false);
            setcast(true);
          }}
        >
          cast
        </div>
        <div
          onClick={() => {
            setoverview(false);
            settrailer(true);
            setcast(false);
          }}
        >
          trailer and links
        </div>
      </div>
      {overview && (
        <div>
          <div className="title">About</div>
          {movie?.video && (
            <Link
              href={"https://www.youtube.com/watch?v=" + movie?.video}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <div className="trailer">
                {movie?.backdropURLs?.original && (
                  <div
                    className="trailer-image"
                    style={{
                      backgroundImage: `url(${movie?.backdropURLs?.original})`,
                    }}
                  ></div>
                )}
                <div className="link">{movie?.title} : Official Trailer </div>
              </div>
            </Link>
          )}
          <div className="rating-wrapper">
            {movie?.imdbRating && (
              <div className="rating">
                {movie?.imdbRating / 10} /10
                <div>IMDB</div>
              </div>
            )}
            <div className="line"></div>
            {movie?.tmdbRating && (
              <div className="rating">
                {movie?.tmdbRating / 10} /10
                <div>TMDB</div>
              </div>
            )}
          </div>
          {type == "series" && (
            <div>
              <div className="overview">
                Number of seasons : {movie?.seasons}
              </div>
              <div className="overview">
                Toatal episodes : {movie?.episodes}
              </div>
            </div>
          )}
          {movie?.tagline && <div className="tagline">{movie?.tagline}</div>}
          <div className="overview">{movie?.overview}</div>
        </div>
      )}
      <div className="link-wrapper">
        {trailer &&
          movielinks.map((link) => {
            if (link.link) {
              return (
                <Link
                  href={link.link}
                  target="_blank"
                  key={link.link}
                  style={{ textDecoration: "none" }}
                >
                  <div className="trailer">
                    {movie?.backdropURLs?.original && (
                      <div
                        className="trailer-image"
                        style={{
                          backgroundImage: `url(${movie?.backdropURLs?.original})`,
                        }}
                      ></div>
                    )}
                    <div className="link">
                      {movie?.title} : Watch on {link.platform}{" "}
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        {trailer && movie?.video && (
          <Link
            style={{ textDecoration: "none" }}
            href={"https://www.youtube.com/watch?v=" + movie?.video}
            target="_blank"
          >
            <div className="trailer">
              {movie?.backdropURLs?.original && (
                <div
                  className="trailer-image"
                  style={{
                    backgroundImage: `url(${movie?.backdropURLs?.original})`,
                  }}
                ></div>
              )}
              <div className="link">{movie?.title} : Official Trailer </div>
            </div>
          </Link>
        )}
      </div>
      {cast && (
        <div className="link-wrapper">
          {movie?.cast.map((name) => (
            <div key={name}>
              <Link
                style={{ textDecoration: "none" }}
                href={`${process.env.NEXT_PUBLIC_GOOGLE_LINK_1}+ ${
                  name.split(" ")[0]
                }+'+'${name.split(" ")[1]} + ${
                  process.env.NEXT_PUBLIC_GOOGLE_LINK_2
                } `}
                target="_blank"
              >
                <div className="link">{name}</div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
