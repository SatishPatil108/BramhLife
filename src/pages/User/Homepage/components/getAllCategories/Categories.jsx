import React, { useEffect, useState } from 'react'
import useCategories from './useCategories';
import SubCategories from '../getAllSubCategories/SubCategories';


const Categories = () => {
    const { loading, error, domainsDetails, selectedCategory, setSelectedCategory } = useCategories();

    const domains = domainsDetails.domains;

    useEffect(() => {
        if (domains.length !== 0 && !selectedCategory)
            setSelectedCategory(domains[0].domain_name)
    }, [domains, selectedCategory, setSelectedCategory]);

    return (
        <div className="py-6 sm:py-2 px-2 sm:px-6 bg-purple-50">
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

            <div className="flex overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory gap-6 px-2 mt-4">
                {
                    domains.map((category, index) => {
                        return <a href={`#${category.domain_id}`} onClick={() => setSelectedCategory(category.domain_name)} key={index}
                            className={`border sm:text-base text-sm px-4 py-1 rounded-full min-w-min cursor-pointer items-center
                ${category.domain_name === selectedCategory ? 'text-white bg-purple-600' : 'hover:text-white hover:bg-purple-300 text-gray-700 border-gray-300'}`}>{category.domain_name}</a>
                    })
                }
            </div>
            {domains.map((category, index) => {
                return (<div key={index} id={category.domain_id}>
                    <SubCategories category={category} />
                </div>)
            })}
        </div>
    )
}

export default Categories
