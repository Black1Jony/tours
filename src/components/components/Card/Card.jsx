import StarIcon from "@heroicons/react/24/solid/StarIcon";
import MapPinIcon from "@heroicons/react/24/solid/MapPinIcon";
import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import SparklesIcon from "@heroicons/react/24/solid/SparklesIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useState } from "react";
import api from "../../../api/api";

const Card = ({ tour, itemVariants, isAdminComponent, keyAdmin }) => {
    if (!tour) return 0
    const [isDeleting, setIsDeleting] = useState(false)
    const navigate = useNavigate()
    const renderStars = (stars) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`w-4 h-4 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        )
    }

    const discountPercent = tour.price?.discount || 0
    const originalPrice = tour.price?.amount ? Math.round(tour.price.amount / (1 - discountPercent / 100)) : tour.price?.amount
    const deleteTour = async(e)=>{
        e.stopPropagation()
        try {
            await api.delete(`/tours/${tour._id}?secretKey=${keyAdmin}`)
            setIsDeleting(true)
        } catch (error) {
            console.log(error);
        }
    }
    if(isDeleting){
        return null
    }
  return (
    
    <motion.div className='w-full bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 h-full flex flex-col'
    onClick={()=> navigate(`/tour/${tour._id}`)}
    variants={itemVariants}
    >
        <div className='relative overflow-hidden group'>
            <img 
                src={tour?.media?.cover} 
                alt={tour.title} 
                className='w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300'
                loading="lazy"
                decoding="async"
            />
            {discountPercent > 0 && (
                <div className='absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                    -{discountPercent}%
                </div>
            )}
            <div className='absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1'>
                <PaperAirplaneIcon className="w-4 h-4" />
                {tour.flight?.airline}
            </div>
            {isAdminComponent && (
                <div className='absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10' onClick={(e)=> deleteTour(e)}>
                    delete
                </div>
            )}
        </div>

        <div className='p-4 flex-1 flex flex-col gap-3'>
            <h3 className='font-semibold text-sm text-gray-800 line-clamp-2 hover:text-blue-600' style={{fontFamily: 'Inter'}}>
                {tour.title}
            </h3>

            {/* Location and Hotel */}
            <div className='space-y-2'>
                <div className='flex items-start gap-2'>
                    <MapPinIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className='text-xs' style={{fontFamily: 'Inter'}}>
                        <p className='text-gray-600'>{tour.country}, {tour.city}</p>
                        {tour.hotel?.name && (
                            <>
                                <p className='font-semibold text-gray-700'>{tour.hotel.name}</p>
                                {tour.hotel?.stars && renderStars(tour.hotel.stars)}
                            </>
                        )}
                    </div>
                </div>

                {/* Duration */}
                <div className='flex items-center gap-2 text-xs text-gray-600' style={{fontFamily: 'Inter'}}>
                    <CalendarIcon className="w-4 h-4" />
                    <span>{tour.duration?.days} days / {tour.duration?.nights} nights</span>
                </div>
            </div>

            {/* Included Services */}
            <div className='bg-gray-50 p-2 rounded-lg'>
                <div className='grid grid-cols-2 gap-1 text-xs' style={{fontFamily: 'Inter'}}>
                    {tour.included?.flight && (
                        <div className='flex items-center gap-1 text-blue-700'>
                            <CheckIcon className="w-3 h-3" />
                            <span>Flight</span>
                        </div>
                    )}
                    {tour.included?.hotel && (
                        <div className='flex items-center gap-1 text-blue-700'>
                            <CheckIcon className="w-3 h-3" />
                            <span>Hotel</span>
                        </div>
                    )}
                    {tour.included?.transfer && (
                        <div className='flex items-center gap-1 text-blue-700'>
                            <CheckIcon className="w-3 h-3" />
                            <span>Transfer</span>
                        </div>
                    )}
                    {tour.included?.insurance && (
                        <div className='flex items-center gap-1 text-blue-700'>
                            <CheckIcon className="w-3 h-3" />
                            <span>Insurance</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Availability */}
            {tour.booking?.availableSeats && (
                <div className='text-xs text-gray-600 flex items-center gap-1' style={{fontFamily: 'Inter'}}>
                    <SparklesIcon className="w-4 h-4 text-green-500" />
                    {tour.booking.availableSeats} seats available
                </div>
            )}

            <div className='border-t pt-3 mt-auto'>
                <div className='flex items-baseline justify-between' style={{fontFamily: 'Inter'}}>
                    <div>
                        {discountPercent > 0 && (
                            <p className='text-xs text-gray-400 line-through'>
                                {originalPrice} {tour.price?.currency === "KGS" ? "som" : "$"}
                            </p>
                        )}
                        <p className='text-lg font-bold text-blue-600'>
                            {tour.price?.amount} <span className='text-sm text-gray-600'>{tour.price?.currency === "KGS" ? "som" : "$"}</span>
                        </p>
                    </div>
                    <div className='text-xs text-gray-500 text-right'>
                        {tour.price?.perPerson && <p>per person</p>}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default Card