import { useState } from 'react';

export const CForm = () => {
  const [formData, setFormData] = useState({
    name: '', 
    description: '',
    hostOne: '',
    hostTwo: '',
    roleOne: '',
    roleTwo: '',
    recipientWalletAddress: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='p-4 mt-4'>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border-gray-400 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border-gray-400 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="hostOne" className="block text-gray-700 font-bold mb-2">
          Host One
        </label>
        <input
          type="text"
          name="hostOne"
          value={formData.hostOne}
          onChange={handleChange}
          className="border-gray-400 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="hostTwo" className="block text-gray-700 font-bold mb-2">
          Host Two
        </label>
        <input
          type="text"
          name="hostTwo"
          value={formData.hostTwo}
          onChange={handleChange}
          className="border-gray-400 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="roleOne" className="block text-gray-700 font-bold mb-2">
          Role One
        </label>
        <input
          type="text"
          name="roleOne"
          value={formData.roleOne}
          onChange={handleChange}
          className="border-gray-400 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
      <div className="mb-4">
        <label htmlFor="roleTwo" className="block text-gray-700 font-bold mb-2">
          Role Two
        </label>
        <input
          type="text"
          name="roleTwo"
          value={formData.roleTwo}
          onChange={handleChange}
          className="border-gray-400 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border-gray-400 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
         <div className="mt-8">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
)};

export default CForm;