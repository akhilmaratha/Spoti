import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";

const Home = () => {
  const { songs, albums } = SongData();
  return (
    <Layout>
      <div className="p-3 mb-5 ">
        <h1 className="my-3 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-x-auto gap-5">
          {albums.map((e, i) => (
            <AlbumItem
              key={i}
              image={e.thumbnail.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>

      <div className="p-3 mb-20">
        <h1 className="my-3 font-bold text-2xl">Today&apos;s biggest hits</h1>
        <div className="flex overflow-auto gap-5">
          {songs.map((e, i) => (
            <SongItem
              key={i}
              image={e.thumbnail?.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
