import React from "react";
import Post from "./Posts/Post";
import s from "./MyPosts.module.css";
import { reduxForm, Field } from "redux-form";
import {required, maxLengthCreator } from "../../../utils/validators"
import {Textarea} from "../../common/FormControls/123"

const maxLength10 = maxLengthCreator(10);

const MyPosts = (props) => {
  let postsElements = props.posts.map((post, index) => (
    <Post message={post.message} likesCount={post.likesCount} key={index} photo={props.profile.photos.small}/>
  ));


  let onAddPost = (values) => {
    props.addPost(values.newPostText)
  };

  return (
    <div className={s.myPosts_wrapper}>
      <h3>My posts</h3>
      <div className={s.posts}>{postsElements}</div>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
    </div>
  );
};

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newPostText"
          placeholder="Type your post"
          validate={[required, maxLength10]}
        />
      </div>
      <button>Add post</button>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm);

export default MyPosts;
