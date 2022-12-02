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
  const [type, settype] = useState("movie");
  const [data, setdata] = useState();
  const [page, setpage] = useState(1);
  const [shownmovie, setshownmovie] = useState();
  const [shuffle, setshuffle] = useState(true);

  useEffect(() => {
    setshownmovie();
    if (data) {
      setpage(Math.floor(Math.random() * data?.total_pages + 1));
    } else {
      setpage(10);
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
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY_3,
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
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
      <div onClick={() => setshuffle(!shuffle)} className="shuffle">
        Shuffle {type}
      </div>
      {console.log(shownmovie)}
      {shownmovie && (
        <MovieCard movie={shownmovie} type={type} filter={filter} />
      )}
      {!shownmovie && (
        <div className="loader-wrapper">
          <div className="loader"></div>
          <div className="para">Selecting your {type} from {filter} </div>
        </div>
      )}
    </div>
  );
}

function MovieCard({ movie, type, filter }) {
  const [overview, setoverview] = useState(true);
  const [images, setimages] = useState(false);
  const [cast, setcast] = useState(false);
  const [trailer, settrailer] = useState(false);
  const [poster, setposter] = useState();
  return (
    <div className="movie-wrapper">
      <div className="title-wrapper">
        <div>
          <div className="title">{movie?.title}</div>
          <div className="info-wrapper">
            <div className="year">{movie?.year}</div>
            <div className="runtime">
              {(movie?.runtime - (movie?.runtime % 60)) / 60}h{" "}
              {movie?.runtime % 60}m
            </div>
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
            setimages(false);
          }}
        >
          overview
        </div>
        <div
          onClick={() => {
            setoverview(false);
            settrailer(false);
            setcast(false);
            setimages(true);
            setposter(Object.values(movie?.backdropURLs));
          }}
        >
          images
        </div>
        <div
          onClick={() => {
            setoverview(false);
            settrailer(false);
            setcast(true);
            setimages(false);
          }}
        >
          cast
        </div>
        <div
          onClick={() => {
            setoverview(false);
            settrailer(true);
            setcast(false);
            setimages(false);
          }}
        >
          trailer and links
        </div>
      </div>
      {overview && (
        <div>
          <div className="title">About</div>
          <div className="rating-wrapper">
            <div className="rating">
              {movie?.imdbRating / 10} /10
              <div>IMDB</div>
            </div>
            <div className="line"></div>
            <div className="rating">
              {movie?.tmdbRating / 10} /10
              <div>TMDB</div>
            </div>
          </div>
          <div className="tagline">{movie?.tagline}</div>
          <div className="overview">{movie?.overview}</div>
        </div>
      )}
      {type == "series" && (
        <div>
          <div className="overview">Number of seasons : {movie?.seasons}</div>
          <div className="overview">Toatal episodes : {movie?.episodes}</div>
        </div>
      )}
      {trailer && movie?.streamingInfo?.prime?.us?.link && (
        <Link href={movie?.streamingInfo?.prime?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.netflix?.us?.link && (
        <Link href={movie?.streamingInfo?.netflix?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.starz?.us?.link && (
        <Link href={movie?.streamingInfo?.starz?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.hulu?.us?.link && (
        <Link href={movie?.streamingInfo?.hulu?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.disney?.us?.link && (
        <Link href={movie?.streamingInfo?.disney?.us?.link}>
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.peacock?.us?.link && (
        <Link href={movie?.streamingInfo?.peacock?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.hbo?.us?.link && (
        <Link href={movie?.streamingInfo?.hbo?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.showtime?.us?.link && (
        <Link href={movie?.streamingInfo?.showtime?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.paramount?.us?.link && (
        <Link href={movie?.streamingInfo?.paramount?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.apple?.us?.link && (
        <Link href={movie?.streamingInfo?.apple?.us?.link} target="_blank">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.streamingInfo?.mubi?.us?.link && (
        <Link href={movie?.streamingInfo?.mubi?.us?.link}>
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {trailer && movie?.video && (
        <Link href={"https://www.youtube.com/watch?v=" + movie?.video} target='_blank'>
          <div className="link"> Watch the trailor </div>
        </Link>
      )}
      {images && (
        <div className="poster-wrapper" >
          {poster.map((image) => (
            <div
              className="image"
              style={{ backgroundImage: `url(${image})` }}
              key={image}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
