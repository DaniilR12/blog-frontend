import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [dispatch])
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : Array.isArray(posts.items) ? posts.items : []).map((value, index) => isPostsLoading ? <Post key={index} isLoading={true} /> : (
            <Post
              id={value._id}
              title={value.title}
              imageUrl={value.imageUrl ? value.imageUrl: ""}
              user={{
                avatarUrl: value.user.avatarUrl ? value.user.avatarUrl : 'https://i.pinimg.com/736x/90/f7/a4/90f7a49893bc987858e13e10ffc72a23.jpg',
                fullName: value.user.fullName,
              }}
              createdAt={value.user.createdAt}
              viewsCount={value.viewsCount}
              commentsCount={3}
              tags={value.tags}
              isEditable={userData?._id === value.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={Array.isArray(tags.items) ? tags.items : []} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
