import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig/firebaseconfig";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';

const AddPropertyForm = () => {
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState(true);
  const [formValues, setFormValues] = useState({
    coverImgUrl: null,
    photos: []
  });

  const handleFinish = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    values.coverImgUrl = formValues.coverImgUrl;
    values.photos = formValues.photos;
 

    try {
      const { coverImgUrl, photos, propertyState } = values;
      console.log(JSON.stringify(formValues));
      console.log(coverImgUrl);
      console.log(photos);

      const { coverUrl, photoUrlList } = await uploadImages(coverImgUrl, photos);

      setFeatured(propertyState === "featured");

      const propertyData = {
        propertyType: values.propertyType,
        propertyName: values.propertyName,
        price: values.price,
        location: values.location,
        compound: values.compound,
        numBeds: values.numBeds,
        numShower: values.numShower,
        coverImgUrl: coverUrl,
        imagesUrl: photoUrlList,
        view: values.view,
        measure: values.measure,
        description: values.description,
        featured: featured
      };
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${baseUrl}/property/addProperty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      });
      const responseData = await response.json();
      if(responseData){
        // resetForm();
        if(responseData.err==='please provide property images'){
        console.log(responseData);
        message.error("Please upload property images");
        }
        else{
          message.success("Property added successfully");

          setLoading(false);
          window.location.reload();
        }
        // console.log("property added successfully");
      }
    

      console.log("constructed data : ");
      console.log(propertyData);

    } catch (error) {
      message.error('error in adding property ');
      console.error("Error adding property:", error);
    }
    setLoading(false);
  
  };
 
  const uploadImages = async (coverImgUrl, photos) => {
    let photoUrlList = [];
    try {
      const coverRef = ref(storage, `coverImages/${coverImgUrl.name}`);
      await uploadBytes(coverRef, coverImgUrl);
      const coverUrl = await getDownloadURL(coverRef);

      for (let photo of photos) {
        const photoRef = ref(storage, `photos/${photo.name}`);
        await uploadBytes(photoRef, photo);
        const photoUrl = await getDownloadURL(photoRef);
        photoUrlList.push(photoUrl);
      }
  
      return { coverUrl, photoUrlList };
    } catch (err) {
      console.error("Error uploading image to Firebase:", err);
      throw err;
    }
  };

  const handleCoverImageChange = (file) => {
    setFormValues(prevValues => ({ ...prevValues, coverImgUrl: file }));
  };
  const handleCoverImageRemove = () => {
    setFormValues(prevValues => ({ ...prevValues, coverImgUrl: null }));
  };


  const handlePhotosChange = ({ fileList }) => {
    console.log("file list :", fileList); // Correctly log the file list
    setFormValues(prevValues => ({
      ...prevValues,
      photos: fileList.map(file => file.originFileObj)
    }));
  };
  const handleRemovePhoto = (file) => {
    setFormValues(prevValues => ({
      ...prevValues,
      photos: prevValues.photos.filter(photo => photo !== file.originFileObj)
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center my-5 px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Add Property</h1>
        <form  onSubmit={handleFinish} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="propertyName" className="text-sm font-medium mb-2">Property Name</label>
              <input
                id="propertyName"
                name="propertyName"
                type="text"
                placeholder="Enter property name"
                className="p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="compound" className="text-sm font-medium mb-2">Compound</label>
              <input
                id="compound"
                name="compound"
                type="text"
                placeholder="Enter compound name"
                className="p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="location" className="text-sm font-medium mb-2">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter location"
                className="p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="measure" className="text-sm font-medium mb-2">Measure</label>
              <input
                id="measure"
                name="measure"
                type="number"
                placeholder="Enter measure (e.g., sqm)"
                className="p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="numBeds" className="text-sm font-medium mb-2">Number of Beds</label>
              <input
                id="numBeds"
                name="numBeds"
                type="number"
                placeholder="Enter number of beds"
                className="p-2 border border-gray-300 rounded"
                min="1"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="numShower" className="text-sm font-medium mb-2">Number of Showers</label>
              <input
                id="numShower"
                name="numShower"
                type="number"
                placeholder="Enter number of showers"
                className="p-2 border border-gray-300 rounded"
                min="1"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="propertyType" className="text-sm font-medium mb-2">Property Type</label>
              <select
                id="propertyType"
                name="propertyType"
                className="p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select property type</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="view" className="text-sm font-medium mb-2">View</label>
              <select
                id="view"
                name="view"
                className="p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select view</option>
                <option value="sea">Sea</option>
                <option value="garden">Garden</option>
                <option value="pool">Pool</option>
                <option value="city">City</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="text-sm font-medium mb-2">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                className="p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-medium mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter description"
                className="p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="propertyState" className="text-sm font-medium mb-2">Property State</label>
              <select
                id="propertyState"
                name="propertyState"
                className="p-2 border border-gray-300 rounded"
                required
              >
                <option value="featured">Featured</option>
                <option value="notFeatured">Not Featured</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="coverImgUrl" className="text-sm font-medium mb-2">Cover Image</label>
            <Upload
              name="coverImgUrl"
              listType="picture"
              maxCount={1}
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              beforeUpload={(file) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                  message.error('You can only upload JPG/PNG file!');
                }
                return isJpgOrPng;
              }}
              customRequest={({ file, onSuccess }) => {
                handleCoverImageChange(file);
                onSuccess();
              }}
              onRemove={handleCoverImageRemove}
            >
              <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
            </Upload>
          </div>

          <div className="flex flex-col">
            <label htmlFor="photos" className="text-sm font-medium mb-2">Photos</label>
            <Upload
              name="photos"
              listType="picture-card"
              multiple
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              style={{ width: '20em' }}
              beforeUpload={(file) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                  message.error('You can only upload JPG/PNG files!');
                }
                return isJpgOrPng;
              }}
              onChange={handlePhotosChange} // Use onChange instead of customRequest
              onRemove={handleRemovePhoto}
            >
              <Button icon={<UploadOutlined />} style={{ textAlign: 'center' }}>
                Upload Photos
              </Button>
            </Upload>
          </div>

          <div className="flex justify-center">
         
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
