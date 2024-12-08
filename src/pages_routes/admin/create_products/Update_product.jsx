import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import { MdAddCircle, MdDelete, MdOutlinePercent, MdOutlineShoppingCart, MdProductionQuantityLimits, MdSystemUpdateAlt } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { CiGrid42 } from 'react-icons/ci'
import { FiGrid } from 'react-icons/fi'
import { FaNairaSign, FaStore, FaUsersLine } from 'react-icons/fa6'
import { BsBank2 } from 'react-icons/bs'
import { LuSave } from 'react-icons/lu'
import { app } from '../../../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { IoCreateOutline } from 'react-icons/io5'

export default function Update_product() {

  const [update,setUpdate] = useState([]);
  const [ sizes, setSizes] = useState([
    'XS', 'S', 'M', 'L','XL', 'XLL', 'XXL'
  ]);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res =  await fetch(`https://adexify-api.vercel.app/api/products/single-products/${id}`);

      const data = await res.json();

      setUpdate(data);
    //   console.log(update);
      
    };

    fetchData();
  }, []);

  console.log(update);
  
  const [uploadProgress, setUploadProgress] = useState(false);
  const [filesError, setFilesError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const toast = useToast();

  const fileRef = useRef(null);

  const [files, setFile] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = `https://adexify-api.vercel.app/api/products/update-products/${id}`;

    try {
      setLoading(true);

      const res = await fetch(url, {
        method: 'PATCH',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify(update)
      });

      const data = await res.json();

      if(data.success === false){
        toast({
          description: data.message,
          duration: 5000,
          isClosable: true,
          status: 'error',
      });
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(false);
      toast({
        description: 'Product has been updated successfuly!',
        duration: 5000,
        isClosable: true,
        status: 'success',
    });

    } catch (error) {
      toast({
        description: error,
        duration: 5000,
        isClosable: true,
        status: 'error',
    });
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setUpdate({
      ...update,
      [e.target.id] : e.target.value
    })
  }

  const handleSize = (value) => {
    setUpdate({
      ...update,
      size: [...update.size, value]
    })
  }

  
  const handleSaveDraft = () => {

  }

  const handleUpload = (e) => {
    if (files.length < 0 ) {
      toast({
        description: 'You need to upad at least 1 image',
        duration: 5000,
        isClosable: true,
        status: 'error',
      });
      return;
    }
    if (files.length + update.image.length < 6) {
        setUploadProgress(true);
        setFilesError(false);
        
        const storeImages = [];

        for (let i = 0; i < files.length; i++) {
            storeImages.push(getAllImagesUrls(files[i]));
        }
        Promise.all(storeImages).then((urls) => {
          setUpdate({
                ...update, image: update.image.concat(urls)
            });
            setFilesError(false);
            setUploadProgress(false);

        }).catch((error) => {
            toast({
              description: 'Error while uploading images!',
              duration: 5000,
              isClosable: true,
              status: 'error',
          });
            setUploadProgress(false);
        });
    }else{
        toast({
          description: 'You can only upload at 5 images per listing!',
          duration: 5000,
          isClosable: true,
          status: 'error',
      });
        setUploadProgress(false);
    }
  }

  const getAllImagesUrls = async (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);

        const fileName = new Date().getTime() + file.name;

        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        }, (error) => {
            reject(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            })
        })
    })
  }

  return (
    <Box className='bg-slate-800 overflow-hidden'>
      <Flex gap={0} height={'100vh'}>
      <Box position={'relative'} width={'250px'} color={'white'} p={0} height={'100%'} className='bg-white'>
          <Link to={'/'}>
            <div className="bg-pink-600 text-white flex items-center gap-3 py-3 justify-center">
                <MdOutlineShoppingCart className='md:text-2xl'/>
                <h1 className='md:text-2xl font-medium'>Ade<span className="">X</span>ify</h1>
            </div>
          </Link>
          <Box pt={7} px={2}>
            <Text pl={2} fontSize={14} fontWeight={500} className='text-pink-400'>Main Menu</Text>
            <Box mt={6}>
              <Box>
                <Link to={'/admin-dashboard'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white  text-black'>
                    <FiGrid className='text-xl text-pink-600'/>
                    <Text fontWeight={500}>Overview</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <FaStore className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Products</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/admin/items'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <FaStore className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Items</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <MdOutlineShoppingCart className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Order</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <FaUsersLine className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Customers</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <BsBank2 className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Payments</Text>
                  </Flex>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box pos={'absolute'} bottom={0} width={'full'}>
            <button className='py-2 bg-pink-600 text-white w-[94%] uppercase font-medium'>Logout</button>
          </Box>
        </Box>
        <Box flex={1} justifyContent={{md: '', base: 'center'}} className='bg-slate-800'>
          <Box bg={''} overflowX={'scroll'} overflowY={''} height={'100vh'} className='bg-zinc-200'>
            <form onSubmit={handleSubmit}>
              <Flex roundedTop={'md'} justifyContent={'end'} alignItems={'center'} p={2} className='bg-white sticky top-0 z-10'>
                <button type='submit' className='flex items-center gap-2 px-3 py-2 rounded-md font-medium bg-pink-600 text-white'>
                {
                    loading ? 'Updating...' : (
                      <>
                        <FaStore/>
                        <Text>Update Products</Text>
                      </>
                    )
                  }
                </button>
                <Box>
                    {/* <input type="text" placeholder='search' className='pl-2 py-2 rounded-md w-[300px]'/> */}
                </Box>
                {/* <Box className='border-2 border-grat-600 text-pink-600 bg-slate-800 flex items-center gap-2 px-3 py-2 rounded-full font-medium'>
                  <LuSave/>
                  <Text onClick={handleSaveDraft}>Save Draft</Text>
                </Box> */}
              </Flex>
              <Box>
                <Flex flexWrap={'wrap'} gap={3} p={1}>
                  <Box flex={1} rounded={'md'} p={3} className=''>
                    <Box className='bg-white p-3 text-black' rounded={'md'}>
                      <Text fontWeight={500}>General Information</Text>
                      <Box mt={5}>
                        <Text mb={2} fontWeight={500} fontSize={14}>Product Name</Text>
                        <input defaultValue={update.name} onChange={handleChange} type="text" id='name' className='text-black outline-none bg-zinc-200 py-2 px-3 font-medium w-full rounded-md'/>
                      </Box>
                      <Box mt={5}>
                        <Text mb={2} fontWeight={500} fontSize={14}>Product Description</Text>
                        <textarea defaultValue={update.description} onChange={handleChange} id='description' type="text" className='text-black outline-none bg-zinc-200 py-2 px-3 h-[200px] w-full rounded-md font-medium'/>
                      </Box>
                      <Box mt={5} className='grid md:grid-cols-2 grid-cols-1'>
                        <Box>
                            <Text fontWeight={500} fontSize={14}>Sizes</Text>
                            <Text color={'gray.400'} fontSize={12} mt={3}>Default Size</Text>
                            <Flex gap={2} flexWrap={'wrap'} mt={1} color={'black'}>
                                {
                                    update.size !== undefined ? (
                                        <>
                                        {
                                            update.size.length > 0 && update.size.map((size, idx) => {
                                                return(
                                                    <input key={idx} type='button' onClick={() => handleSize(size)} id='size' value={size} className='w-10 h-10 hover:bg-pink-600 hover:text-white cursor-pointer text-[14px] font-medium bg-zinc-200 rounded-md' />
                                                )
                                            })
                                        }
                                        </>
                                    ):''
                                }
                            </Flex>
                            <Text color={'gray.400'} fontSize={12} mt={3}>Choose To Update SIze</Text>
                            <Flex gap={2} flexWrap={'wrap'} mt={1} color={'black'}>
                                {
                                    sizes.map((size, idx) => {
                                        return(
                                            <input key={idx} type='button' onClick={() => handleSize(size)} id='size' value={size} className='w-9 h-9 text-white hover:bg-pink-500 hover:text-white cursor-pointer text-[14px] font-medium bg-pink-600 rounded-md' />
                                        )
                                    })
                                }
                            </Flex>
                        </Box>
                        <Box mt={{md: 5, base: 5}}>
                          <Text fontWeight={500} fontSize={14}>Gender</Text>
                          <Text mt={3} color={'gray.400'} fontSize={12}>Default Gender</Text>
                          {
                            update.gender === 'male' && (
                                <Box className='cursor-pointer radio'>
                                    <input defaultValue={update.gender} onChange={handleChange} type="radio" name='gender' id="gender" className=' cursor-pointer' value={'male'} />
                                    <label className='pl-1 font-medium text-[14px] cursor-pointer' htmlFor="male">Male</label>
                                </Box>
                            )
                          }

                          {
                            update.gender === 'female' && (
                                <Box className='cursor-pointer radio'>
                                    <input defaultValue={update.gender} type="radio" className=' cursor-pointer' value={'female'} />
                                    <label className='pl-1 font-medium text-[14px] cursor-pointer' htmlFor="female">Female</label>
                                </Box>
                            )
                          }
                          {
                            update.gender === 'unisex' && (
                                <Box className='cursor-pointer radio'>
                                    <input defaultValue={update.gender} onChange={handleChange} type="radio" name='gender' id="gender" className=' cursor-pointer' value={'unisex'} />
                                    <label className='pl-1 font-medium text-[14px] cursor-pointer' htmlFor="unisex">Unisex</label>
                                </Box>
                            )
                          }
                          <Text mt={3} color={'gray.400'} fontSize={12}>Pick Available Gender To Update</Text>
                          <Flex mt={1} flexWrap={'wrap'}>
                            <Box className='cursor-pointer radio'>
                              <input defaultValue={update.gender} onChange={handleChange} type="radio" name='gender' id="gender" className=' cursor-pointer' value={'male'} />
                              <label className='pl-1 font-medium text-[14px] cursor-pointer' htmlFor="male">Male</label>
                            </Box>
                            <Box px={{md:5}} className='cursor-pointer radio'>
                              <input defaultValue={update.gender} onChange={handleChange} type="radio" name='gender' id="gender" className=' cursor-pointer' value={'female'} />
                              <label className='pl-1 font-medium text-[14px] cursor-pointer' htmlFor="female">Female</label>
                            </Box>
                            <Box className='cursor-pointer radio'>
                              <input defaultValue={update.gender} onChange={handleChange} type="radio" name='gender' id="gender" className=' cursor-pointer' value={'unisex'} />
                              <label className='pl-1 font-medium text-[14px] cursor-pointer' htmlFor="unisex">Unisex</label>
                            </Box>
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                    <Box mt={{md: 5, base: 5}} p={3} rounded={'md'} className='bg-white text-black'>
                      <Text fontWeight={500} fontSize={16}>Pricing And Stock</Text>
                      <Box className='flex justify-between gap-5 w-full'>
                        
                        <Box width={'full'}>
                          <Box mt={5} className='relative'>
                            <Text mb={2} fontWeight={500} fontSize={14}>Base Pricing</Text>
                            <Flex justifyContent={'center'} alignItems={'center'} className='w-8 h-10 absolute top-13 bg-pink-600 text-white rounded-l-md'>
                              <FaNairaSign className='text-sm' />
                            </Flex>
                            <input defaultValue={update.price} onChange={handleChange} type="number" id='price' className='bg-zinc-200 h-10 text-black pl-10 outline-none px-3 font-medium w-full rounded-md'/>
                          </Box>
                          <Box mt={5} className='relative'>
                            <Text mb={2} fontWeight={500} fontSize={14}>Old Price</Text>
                            <Flex justifyContent={'center'} alignItems={'center'} className='w-8 h-10 absolute top-[3] bg-pink-600 text-white rounded-l-md'>
                              <FaNairaSign className='text-sm' />
                            </Flex>
                            <input defaultValue={update.oldprice} onChange={handleChange} type="number" id='oldprice' className='bg-zinc-200 h-10 text-black pl-10 outline-none px-3 font-medium w-full rounded-md'/>
                          </Box>
                          <Box mt={5} className='relative'>
                            <Text mb={2} fontWeight={500} fontSize={14}>Discount</Text>
                            <Flex justifyContent={'center'} alignItems={'center'} className='w-8 h-10 absolute top-[3] bg-pink-600 text-white rounded-l-md'>
                              <MdOutlinePercent className='text-sm' />
                            </Flex>
                            <input defaultValue={update.discount && update.discount} onChange={handleChange} type="number" id='discount' className='bg-zinc-200 h-10 text-black pl-10 outline-none px-3 font-medium w-full rounded-md'/>
                          </Box>
                        </Box>

                        <Box width={'100%'}>
                          <Box mt={5} className='relative'>
                            <Text mb={2} fontWeight={500} fontSize={14}>Stock</Text>
                            <Flex justifyContent={'center'} alignItems={'center'} className='w-8 h-10 absolute top-[3] bg-pink-600 text-white rounded-l-md'>
                              <MdProductionQuantityLimits className='text-sm' />
                            </Flex>
                            <input defaultValue={update.stock} onChange={handleChange} type="number" id='stock' className='bg-zinc-200 h-10 text-black pl-10 outline-none px-3 font-medium w-full rounded-md'/>
                          </Box>
                          <Box mt={5} className='relative'>
                            <Text mb={2} fontWeight={500} fontSize={14}>Deal</Text>
                            <select defaultValue={update.deal} onChange={handleChange} name="deal" id="deal" className='w-full bg-zinc-200 text-black font-medium h-10 px-3 rounded-md outline-none'>
                              <option value="great">Great</option>
                              <option value="good">Good</option>
                            </select>
                          </Box>
                          <Box mt={5} className='relative'>
                            <Text mb={2} fontWeight={500} fontSize={14}>Discount Type</Text>
                            <select defaultValue={update.discountType} onChange={handleChange} name="discountType" id="discountType" className='w-full bg-zinc-200 text-black font-medium h-10 px-3 rounded-md outline-none'>
                              <option defaultValue={update.discountType}>{update.discountType && update.discountType}</option>
                              <option value="Happy New Year Discount">Happy New Year Discount</option>
                              <option value="Eid Mubarak Discount">Eid Mubarak Discount</option>
                              <option value="Eid Adha Discount">Eid Adha Discount</option>
                              <option value="Christmas Discount">Christmas Discount</option>
                            </select>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box rounded={'md'} className='bg-zinc-200 mt-3 w-[350px] text-white'>
                    <Box className='bg-white w-full p-3' rounded={'md'}>
                      <Text fontWeight={500}>Upload Img</Text>
                      <Box mt={5} rounded={'md'} width={'full'} height={'250px'} className='bg-zinc-200 flex justify-center items-center'>
                        <input type="file" defaultValue={''} onChange={(e) => setFile(e.target.files)} ref={fileRef} id="image"  accept='image/*' className='hidden' multiple/>
                        <Image rounded={'md'} src={update.image} className='max-w-full h-[230px]'/>
                      </Box>
                      <Flex mt={5} gap={3} flexWrap={'wrap'}>
                        {
                            update.image !== undefined ? (
                                <>
                                    {
                                        update.image.length && update.image.map((img, idx) => {
                                            const handleDelete = () => {
                                              setUpdate({
                                                ...update,
                                                image: update.image.filter((_, i) => i !== idx)
                                              })
                                            }
                                            return (
                                                <Box position={'relative'} key={idx} rounded={'md'} height={'70px'} width={'70px'} className='bg-white'>
                                                <Image rounded={'md'} src={img} className='max-w-full'/>
                                                    <Box p={1} bg={''} className='bg-pink-600 absolute top-6 left-6 rounded-full '>
                                                        <MdDelete className=' text-white text-xl cursor-pointer' onClick={handleDelete}/>
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    }
                                </>
                            ) : ''
                        }
                        <Flex onClick={() => fileRef.current.click()} rounded={'md'} justifyContent={'center'} alignItems={'center'} height={'70px'} width={'70px'} className='cursor-pointer bg-zinc-200 border-pink-600 border-dashed border-2 text-pink-600 rounded-md'>
                          <MdAddCircle />
                        </Flex>
                      </Flex>
                      <Box mt={5}>
                        <button type='button' onClick={handleUpload} className='bg-pink-600 text-white rounded-md w-full py-2 font-medium'>
                            {
                                uploadProgress ? 'Uploading...' : 'Upload Image'
                            }
                        </button>
                      </Box>
                    </Box>
                    <Box mt={{md: 12}} rounded={'md'} className='bg-white p-3 text-black'>
                      <Text fontWeight={500}>Category</Text>
                      <Box mt={4}>
                        <Text mb={3} fontSize={14} fontWeight={500}>Products Category</Text>
                        <select defaultValue={update.category} onChange={handleChange} id="category" className='w-full bg-zinc-200 text-black font-medium h-10 px-3 rounded-md outline-none'>
                          <option value={update.category}>{update.category}</option>
                          <option value="Shirt">Shirt</option>
                          <option value="Pants">Pants</option>
                          <option value="Hoodies & Sweatershirt">Hoodies & Sweatershirt</option>
                          <option value="Jeans">Jeans</option>
                          <option value="Jewellery">Jewellery</option>
                          <option value="Underwear">Underwear</option>
                          <option value="Sportwear">Sportwear</option>
                          <option value="Socks">Socks</option>
                          <option value="Shoes">Shoes</option>
                          <option value="Sandals">Sandals</option>
                        </select>
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
