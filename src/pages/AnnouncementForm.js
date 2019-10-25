import React, { useState } from 'react';
import { Typography, Form, Input, Radio, Select, Button, Upload, Icon, message } from 'antd';
import { navigate } from '@reach/router';
import CardContainer from '../components/CardContainer';
import { careers } from '../constants';
import CloudinaryService from '../services/cloudinary-client';
import { createNews } from '../services/news-client';

const { Title, Text } = Typography;
const { TextArea } = Input;

const AnnouncementForm = ({ form }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState();
  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err && !loading) {
        setLoading(true);
        if(uploadedImageUrl) {
          values.image = uploadedImageUrl;
        }
        const res = createNews(values).catch(() => {
          message.error("No se pudo crear noticia, vuelve a intentarlo")
        })
        setLoading(false)
        if(res) {
          message.success("Noticia creada con éxito.")
          navigate('/');
        }
      }
    });
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
        setUploadedImageUrl(info.file.response.data.secure_url);
        setLoading(false);
      });
    }
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  function uploadImage({ file, onProgress, onError, onSuccess }) {
    getBase64(file, imageUrl => {
      CloudinaryService().uploadImage(imageUrl, onProgress, onSuccess, onError);
    });
  }
  return (
    <CardContainer>
      <Upload
        accept="image/*"
        name="Imagen de anuncio"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={uploadImage}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <Title level={2}>Crear nuevo anuncio</Title>
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label="Título">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Introduce el título.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Contenido">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Introduce el contenido.' }]
          })(<TextArea />)}
        </Form.Item>
        <Form.Item label="Carreras a notificar. Deja vació para notificarle a todos.">
          {getFieldDecorator('tags')(
            <Select mode="multiple" style={{ width: '100%' }} placeholder="Selecciona una carrera.">
              {careers.map(({ name, value }) => (
                <Select.Option key={value} value={value}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Button loading={loading} block type="primary" htmlType="submit">
          Crear anuncio
        </Button>
      </Form>
    </CardContainer>
  );
};

const WrappedAnnouncementForm = Form.create({ name: 'AnnouncementForm' })(AnnouncementForm);
export default WrappedAnnouncementForm;
