import { 
    Skeleton, SkeletonCircle, SkeletonText, 
    Stack

} from '@chakra-ui/react'
import { useState } from 'react';

export default function Loading() {
    const [isLoaded, setIsLoaded] = useState(false)
  return (
    <Stack padding={2} mx={2} spacing={1}>
        <Skeleton isLoaded={isLoaded} className='pt-0 md:w-[190px] h-[170px] w-[140px] mx-auto'>
        </Skeleton>
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Stack>
  )
}
