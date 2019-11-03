import React, { useState } from 'react';
import CardContainer from '../components/CardContainer';
import { Typography, message } from 'antd';
import WrappedAnnouncementForm from './AnnouncementForm';
import { createNews, updateNews, index } from '../services/news-client';
import { navigate } from '@reach/router';
import { useAsync } from 'react-async';

const UpdateAnnouncement = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { data, error, isPending, isRejected } = useAsync({
    promiseFn: index,
    id
  });
  async function onSubmit(values) {
    console.log("TCL: onSubmit -> values", values)
    const res = updateNews(id, values).catch(() => {
      message.error('No se pudo editar la noticia, vuelve a intentarlo');
    });
    setLoading(false);
    if (res) {
      message.success('Noticia actualizada con éxito.');
      navigate('/');
    }
  }
  return (
    <CardContainer>
      <Typography.Title level={2}>Actualizar anuncio</Typography.Title>
      <WrappedAnnouncementForm
        announcement={data}
        onSubmit={onSubmit}
        submitLoading={loading || isPending}
      />
    </CardContainer>
  );
};

export default UpdateAnnouncement;
