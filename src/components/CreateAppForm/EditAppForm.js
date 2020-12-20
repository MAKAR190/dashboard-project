import { Component } from "react";

import { editApp } from "../../services/appsApi";
import styles from "./CreateAppForm.module.css";
// Image preview
// https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa

export default class CreateAppForm extends Component {
  state = {
    image:
      "https://s3-alpha-sig.figma.com/img/7a22/6e6e/bd327801e7e993b34355d80f81d0eaf8?Expires=1609113600&Signature=h4xO-pocZObaBQx2ak2lfbuEDz0lwwvwufg9zdY0-Oh-Ubd5fYwq9WFXwvZIkMipII5LuZ29IlVsUSVsrZH-orL29tr8IhCnDUBEdqFrRHAGC9pZL1QlntyA2W8jbJ2NPnHym9DPW8Xcm6RtVBRnjae-nKNN2Dc60wRwPAiIsR2i6jLl68m4juzWmkaOkbii8RTf3Syuv43BBgNS7BOlKX1hAYopNJVeryhSH4B6-YLd5BEgCAu~NP3Ysy054ulLoTMYjoMEa0pD1rnAE9PBFTBDp3glvS6j6XckVxP80Pt6xwL7QBKsqE2WbUo6~A5MgvfRM1OKJqTq2GSprvEsyA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    title: "",
    link: "",
    description: "",
    errors: {},
  };
  handleImageChange = (e) => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleCreateApp = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("link", this.state.link);
    formData.append("image", this.state.image);

    editApp(this.props.id, formData)
      .then((res) => console.log(res))
      .catch((error) => console.dir(error));
  };
  handleTitleChange = (e) => {
    if (e.target.value.length < 3 || e.target.value.length > 64) {
      this.setState((prevState) => {
        return {
          errors: {
            ...prevState.errors,
            title: "Название должно быть от 3 до 64 символов.",
          },
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          errors: {
            ...prevState.errors,
            title: "",
          },
        };
      });
    }
    this.setState({
      title: e.target.value,
    });
  };
  handleDescrChange = (e) => {
    if (e.target.value.length < 3) {
      this.setState((prevState) => {
        return {
          errors: {
            ...prevState.errors,
            description: "Описание должно быть от 3 символов.",
          },
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          errors: {
            ...prevState.errors,
            description: "",
          },
        };
      });
    }
    this.setState({
      description: e.target.value,
    });
  };
  handleLinkChange = (e) => {
    if (e.target.value.length < 3 || e.target.value.length > 512) {
      this.setState((prevState) => {
        return {
          errors: {
            ...prevState.errors,
            link: "Описание должно быть от 3 символов.",
          },
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          errors: {
            ...prevState.errors,
            link: "",
          },
        };
      });
    }
    this.setState({
      link: e.target.value,
    });
  };

  render() {
    const { title, errors, description, link } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.formImageWrapper}>
          <img
            className={styles.formImage}
            alt="defaultImage"
            src={this.state.image}
          />
          <label className={styles.uploadImage}>
            Загрузить картинку
            <input
              type="file"
              accept="image/*"
              onChange={this.handleImageChange}
            />
          </label>
        </div>
        <form className={styles.form} onSubmit={this.handleCreateApp}>
          <h1 className={styles.title}>Изменить ссылку</h1>
          <label className={styles.label}>
            Название
            <input
              value={title}
              onChange={this.handleTitleChange}
              type="input"
              className={styles.input}
            />
            {errors.title !== "" && (
              <span className={styles.error}>{errors.title}</span>
            )}
          </label>
          <label className={styles.label}>
            Ссылка
            <input
              value={link}
              onChange={this.handleLinkChange}
              type="input"
              className={styles.input}
            />
            {errors.link !== "" && (
              <span className={styles.error}>{errors.link}</span>
            )}
          </label>
          <label className={styles.label}>
            Описание
            <textarea
              value={description}
              onChange={this.handleDescrChange}
              className={styles.description}
            />
            {errors.description !== "" && (
              <span className={styles.errorDescr}>{errors.description}</span>
            )}
          </label>
          <button className={styles.btn} type="submit">
            Изменить
          </button>
        </form>
      </div>
    );
  }
}
