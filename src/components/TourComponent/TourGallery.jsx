import { Image } from 'antd';
import { useState } from 'react';

const TourGallery = ({ data }) => {
    const [currentPhoto, setCurrentPhoto] = useState(0)
    const allPhotos = [...data?.media?.photos, ...data?.photos]
    
    return (
        <div className='w-full'>
            {/* Gallery Container */}
            <div className='w-full bg-gradient-to-b from-gray-50 via-white to-white rounded-3xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl'>
            <h1 className='w-full text-4xl font-semibold text-center'>Фото тура</h1>
                <div className='w-full pt-6 md:pt-8 px-4 md:px-6 flex justify-center'>
                    <div className='w-full max-w-xl'>
                        <div className='relative group overflow-hidden bg-gray-300 rounded-2xl shadow-lg'>
                            <div className='aspect-video'>
                                <Image 
                                    preview={false}
                                    src={allPhotos[currentPhoto]} 
                                    alt="Tour" 
                                    className='group-hover:brightness-[0.8] transition-all duration-500'
                                    style={{
                                        width: '600px',
                                        height: '500px',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                            </div>
                            <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-bl-3xl'></div>
                        </div>
                    </div>
                </div>
                
                <div className='w-full flex items-center justify-center py-6 md:py-8 px-4 md:px-6'>
                    <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>
                    <span className='mx-3 md:mx-4 text-xs text-gray-400 font-medium tracking-wide'>ГАЛЕРЕЯ</span>
                    <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>
                </div>
                
                <div className='w-full pb-6 md:pb-8 px-4 md:px-6 flex justify-center'>
                    <div className='flex gap-2 md:gap-3 flex-wrap justify-center w-full'>
                        {allPhotos.map((i, ind) => (
                            <button
                                key={ind}
                                onClick={() => setCurrentPhoto(ind)}
                                className={`relative rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${
                                    currentPhoto === ind 
                                        ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-50 md:ring-offset-white scale-105 shadow-lg' 
                                        : 'hover:scale-105 opacity-50 hover:opacity-90 shadow-sm hover:shadow-md'
                                }`}
                            >
                                <img 
                                    src={i} 
                                    alt={`Thumbnail ${ind}`} 
                                    className='w-20 h-20 md:w-24 md:h-24 object-cover'
                                />
                                {currentPhoto === ind && (
                                    <div className='absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent'></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourGallery
