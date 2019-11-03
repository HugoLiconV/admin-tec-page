import React, { useState } from 'react';
import CardContainer from '../components/CardContainer';
import { Typography, message } from 'antd';
import WrappedAnnouncementForm from './AnnouncementForm';
import { createNews } from '../services/news-client';
import { navigate } from '@reach/router';

const CreateAnnouncement = () => {
  const [loading, setLoading] = useState(false)
  async function onSubmit(values) {
    const res = createNews(values).catch(() => {
      message.error('No se pudo crear noticia, vuelve a intentarlo');
    });
    setLoading(false);
    if (res) {
      message.success('Noticia creada con éxito.');
      navigate('/');
    }
  }
  return (
    <CardContainer>
      <Typography.Title level={2}>Crear nuevo anuncio</Typography.Title>
      <WrappedAnnouncementForm onSubmit={onSubmit} submitLoading={loading}/>
    </CardContainer>
  );
};

export default CreateAnnouncement;
