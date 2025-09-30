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
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const MobileSearchInput = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

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
    <Box position="relative" display="flex" justifyContent="center">
      {/* Circle button */}
      <Box w="60px" h="35px" borderRadius="full" bg="white" display="flex" justifyContent="center" alignItems="center" cursor="pointer" shadow="lg" transition="all 0.2s ease" _hover={{ transform: "scale(1.05)", shadow: "xl" }} onClick={handleToggle} zIndex={20}>
        <Icon as={MdSearch} color="pink.500" fontSize="24px" />
      </Box>

      {/* Stroke + Input animation */}
      <AnimatePresence>
        {open && (
          <Box as="form" onSubmit={handleSearch} position="fixed" top={0} left={0} right={0} bottom={0} bg="rgba(0,0,0,0.5)" zIndex={15} display="flex" justifyContent="center" alignItems="start" pt="60px">
            <Box
              pr={{md:'2.5rem', base: '2rem'}}
              ref={ref}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              {/* Line / Stroke */}
              <MotionBox
                w="6px"
                border={'2px solid'}
                borderColor={'white'}
                rounded={'md'}
                bg="pink.400"
                initial={{ height: 0 }}
                animate={{ height: 60 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Input + Button */}
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                display="flex"
                alignItems="center"
                gap={2}
                bg="white"
                p={3}
                rounded="md"
                shadow="lg"
              >
                <Input
                  placeholder="Search for products, categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  w={{md:"240px", base: '180px'}}
                  h={'40px'}
                  rounded={'md'}
                  size="sm"
                  color={'gray.600'}
                  bg="gray.50"
                  _focus={{ borderColor: "pink.400", shadow: "sm" }}
                />
                <Button
                  type="submit"
                  size="sm"
                  h={'40px'}
                  colorScheme="pink"
                  leftIcon={<MdSearch className="text-xl"/>}
                >
                  Search
                </Button>
              </MotionBox>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    {/* </Box> */}

       {query && showSuggestions && suggestions.length > 0 && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            right={0}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            rounded="md"
            zIndex="popover"
            mt={1}
          >
            <ul>
              {suggestions
                .filter(
                  (s) =>
                    typeof s === "string" &&
                    s.toLowerCase().includes(query.toLowerCase())
                )
                .map((s, index) => (
                  <Text
                    key={index}
                    px={4}
                    py={2}
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    color="gray.800"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </Text>
                ))}
            </ul>
          </Box>
        )}
    </Box>
  );
};

export default MobileSearchInput;
