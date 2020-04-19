import React from 'react';
import {
  TextField, Container, Button, Box,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { createBrowserHistory } from 'history';
import useStyles from './style';
import StoryEntry from '../../interfaces/StoryEntry';
import { addStory } from '../../firebase/handlers';

const StoryEntrySchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('Title is required.')
    .min(10, 'Title must be at least 10 characters.'),
  body: yup
    .string()
    .trim()
    .required('Body is required')
    .min(25, 'Body must be at least 25 characters.'),
});

const CreateStoryPage = () => {
  const classes = useStyles();
  const history = createBrowserHistory({ forceRefresh: true });
  const {
    register, handleSubmit, errors, reset,
  } = useForm<StoryEntry>({
    validationSchema: StoryEntrySchema,
  });

  const onSubmit = React.useCallback((data: StoryEntry) => {
    data.created = Date.now();
    addStory(data, (storyId) => {
      reset();
      history.push(`/stories/?storyId=${storyId}`);
    });
  }, [addStory]);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={classes.formContainer}
        >
          <TextField
            inputRef={register}
            variant="outlined"
            className={classes.titleTextField}
            label="Title"
            name="title"
            autoComplete="off"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
            fullWidth
          />
          <TextField
            inputRef={register}
            variant="outlined"
            multiline
            rows="12"
            label="Body"
            name="body"
            autoComplete="off"
            error={!!errors.body}
            helperText={errors.body ? errors.body.message : ''}
            fullWidth
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              className={classes.createButton}
              variant="contained"
              color="primary"
            >
              Create Story
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default CreateStoryPage;
