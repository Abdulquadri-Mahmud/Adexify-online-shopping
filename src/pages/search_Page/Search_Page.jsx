import React, { useEffect, useState } from 'react'
import {Box} from '@chakra-ui/react';

export default function Search_Page() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState({
        searchTerm: '',
        price: '',
        category: '',
        gender: '',
        sort: 'created_at',
        order: 'desc'
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

        const searchTermUrl = urlParams.get('searchTerm');
        const searchPriceUrl = urlParams.get('price');
        const searchCategoryUrl = urlParams.get('category');
        const searchGenderUrl = urlParams.get('gender');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermUrl || searchPriceUrl || searchGenderUrl || searchCategoryUrl) {
            setSearchData({
                searchTerm: searchTermUrl || '',
                price: searchPriceUrl || '',
                category: searchCategoryUrl || '',
                gender: searchGenderUrl || '',
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc'
            });
        };

        const fetchData = async () => {
            try {
                setLoading(true);
    
                const searchQuery = urlParams.toString():
    
                const res = await fetch(`?${searchQuery}`);
                const data = await res.json();
    
                console.log(data);
    
                setProducts(data);
                setLoading(false)
            
            } catch (error) {
                console.log(error);
                
            }
            
        }
    }, [location.search]);

  return (
    <Box>Search_Page</Box>
  )
}
