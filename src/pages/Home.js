import React, { useState } from 'react';
import { Button, Icon, Typography, Tooltip, Popconfirm, message, Input } from 'antd';
import CardContainer from '../components/CardContainer';
import { navigate } from '@reach/router';
import { Table, Divider, Tag } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAsync } from 'react-async';
import { getNews, deleteNews } from '../services/news-client';

dayjs.extend(relativeTime);

const Home = () => {
  const [, setSearchText] = useState('initialState');
  const pagination = {
    limit: 5,
    skip: 0
  };
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
  });

  const { data, error, isPending, isRejected, run } = useAsync({
    promiseFn: getNews,
    deferFn: getNews,
    ...pagination
  });

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
      render: (text, record) => (
        <a onClick={() => navigate(`/announcements/${record.id}`)}>{text}</a>
      )
    },
    {
      title: 'Publicación',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => (
        <Tooltip title={dayjs(date).format('D MMMM YYYY hh:mm a')}>
          <span>{dayjs(dayjs(date)).from()}</span>
        </Tooltip>
      )
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.length > 0 ? (
            tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })
          ) : (
            <Tag color="green">GENERAL</Tag>
          )}
        </span>
      )
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <span>
          <Popconfirm
            title="¿Estas seguro de eliminar esta noticia?"
            onConfirm={async () => onDeleteConfirmed(record.id)}
            okText="Si"
            cancelText="No"
          >
            <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
          </Popconfirm>
          <Divider type="vertical" />
          <Icon type="edit" theme="twoTone" onClick={() => {
            navigate(`/update-announcement/${record.id}`);
          }}/>
        </span>
      )
    }
  ];

  if (isRejected) {
    return <p>{error}</p>;
  }

  async function onDeleteConfirmed(id) {
    await deleteNews(id).catch(() => {
      message.error('No se pudo eliminar la noticia. Vuelve a intentarlo');
    });
    run(pagination);
    message.success('Noticia eliminada con éxito');
  }

  function onPaginationChange(page) {
    pagination.skip = (page - 1) * pagination.limit;
    console.log('TCL: onPaginationChange -> pagination', pagination);
    run(pagination);
  }
  return (
    <CardContainer>
      <Typography.Title level={2}>Noticias publicadas</Typography.Title>
      <Table
        rowKey={({ id }) => id}
        columns={columns}
        dataSource={data && data.rows}
        loading={isPending}
        pagination={{
          position: 'bottom',
          total: data && data.count,
          pageSize: pagination.limit,
          onChange: onPaginationChange
        }}
      />
    </CardContainer>
  );
};

export default Home;
