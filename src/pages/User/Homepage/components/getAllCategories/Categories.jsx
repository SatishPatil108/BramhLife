import React, { useEffect, useState } from 'react'
import useCategories from './useCategories';
import SubCategories from '../getAllSubCategories/SubCategories';


const Categories = () => {
    const { loading, error, coursesCategories, selectedCategory, setSelectedCategory } = useCategories();
    useEffect(() => {
        if (coursesCategories.length !== 0 && !selectedCategory) setSelectedCategory(coursesCategories[0].domain_name)
    }, [coursesCategories, selectedCategory, setSelectedCategory]);

    return (
        <div className="py-6 sm:py-2 px-2 sm:px-6 bg-gradient-to-b from-pink-50 to-purple-50">
            <p className="m-2 pt-4 text-2xl md:text-3xl font-extrabold">
                Categories
            </p>

            {/* Loading & Error States */}
            {loading && (
                <p className="text-center text-gray-500 animate-pulse">
                    Loading courses...
                </p>
            )}
            {error && <p className="text-center text-red-600">{error.message}</p>}

            <div className="grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-4 text-center">
                {
                    coursesCategories.map((category, index) => {
                        return <a href={`#${category.domain_id}`} onClick={() => setSelectedCategory(category.domain_name)} key={index}
                            className={`border sm:text-base text-sm px-4 py-1 rounded-full min-w-min cursor-pointer items-center
                ${category.domain_name === selectedCategory ? 'text-white bg-purple-600' : 'hover:text-white hover:bg-purple-300 text-gray-700 border-gray-300'}`}>{category.domain_name}</a>
                    })
                }
            </div>
            {coursesCategories.map((category, index) => {
                return (<div key={index} id={category.domain_id}>
                    <SubCategories category={category} />

                </div>)
            })}
        </div>
    )
}

export default Categories
