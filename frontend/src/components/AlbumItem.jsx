import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/album/" + id)}
      className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors w-[180px] flex-shrink-0"
    >
      <div className="relative mb-4">
        <div className="aspect-square w-full overflow-hidden rounded">
          <img 
            src={image ? image : assets.noimage} 
            className="w-full h-full object-cover" 
            alt={name} 
          />
        </div>
      </div>
      <h3 className="font-bold text-white truncate">{name}</h3>
      <p className="text-sm text-gray-400 line-clamp-2 mt-1">{desc}</p>
    </div>
  );
};

export default AlbumItem;
