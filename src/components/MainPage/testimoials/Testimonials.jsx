import testimonials from "./testimnalsArray"

const Testimonials = () => {
    return <>
        <section className="mt-16 px-4 py-12 bg-gray-50" id="reviews">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Traveler Reviews</h2>
                <p className="text-gray-600 mt-2">Our guests share their impressions</p>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                    {testimonials.map((i, ind) => (
                        <div 
                            className="flex flex-col gap-4 p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            key={ind}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={i.photo}
                                    alt={`${i.username} photo`}
                                    className="w-12 h-12 rounded-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                    width={48}
                                    height={48}
                                />
                                <h3 className="font-semibold text-lg">{i.username}</h3>
                            </div>
                            <p className="text-gray-700 italic">“{i.description}”</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </>
}

export default Testimonials