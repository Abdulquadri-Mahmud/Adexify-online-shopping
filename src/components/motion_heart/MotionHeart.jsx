import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";


const MotionHeart = ({ isLiked, onClick }) => (
  <motion.div
    whileTap={{ scale: 1.3 }}
    animate={{ scale: isLiked ? 1.2 : 1 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onClick}
    style={{ cursor: "pointer" }}
    className="absolute top-2 right-2 p-1 bg-pink-400 hover:bg-pink-400 rounded-full"
  >
    {isLiked ? (
      <AiFillHeart className="text-pink-500 text-xl" />
    ) : (
      <AiOutlineHeart className="text-gray-100 hover:text-white text-xl" />
    )}
  </motion.div>
);
export default MotionHeart;