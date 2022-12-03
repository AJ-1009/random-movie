import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
const categories = [
  "prime",
  "netflix",
  "disney",
  "hbo",
  "hulu",
  "peacock",
  "starz",
  "showtime",
  "apple",
  "mubi",
  "paramount",
];
const types = ["movie", "series"];
export default function Home() {
  const [filter, setfilter] = useState("prime");
  const [type, settype] = useState("");
  const [data, setdata] = useState();
  const [page, setpage] = useState(1);
  const [shownmovie, setshownmovie] = useState();
  const [shuffle, setshuffle] = useState(true);
  const [error, seterror] = useState();
  const [openmenu, setopenmenu] = useState(false);

  useEffect(() => {
    setshownmovie();
    if (data) {
      setpage(Math.floor(Math.random() * data?.total_pages + 1));
    } else {
      setpage(Math.floor(Math.random() * 30 + 1));
    }
    const options = {
      method: "GET",
      url: "https://streaming-availability.p.rapidapi.com/search/basic",
      params: {
        country: "us",
        service: filter,
        type: type,
        genre: "18",
        page: page,
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY_5,
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        seterror(error);
      });
  }, [filter, type, shuffle]);
  useEffect(() => {
    const b = Math.floor(Math.random() * 7);
    data?.results.map((movie, index) => {
      if (index == b) {
        setshownmovie(movie);
        return;
      }
    });
  }, [data]);

  return (
    <div>
      <Head>
        <title>Welcome to Random Movies</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {console.log(shownmovie)}
      <div className="filter-wrapper">
        {categories.map((item) => (
          <div
            key={item}
            onClick={() => setfilter(item)}
            className={`filter ${item == filter ? "check" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="filter-wrapper">
        {types.map((item) => (
          <div
            key={item}
            onClick={() => settype(item)}
            className={`filter ${item == type ? "check" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="burger" onClick={() => setopenmenu(true)}></div>
      {openmenu && (
        <div className="mobile-menu">
          <div className="cross-wrapper" onClick={() => setopenmenu(false)}>
            <div className="cross">
              <div className="line-1"></div>
              <div className="line-2"></div>
            </div>
            {/* <div className="series-wrapper">
              {types.map((item) => (
                <div
                  key={item}
                  onClick={() => settype(item)}
                  className={`filter-movie ${item == type ? "check" : ""}`}
                >
                  {item}
                </div>
              ))}
            </div> */}
          </div>
          <div className="mobile-menu-wrapper">
            {categories.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setfilter(item);
                  setopenmenu(false);
                }}
                className={`filter ${item == filter ? "check" : ""}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      <div onClick={() => setshuffle(!shuffle)} className="shuffle">
        Shuffle {type}
      </div>
      {shownmovie && (
        <MovieCard movie={shownmovie} type={type} filter={filter} />
      )}
      {!shownmovie && !error && (
        <div className="loader-wrapper">
          <div className="loader"></div>
          <div className="para">
            Selecting your {type} from {filter}{" "}
          </div>
        </div>
      )}
      {error && (
        <div className="loader-wrapper">
          <div className="para">{error?.message}</div>
        </div>
      )}
    </div>
  );
}

function MovieCard({ movie, type, filter }) {
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
            >
              <div className="trailer">
                <div
                  className="trailer-image"
                  style={{
                    backgroundImage: `url(${movie?.backdropURLs?.original})`,
                  }}
                ></div>
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
                <Link href={link.link} target="_blank" key={link.link}>
                  <div className="trailer">
                    <div
                      className="trailer-image"
                      style={{
                        backgroundImage: `url(${movie?.backdropURLs?.original})`,
                      }}
                    ></div>
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
            href={"https://www.youtube.com/watch?v=" + movie?.video}
            target="_blank"
          >
            <div className="trailer">
              <div
                className="trailer-image"
                style={{
                  backgroundImage: `url(${movie?.backdropURLs?.original})`,
                }}
              ></div>
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
