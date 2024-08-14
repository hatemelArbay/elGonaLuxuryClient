import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../../App.css'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig/firebaseconfig";

const { Option } = Select;

const AddPropertyForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured]=useState();
  const handleFinish = async (values) => {
    setLoading(true);
    try {
      // console.log(values);
      const { coverImgUrl,photos,propertyState } = values; 
    //  console.log( photos);
     const {coverUrl,photoUrlList}=await uploadImages(coverImgUrl,photos);
     console.log("afetr call "+photoUrlList);
      if(propertyState==="notFeatured")
        setFeatured(false);
      else 
      setFeatured(true);
     
     const propertyData ={
      propertyType:values.propertyType,
      propertyName:values.propertyName,
      price:values.price,//no price
      location:values.location,
      compound:values.compound,
      numBeds:values.numBeds,
      numShower:values.numShower,
      coverImgUrl:coverUrl,
      imagesUrl:photoUrlList,
      view:values.view,
      measure:values.measure,
      description:values.description,//no description
      featured:featured


     };
     console.log("constructed data : ");
     console.log(propertyData);

    } catch (error) {
      message.error('Failed to add property.');
      console.error("Error adding property:", error);
    }
    setLoading(false);
  };

  const uploadImages = async (coverImgUrl,photos) => {
    let photoUrlList=[];
    try {
      const imageRef = ref(storage, `coverImages/${coverImgUrl.file['name']}`);
      await uploadBytes(imageRef, coverImgUrl.file.originFileObj);
      console.log('Image uploaded successfully!');
      
      const coverUrl = await getDownloadURL(imageRef);
    
      console.log('Image URL:', coverUrl);

      for (let i = 0; i < photos.length; i++) {
   
        const imageRef = ref(storage, `photos/${photos[i].name}`);
        await uploadBytes(imageRef, photos[i].originFileObj);
        const imageUrl = await getDownloadURL(imageRef);
        photoUrlList.push(imageUrl)
      }
  
      return { coverUrl, photoUrlList };
      
     
    } catch (err) {
      console.error("Error uploading image to Firebase:", err);
    }
  };

  const inputStyle = { borderRadius: '8px', marginBottom: "1.3em" };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center my-5">
      <div className="card" style={{ width: '100%', maxWidth: "75em" }}>
        <h1 className="text-center mt-5">Add Property</h1>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          onFinish={handleFinish}
          style={{ padding: '40px' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Property Name"
                name="propertyName"
                rules={[{ required: true, message: 'Property name is required' }]}
              >
                <Input placeholder="Enter property name" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Compound"
                name="compound"
                rules={[{ required: true, message: 'Property compound is required' }]}
              >
                <Input placeholder="Enter compound name" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Property location is required' }]}
              >
                <Input placeholder="Enter location" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Measure"
                name="measure"
                rules={[{ required: true, message: 'Property measure is required' }]}
              >
                <InputNumber placeholder="Enter measure (e.g., sqm)" style={{ ...inputStyle, width: "100%" , height:"100%"}}  />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Number of Beds"
                name="numBeds"
                rules={[{ required: true, type: 'number', min: 1, message: 'Number of beds must be at least 1' }]}
              >
                <InputNumber min={1} placeholder="Enter number of beds" style={{ ...inputStyle, width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Number of Showers"
                name="numShower"
                rules={[{ required: true, type: 'number', min: 1, message: 'Number of showers must be at least 1' }]}
              >
                <InputNumber min={1} placeholder="Enter number of showers" style={{ ...inputStyle, width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Property Type"
                name="propertyType"
                rules={[{ required: true, message: 'Property type is required' }]}
              >
                <Select placeholder="Select property type" style={inputStyle}>
                  <Option value="apartment">Apartment</Option>
                  <Option value="villa">Villa</Option>
                  <Option value="house">House</Option>
                  <Option value="studio">Studio</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="View"
                name="view"
                rules={[{ required: true, message: 'Property View is required' }]}
              >
                <Select placeholder="Select view" style={inputStyle}>
                  <Option value="sea">Sea</Option>
                  <Option value="garden">Garden</Option>
                  <Option value="pool">Pool</Option>
                  <Option value="city">City</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Cover Image"
                name="coverImgUrl"
                rules={[{ required: true, message: 'Cover Photo is required' }]}
              >
                <Upload
                  name="coverImgUrl"
                  listType="picture"
                  maxCount={1}  // Limit to only one file
                  showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                  beforeUpload={(file) => {
                    // Optional: Validate file type/size here
                    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJpgOrPng) {
                      message.error('You can only upload JPG/PNG file!');
                    }
                    return isJpgOrPng;
                  }}
                  customRequest={({ file, onSuccess }) => {
                    // Handle file upload manually
                    uploadImages(file.originFileObj).then(() => {
                      onSuccess();
                    }).catch((error) => {
                      message.error('Upload failed.');
                      console.error("Error uploading image to Firebase:", error);
                    });
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
                </Upload>
              </Form.Item>
            </Col>
            

            <Col span={12}>
              <Form.Item
                label="Property State"
                name="propertyState"
                rules={[{ required: true, message: 'Property state is required' }]}
              >
                <Select placeholder="Select property state" style={{ ...inputStyle, width: "100%" }}>
                  <Option value="featured">Featured</Option>
                  <Option value="notFeatured">Not Featured</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form.Item
                  label="Photos"
                  name="photos"
                  valuePropName="fileList"
                  getValueFromEvent={({ fileList }) => fileList}  // Ensure file list is captured correctly
                  style={{ textAlign: 'center' }}
                >
                  <Upload
                    name="photos"
                    listType="picture-card"
                    multiple
                    showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                    style={{ width: '20em' }}
                    
                    beforeUpload={(file) => {
                      // Optional: Validate file type/size here
                      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                      if (!isJpgOrPng) {
                        message.error('You can only upload JPG/PNG files!');
                      }
                      return isJpgOrPng;
                    }}
                  >
                    <Button icon={<UploadOutlined />} style={{ textAlign: 'center' }}>
                      Upload Photos
                    </Button>
                  </Upload>
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: "black", width: '50%' }}>
              {loading ? 'Submitting...' : 'Add Property'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddPropertyForm;