
const ItemForm = ({ item, setItem, handleSubmit }) => {
  return (
    <div>
        <form className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' onSubmit={handleSubmit}>
            <label>
                Name:
                <input 
                    type="text" 
                    name="name" 
                    value={item.name}
                    onChange={(e) => setItem({...item, name: e.target.value})}
                />
            </label>
            <label>
                Price:
                <input 
                    type="text" 
                    name="price" 
                    value={item.price}
                    onChange={(e) => setItem({...item, price: e.target.value})}
                />
            </label>
            <label>
                Quantity:
                <input 
                    type="text"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => setItem({...item, quantity: e.target.value})}
                />
            </label>
            <label>
                Image url:
                <input 
                    type="text" 
                    name="image" 
                    value={item.url}
                    onChange={(e) => setItem({...item, url: e.target.value})}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ItemForm