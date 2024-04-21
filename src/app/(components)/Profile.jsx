import Link from 'next/link'

import ItemCard from './ItemCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  console.log(data)

  return (
    <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
      <h1 className='head_text text-left'>{name} Profile</h1>

      <div className='mt-10 prompt_layout'>
        {data && data.length === 0 && (
          <div className='flex-center flex-col'>
            <h1 className='text-center'>No items found</h1>
            <Link href='/add' className='text-blue-500 hover:text-blue-800'>
              Add an item
            </Link>
          </div>
        )}
        {data != undefined
          ?
            <div>
              <h1>Your Items:</h1>
              {data.map((item) => (
                
                <ItemCard key={item} name={item} />

              ))}
            </div>
          : 
            <h1>Loading...</h1>
        }
      </div>
    </main> 
  );
};

export default Profile
