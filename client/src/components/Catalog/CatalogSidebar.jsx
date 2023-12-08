import PropTypes from 'prop-types';
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from '@nextui-org/react';

import CatalogSidebarItem from './CatalogSidebarItem';
import { prices } from '../../data/prices';

const CatalogSidebar = ({
    categories,
    selected,
    setSelected,
    selectedPrice,
    setSelectedPrice,
}) => {
    return (
        <div className='flex flex-col gap-3'>
            {/* All Categories */}
            <CatalogSidebarItem title='Filter By Categories'>
                <CheckboxGroup value={selected} onValueChange={setSelected}>
                    {categories.map(({ _id, name }) => (
                        <div
                            key={_id}
                            className='flex items-center justify-between capitalize gap-2 pb-3'
                        >
                            <Checkbox value={name} size='sm' color='warning'>
                                <span>{name}</span>
                            </Checkbox>
                            <p className='text-gray-400 text-sm'>32</p>
                        </div>
                    ))}
                </CheckboxGroup>
            </CatalogSidebarItem>

            {/* Price Filter */}
            <CatalogSidebarItem title='Filter By Price'>
                <RadioGroup
                    value={selectedPrice}
                    onValueChange={setSelectedPrice}
                >
                    {prices &&
                        prices?.map(({ _id, name, range }) => (
                            <div
                                key={_id}
                                className='flex items-center justify-between capitalize gap-2 pb-3'
                            >
                                <Radio value={range} size='sm' color='warning'>
                                    {name}
                                </Radio>
                            </div>
                        ))}
                </RadioGroup>
            </CatalogSidebarItem>
        </div>
    );
};

export default CatalogSidebar;

CatalogSidebar.propTypes = {
    categories: PropTypes.array,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    selectedPrice: PropTypes.array,
    setSelectedPrice: PropTypes.func,
};