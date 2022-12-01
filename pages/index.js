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
  const random = () => {
    setpage(Math.floor(Math.random() * data?.total_pages));
  };
  useEffect(() => {
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
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY_1,
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filter, type, page]);
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
      <div onClick={random} className="shuffle">
        Shuffle {type}
      </div>
      <MovieCard movie={shownmovie} type={type} category={filter} />
    </div>
  );
}

function MovieCard({ movie, type, category }) {
  return (
    <div className="movie-wrapper">
      <div
        className="poster"
        style={{ backgroundImage: `url(${movie?.posterURLs?.original})` }}
      ></div>
      <div className="overview">{movie?.title} </div>
      <div className="overview">{movie?.overview}</div>
      {type == "series" && (
        <div>
          <div className="overview">Number of seasons : {movie?.seasons}</div>
          <div className="overview">Toatal episodes : {movie?.episodes}</div>
        </div>
      )}
      {movie && (
        <Link href="#">
          <div className="link"> Watch the {type} </div>
        </Link>
      )}
      {movie?.video && (
        <Link href={"https://www.youtube.com/watch?v=" + movie?.video}>
          <div className="link"> Watch the trailor </div>
        </Link>
      )}
    </div>
  );
}
