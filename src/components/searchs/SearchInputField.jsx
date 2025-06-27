import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useOutsideClick } from "@chakra-ui/react-use-outside-click";
import { MdSearch } from "react-icons/md";

const SearchInputField = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => setShowSuggestions(false),
  });

  useEffect(() => {
    try {
      const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
      if (!Array.isArray(savedSearches)) throw new Error("Invalid format");
      setSuggestions(savedSearches);
    } catch (error) {
      console.error("Invalid recentSearches format:", error);
      localStorage.removeItem("recentSearches");
      setSuggestions([]);
    }
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const updatedSearches = [query, ...suggestions.filter((q) => q !== query)].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setSuggestions(updatedSearches);
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  return (
    <Box position="relative" ref={ref}>
      <form onSubmit={handleSearch} style={{ display: 'flex' }}>
        <Input value={query} onChange={handleChange} placeholder="Search for products" className=' text-gray-800 font-semibold rounded-sm border-none outline-none p-[8px] bg-zinc-200 w-[100%]'/>
        <Button type="submit" color={'white'} className="bg-pink-600 absolute top-0 right-0 flex justify-center items-center w-[45px] h-full cursor-pointer rounded-r-md" >
          <Icon as={MdSearch} color={useColorModeValue('white', 'black')} fontSize={23}/>
        </Button>
      </form>

      {query && showSuggestions && suggestions.length > 0 && (
        <Box position="absolute" top="100%" left={0} right={0} bg="white" border="1px solid" borderColor="gray.200" rounded="md" zIndex="popover" mt={1}>
          <ul spacing={1}>
            {suggestions
              .filter(
                (s) =>
                  typeof s === "string" &&
                  s.toLowerCase().includes(query.toLowerCase())
              )
              .map((s, index) => (
                <Text key={index} px={4} py={2} _hover={{ bg: "gray.100", cursor: "pointer" }} color="gray.800" onClick={() => handleSuggestionClick(s)}>
                  {s}
                </Text>
              ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default SearchInputField;
